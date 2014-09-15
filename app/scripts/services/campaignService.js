(function() {
    'use strict';
    /**
    # @ngdoc service
    # @name frontendApp.Sessionservice
    # @description
    # # Sessionservice
    # Service in the frontendApp.
    */

    angular.module('frontendApp').service('CampaignService', function($q, $http, urls) {
      this.CONTRIBUTION = {
        PAC: 'PAC',
        BUSINESS: 'Business',
        GRASSROOTS: 'Grassroots',
        INDIVIDUAL: 'Individual',
        PARTY: 'Party',
        NA: 'NA'
      };

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

      return this;
    });

}).call(this);
