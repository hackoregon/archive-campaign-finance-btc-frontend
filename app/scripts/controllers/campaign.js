(function() {
  'use strict';
  angular.module('frontendApp').controller('CampaignCtrl', function($scope, $routeParams, CampaignService, $http) {


    $scope.campaignId = $routeParams.campaignId;

    var startDate = new Date(2010, 1, 1).getTime();
    var endDate = new Date(2014, 9, 1).getTime();

    $scope.defaults = {
      photo: "images/icons/genderless.svg"
    }
    $scope.photo = $scope.defaults.photo;

    $scope.viewModel = {
      section: 'who',
      campaign: {},
      financialSummary: null,
      moneyByState: null
    };

//    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.PAC] = '#fbb4ae';
//    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.BUSINESS] = '#b3cde3';
//    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.GRASSROOTS] = '#ccebc5';
//    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.INDIVIDUAL] = '#decbe4';
//    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.PARTY] = '#fed9a6';
//    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.NA] = '#ffffcc';

    CampaignService.getCampaign($routeParams.campaignId).then(function(result) {
      $scope.viewModel.campaign = result;
      $scope.photo = ($scope.viewModel.campaign.photo || $scope.defaults.photo);

      CampaignService.getCampaignFinancialSummary($scope.viewModel.campaign.filer_id).then(function(result) {
        $scope.viewModel.financialSummary = result;
      });

      CampaignService.getCampaignMoneyByState($scope.viewModel.campaign.candidate_name).then(function(result) {
        $scope.viewModel.moneyByState = result;
      });
    });



    var render = _(function() {
      var startDate = new Date(parseInt($scope.viewModel.startDate));
      var endDate = new Date(parseInt($scope.viewModel.endDate));
//      CampaignService.getCampaignFinances(startDate, endDate).then(function(finances) {
//        var nodes = _(finances.contributions).chain()
//          .map(function(contribution, key){
//            return {category: key, value: contribution.amount};
//          })
//          .filter(function(node){
//            return node.category !== CampaignService.CONTRIBUTION.NA;
//          })
//          .value();
//        $scope.viewModel.donations = {children: [finances.richardson, finances.kitzhaber]};
//      });
    }).throttle(500);




  });

}).call(this);
