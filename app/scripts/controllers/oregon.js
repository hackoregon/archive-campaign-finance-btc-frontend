(function() {
  'use strict';
  angular.module('frontendApp').controller('OregonCtrl', function($scope, $q, CampaignService, Title) {

    Title.setTitle('Oregon Summary Page');

    var startDate = new Date(2010, 1, 1).getTime();
    var endDate = new Date(2014, 9, 1).getTime();

    $scope.defaults = {
      photo: "images/icons/landing_oregon.svg"
    }
    $scope.photo = $scope.defaults.photo;

    $scope.viewModel = {
      campaign: {},
      financialSummary: { contributions: [], expenditures: [], donors: {} },
      moneyByState: null
    };

    CampaignService.getOregon()
      .then(function(result) {
        $scope.viewModel.campaign = result;

      CampaignService.getOregonContributions().then(function(result) {
        $scope.viewModel.financialSummary.contributions = result;
      })
      CampaignService.getOreganExpenditures().then(function(result) {
        $scope.viewModel.financialSummary.expenditures = result;
      })
      CampaignService.getCampaignMoneyByState('oregon').then(function(result) {
        $scope.viewModel.moneyByState = result;
      });
      CampaignService.getOregonFundingExpenditures().then(function(result) {
        $scope.viewModel.fundingExpenditures = result;
      });
      $q.all([CampaignService.getTopIndividualDonors(),
              CampaignService.getTopBusinessDonors(),
              CampaignService.getTopCommitteeDonors()]).then(function(results) {
                $scope.viewModel.financialSummary.donors = {
                  indiv: results[0],
                  corp: results[1],
                  pac: results[2]
                }
             })
    });
  });

})();
