(function() {
  'use strict';
  angular.module('frontendApp').controller('CampaignCtrl', function($scope, $routeParams, CampaignService) {


    $scope.campaignId = $routeParams.campaignId;
    $scope.section = $routeParams.section;

    $scope.viewModel = {
      campaign: [],
      donations: []
    };

    CampaignService.getCampaign($routeParams.campaignId).then(function(result) {
      $scope.viewModel.campaign = result;
    });

    CampaignService.getCampaignFinances().then(function(donations) {
      $scope.viewModel.donations = donations;
    });

  });

}).call(this);
