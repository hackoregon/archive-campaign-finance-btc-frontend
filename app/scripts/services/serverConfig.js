(function () {
  'use strict';

  angular.module('frontendApp')
    .constant('BASE_URL', 'http://54.213.83.132/hackoregon/http/')
    .factory('urls', function (BASE_URL) {
      var campaignSearchUrl = _.template(BASE_URL + 'candidate_search/<%= searchTerm %>/');
      var transactionsUrl = _.template(BASE_URL + 'current_candidate_transactions/<%= campaignId %>/');
      var campaignDetailUrl = _.template(BASE_URL + 'committee_data_by_id/<%= campaignId %>/');
      var moneyByStateUrl = _.template(BASE_URL + 'candidate_in_by_state_by_id/<%= campaignId %>/');
      var campaignCompetitors = _.template(BASE_URL + 'competitors_from_name/<%= campaignId %>/');
      var candidateSumByDateUrl = _.template(BASE_URL + 'candidate_sum_by_date/<%= campaignId %>/');
      var allOregonSummary = (BASE_URL + 'all_oregon_sum/_/');
      var allOregonContributionsSummary = (BASE_URL + 'oregon_by_contributions/_/');
      var allOregonExpendituresSummary = (BASE_URL + 'oregon_by_purpose_codes/_/');
      var allOregonActivityOverTime = (BASE_URL + 'state_sum_by_date/_/');
      var allOregonStateByState = (BASE_URL + 'oregon_in_by_state/_/');
      var allOregonTopIndividualDonors = (BASE_URL + 'oregon_individual_contributors/_/');
      var allOregonTopBusinessDonors = (BASE_URL + 'oregon_business_contributors/_/');
      var allOregonTopPACDonors = (BASE_URL + 'oregon_committee_contributors/_/');
      return {
        campaignSearch: function(searchTerm) {
          return campaignSearchUrl({searchTerm:searchTerm});
        },
        transactions:  function(campaignId) {
          if (campaignId === 'oregon') {
            return allOregonTransactions;
          }
          return transactionsUrl({campaignId: campaignId});
        },
        campaignDetail: function(campaignId) {
          return campaignDetailUrl({campaignId: campaignId});
        },
        campaignMoneyByState: function(campaignId) {
          if (campaignId === 'oregon') {
            return allOregonStateByState;
          }
          return moneyByStateUrl({campaignId: campaignId});
        },
        candidateSumByDate: function(campaignId) {
          return candidateSumByDateUrl({campaignId: campaignId});
	      },
        oregonSumByDate: function() {
          return allOregonActivityOverTime;
        },
        oregonSummary: function() {
          return allOregonSummary;
        },
        oregonContributions: function() {
          return allOregonContributionsSummary;
        },
        oregonExpenditures: function() {
          return allOregonExpendituresSummary;
        },
        oregonTransactions: function() {
          return allOregonTransactions;
        },
        oregonTopIndividualDonors: function() {
          return allOregonTopIndividualDonors;
        },
        oregonTopBusinessDonors: function() {
          return allOregonTopBusinessDonors;
        },
        oregonTopPACDonors: function() {
          return allOregonTopPACDonors;
        }
      };
    });

}());
