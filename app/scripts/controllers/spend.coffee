'use strict'

angular.module('frontendApp')
  .controller 'SpendCtrl', ($scope, $routeParams) ->
    $scope.campaignId = $routeParams.campaignId
    $scope.contributorId = $routeParams.contributorId
    