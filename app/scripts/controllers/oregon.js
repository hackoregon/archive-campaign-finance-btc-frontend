(function() {
  'use strict';
  angular.module('frontendApp').controller('OregonCtrl', function($scope, CampaignService) {

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
      CampaignService.getTopIndividualDonors().then(function(results){
        $scope.viewModel.financialSummary.donors.indiv = results;
      });
      CampaignService.getTopBusinessDonors().then(function(results){
        $scope.viewModel.financialSummary.donors.corp = results;
      });
    });
  });

})();
