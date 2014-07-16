'use strict'

angular.module('frontendApp')
  .controller 'CampaignCtrl', ($scope, $routeParams, CampaignService) ->

    $scope.campaignId = $routeParams.campaignId

    $scope.viewModel =
      campaign: []

    CampaignService.getCampaign($routeParams.campaignId).then( (result) ->
      $scope.viewModel.campaign = result
    )

    return;
