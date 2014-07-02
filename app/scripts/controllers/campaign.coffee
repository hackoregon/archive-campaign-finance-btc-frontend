'use strict'

angular.module('frontendApp')
  .controller 'CampaignCtrl', ($scope, $routeParams, CampaignService) ->

    $scope.campaignId = $routeParams.campaignId

    CampaignService.getCampaign($routeParams.campaignId).then( (result) ->
      $scope.campaign = result
    )

    return;
