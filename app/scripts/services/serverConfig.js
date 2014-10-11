(function () {
  'use strict';

  angular.module('frontendApp')
    .constant('BASE_URL', 'http://54.213.83.132/hackoregon/http/')
    .constant('DEBUG_URL', 'http://54.84.12.11/hackoregon/http/')
    .factory('urls', function (BASE_URL, DEBUG_URL) {
      var campaignSearchUrl = _.template(BASE_URL + 'candidate_search/<%= searchTerm %>/');
      var transactionsUrl = _.template(DEBUG_URL + 'current_candidate_transactions/<%= campaignId %>/');
      var campaignDetailUrl = _.template(BASE_URL + 'committee_data_by_id/<%= campaignId %>/');
      var moneyByStateUrl = _.template(BASE_URL + 'candidate_in_by_state_by_id/<%= campaignId %>/');
      var campaignCompetitors = _.template(BASE_URL + 'competitors_from_name/<%= campaignId %>/');
      return {
        campaignSearch: function(searchTerm) {
          return campaignSearchUrl({searchTerm:searchTerm});
        },
        transactions:  function(campaignId) {
          return transactionsUrl({campaignId: campaignId});
        },
        campaignDetail: function(campaignId) {
          return campaignDetailUrl({campaignId: campaignId});
        },
        campaignMoneyByState: function(campaignId) {
          return moneyByStateUrl({campaignId: campaignId});
        }
      };
    });

}());
