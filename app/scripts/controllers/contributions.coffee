'use strict'

angular.module('frontendApp')
  .controller 'ContributionsCtrl', ($scope, $routeParams, CandidateService) ->

    $scope.campaignId = $routeParams.campaignId

    CandidateService.getContribsByCandidate($routeParams.campaignId).then( (result) ->
      $scope.candidate = result
    )

    return;
