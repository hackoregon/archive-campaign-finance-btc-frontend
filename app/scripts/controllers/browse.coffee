'use strict'

angular.module('frontendApp')
  .controller 'BrowseCtrl', ($scope, $routeParams) ->
    # TODO: move to constants
    $scope.RACE_LEVEL_LOCAL = 'local'
    $scope.RACE_LEVEL_STATE = 'state'
    $scope.RACE_LEVEL_CITY = 'city'
    $scope.RACE_LEVEL_NATIONAL = 'national'
    $scope.RACE_LEVEL_COUNTY = 'county'

    $scope.raceLevel = $routeParams.raceLevel || $scope.RACE_LEVEL_LOCAL


