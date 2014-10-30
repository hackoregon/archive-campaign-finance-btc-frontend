(function () {
  'use strict';

  angular.module('frontendApp').service('CampaignService', function ($q, $http, urls) {
    var CONTRIBUTION = {
      PAC: 'PAC',
      BUSINESS: 'Business',
      GRASSROOTS: 'Grassroots',
      INDIVIDUAL: 'Individual',
      PARTY: 'Party',
      UNION: 'Union',
      NA: 'NA'
    };
    this.CONTRIBUTION = CONTRIBUTION;

    var _cachedTransactions = {campaignId: null, transactions: null};

    this.searchCampaigns = function (searchTerm) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.campaignSearch(searchTerm))
        .then(function (result) {
          var campaigns = _(result.data).map(function(item){
            var campaign = new Campaign();
            campaign.fromObject(item);
            return campaign;
          }).value();
          deferred.resolve(campaigns);
        });

      return promise;
    };

    this.getFundingExpenditures = function (campaignId) {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.candidateSumByDate(campaignId))
        .then(function (result) {
          // var campaign = new Campaign();
          // campaign.fromObject(result.data);
          deferred.resolve(result);
        });

      return promise;
    };


    this.getOregonFundingExpenditures = function () {
      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.oregonSumByDate())
        .then(function (result) {
          deferred.resolve(result);
        });

      return promise;
    };

    this.getOregon = function() {

      var deferred = $q.defer();
      $http.get(urls.oregonSummary())
        .then(function(result) {
          var campaign = new Campaign();
          campaign.fromOregonSummary(result.data[0]);
          deferred.resolve(campaign);
        });

      return deferred.promise;
    };

    function mungeContributions(data) {
      var keyMap = {
        'Political Committee': CONTRIBUTION.PAC,
        'Large Donor': CONTRIBUTION.INDIVIDUAL,
        'Grassroot': CONTRIBUTION.GRASSROOTS,
        'Political Party Committee': CONTRIBUTION.PARTY,
        'Business Entity': CONTRIBUTION.BUSINESS,
        'Labor Organization': CONTRIBUTION.UNION,
        'Other': CONTRIBUTION.NA
      }
      var result = {};
      angular.forEach(data, function(val) {
        var key = keyMap[val['contribution_type']];
        if(key) {
          if (!_(result).has(key)) {
            result[key] = { amount: 0 };
          }
          result[key].amount += val.total;
        }
      });
      return result;
    }
    this.getOregonContributions = function() {

      var deferred = $q.defer();
      $http.get(urls.oregonContributions()).then(function(result) {
        deferred.resolve(mungeContributions(result.data));
      })
      return deferred.promise;
    }

    function mungeExpenditures(data) {
      var expenditures = {};
      angular.forEach(data, function(val) {
        var key = val['purpose_code'];
        if (!_(expenditures).has(key)) {
          expenditures[key] = 0;
        }
        expenditures[key] += val.total;
      });

      return expenditures;
    }
    this.getOreganExpenditures = function() {

      var deferred = $q.defer();
      $http.get(urls.oregonExpenditures()).then(function(result) {
        deferred.resolve(mungeExpenditures(result.data));
      })
      return deferred.promise;
    }

    var mungeTopDonors = function(results){
      /**
       * FROM
       * [
       *  {"contributor_payee":"Loren Parks","sum":874300},
       *  {"contributor_payee":"John Arnold","sum":500000}
       * ]
       * TO
       * [
       *  {"payee":"William Hull","amount":1000},
       *  {"payee":"James W. Ratzlaff","amount":1000}
       * ]
       */
      return _.map(results, function(payee){
        return {payee: payee.contributor_payee, amount: payee.sum};
      });
    }
    var mungeTopPACDonors = function(results) {
      return _.map(results, function(payee){
        var result = {
          payee: payee.contributor_payee,
          amount: payee.sum,
        };
        if (_.has(payee, 'contributor_payee_committee_id')) {
          result.filer_id = payee['contributor_payee_committee_id'];
        }
        return result;
      })
    }

    this.getTopIndividualDonors = function(){
      var deferred = $q.defer();
      $http.get(urls.oregonTopIndividualDonors()).then(function(result) {
        deferred.resolve(mungeTopDonors(result.data));
      })
      return deferred.promise;
    }

    this.getTopBusinessDonors = function(){
      var deferred = $q.defer();
      $http.get(urls.oregonTopBusinessDonors()).then(function(result) {
        deferred.resolve(mungeTopDonors(result.data));
      })
      return deferred.promise;
    }

    this.getTopCommitteeDonors = function(){
      var deferred = $q.defer();
      $http.get(urls.oregonTopPACDonors()).then(function(result) {
        deferred.resolve(mungeTopPACDonors(result.data));
      })
      return deferred.promise;
    }

    this.getCampaign = function (campaignId) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.campaignDetail(campaignId))
        .then(function (result) {
          var campaign = new Campaign();
          campaign.fromObject(result.data[0]);
          deferred.resolve(campaign);
        });

      return promise;
    };

    this.getCampaignMoneyByState = function(campaignId){

      var deferred = $q.defer();
      var promise = deferred.promise;
      $http.get(urls.campaignMoneyByState(campaignId))
        .then(function (result) {
          deferred.resolve(result.data);
        });

      return promise;
    };

    /**
     * These results will get cached.  Each result could be many rows of data, so we'll only cache one
     * candidateId of results at a time.  Other service calls like getFinancialSummary will use the cached results.
     * @param campaignId
     * @returns {*}
     */
    this.getTransactions = function (campaignId) {

      var deferred = $q.defer();
      var promise = deferred.promise;
      if (campaignId === _cachedTransactions.campaignId) {
        deferred.resolve(_cachedTransactions.transactions);
      } else {
        $http.get(urls.transactions(campaignId))
          .then(function (result) {
            _cachedTransactions = {
              campaignId: campaignId,
              transactions: result.data
            };
            deferred.resolve(result.data);
          });
      }

      return promise;
    };

    this.getCampaignFinancialSummary = function (campaignId) {

      var deferred = $q.defer();
      var promise = deferred.promise;

      var sortEntry = function(a, b) {
        return Number(b.amount) - Number(a.amount);
      }

      var self = this;

      this.getTransactions(campaignId)
        .then(function (transactions) {
          var contributions = {};
          _(self.CONTRIBUTION).each(function(type){
            contributions[type] = {amount:0,number:0};
          });
          var expenditures = {};
          var donors = {
            indiv: {},
            corp: {},
            pac: {}
          };
          var committee_codes = {};

          // Use contributor name as a unique key to add up total donations for each contributor
          var addDonorItem = function(type, row) {
            var payee = row['contributor_payee'];
            if (! _.has(donors[type], payee)){
              donors[type][payee] = 0;
            }
            donors[type][payee] += row.amount;

            if (type === 'pac' && _.has(row, 'contributor_payee_committee_id')) {
              committee_codes[payee] = row['contributor_payee_committee_id'];
            }
          };

          _(transactions).chain()
            .each(function (row) {
              var subType = row['sub_type'];
              switch (subType) {
                case 'In-Kind Contribution':
                case 'Cash Contribution':
                  var bookType = row['book_type'];
                  var contributionKey = '';
                  switch (bookType) {
                    case 'Business Entity':
                      contributionKey = self.CONTRIBUTION.BUSINESS;
                      addDonorItem('corp', row);
                      break;
                    case 'Political Committee':
                      contributionKey = self.CONTRIBUTION.PAC;
                      addDonorItem('pac', row);
                      break;
                    case 'Political Party Committee':
                      contributionKey = self.CONTRIBUTION.PARTY;
                      addDonorItem('pac', row);
                      break;
                    case 'NA':
                      contributionKey = self.CONTRIBUTION.NA;
                      break;
                    case 'Individual':
                      if (row['contributor_payee_class'] !== 'grassroots_contributor') {
                        contributionKey = self.CONTRIBUTION.INDIVIDUAL;
                        addDonorItem('indiv', row);
                      }
                      break;
                  }
                  if (contributionKey) {
                    contributions[contributionKey].amount += Number(row['amount']);
                    contributions[contributionKey].number += 1;
                  }
                  if (row['contributor_payee_class'] === 'grassroots_contributor') {
                    contributions[self.CONTRIBUTION.GRASSROOTS].amount += Number(row['amount']);
                    contributions[self.CONTRIBUTION.GRASSROOTS].number += 1;
                  }
                  break;
                case 'Cash Expenditure':
                  var purposeCodes = (row['purpose_codes'] || '').split('; ');
                  _(purposeCodes).each(function (purposeCode) {
                    if (!_(expenditures).has(purposeCode)) {
                      expenditures[purposeCode] = 0;
                    }
                    expenditures[purposeCode] += (Number(row['amount']) / purposeCodes.length);
                  });
                  break;

              }
            });

          donors.indiv = _.map(donors.indiv, function(amount, donor){
            return {payee: donor, amount: amount};
          });
          donors.indiv.sort(sortEntry);

          donors.corp = _.map(donors.corp, function(amount, donor){
            return {payee: donor, amount: amount};
          });
          donors.corp.sort(sortEntry);

          donors.pac = _.map(donors.pac, function(amount, donor) {
            return {payee: donor, amount: amount};
          })
          donors.pac.sort(sortEntry);

          _.each(donors.pac, function(val) {
            if (_.has(committee_codes, val.payee)) {
              val['filer_id'] = committee_codes[val.payee];
            }
          })

          deferred.resolve({contributions:contributions,expenditures:expenditures, donors: donors});
      });

      return promise;
    };


    return this;
  });

}).call(this);
