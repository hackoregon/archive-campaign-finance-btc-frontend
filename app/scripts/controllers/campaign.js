(function() {
  'use strict';
  angular.module('frontendApp').controller('CampaignCtrl', function($scope, $routeParams, CampaignService, $http) {


    $scope.campaignId = $routeParams.campaignId;

    $scope.viewModel = {
      section: 'who',
      campaign: [],
      donations: {},
      donationsColorMap: {},
      startDate: new Date(2010, 10, 1),
      endDate: new Date(2014, 10, 1)
    };

    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.PAC] = '#fbb4ae';
    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.BUSINESS] = '#b3cde3';
    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.GRASSROOTS] = '#ccebc5';
    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.INDIVIDUAL] = '#decbe4';
    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.PARTY] = '#fed9a6';
    $scope.viewModel.donationsColorMap[CampaignService.CONTRIBUTION.NA] = '#ffffcc';

    $http.get('http://54.84.12.11/hackoregon/http/top_committee_data/5/').then(function(result){
      console.log('GOT IT');
    });

    CampaignService.getCampaign($routeParams.campaignId).then(function(result) {
      $scope.viewModel.campaign = result;
    });



    CampaignService.getCampaignFinances($scope.viewModel.startDate, $scope.viewModel.endDate).then(function(finances) {
      var nodes = _(finances.contributions).chain()
        .map(function(contribution, key){
          return {category: key, value: contribution.amount};
        })
        .filter(function(node){
          return node.category !== CampaignService.CONTRIBUTION.NA;
        })
        .value();
      $scope.viewModel.donations = {children: nodes};
    });

  });

}).call(this);
