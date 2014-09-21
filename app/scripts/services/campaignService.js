(function() {
    'use strict';

    angular.module('frontendApp').service('CampaignService', function($q, $http, urls) {
      this.CONTRIBUTION = {
        PAC: 'PAC',
        BUSINESS: 'Business',
        GRASSROOTS: 'Grassroots',
        INDIVIDUAL: 'Individual',
        PARTY: 'Party',
        NA: 'NA'
      };

      var _cachedTransactions = {campaignId: null, transactions: null};

      this.searchCampaigns = function(searchTerm){
        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.get(urls.campaignSearch(searchTerm))
          .then(function(result){
            deferred.resolve(result.data);
          });

        return promise;
      };

      this.getCampaign = function(name) {

        var deferred = $q.defer();
        var promise = deferred.promise;
        $http.get(urls.campaignDetail(name))
          .then(function(result){
            deferred.resolve(result.data[0]);
          });

        return promise;
      };

      /**
       * These results will get cached.  Each result could be many rows of data, so we'll only cache one
       * candidateId of results at a time.  Other service calls like getFinancialSummary will use the cached results.
       * @param campaignId
       * @returns {*}
       */
      this.getTransactions = function(campaignId) {

        var deferred = $q.defer();
        var promise = deferred.promise;
        if (campaignId === _cachedTransactions.campaignId) {
          deferred.resolve(_cachedTransaction.transactions);
        } else {
          $http.get(urls.transactions(campaignId))
            .then(function(result){
              _cachedTransactions = {
                campaignId: campaignId,
                transactions: result.data
              };
              deferred.resolve(result.data);
            });
        }

        return promise;
      };

      this.getCampaignFinancialSummary = function(campaignId) {

        var deferred = $q.defer();
        var promise = deferred.promise;

        this.getTransactions(campaignId)
          .then(function(transactions){
            _.chain(transactions)
              .groupBy('sub_type')
              .map(function(value,key) {
                  var total = _.reduce(value, function(curTotal,curTransaction) {
                                  return curTotal + curTransaction.amount;
                               },0);
                  return [key,total];
                })
              .object()
              .value();
          });

        return promise;
      };


      return this;
    });

}).call(this);
