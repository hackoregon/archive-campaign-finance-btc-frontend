'use strict'

angular.module('frontendApp')
  .controller 'ContributionsCtrl', ($scope, $routeParams) ->
    $scope.campaignId = $routeParams.campaignId
    