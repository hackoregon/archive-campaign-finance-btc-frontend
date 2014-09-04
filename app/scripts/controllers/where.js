(function() {
  'use strict';
  angular.module('frontendApp').controller('WhereCtrl', function($scope, $routeParams) {
    $scope.RACE_LEVEL_LOCAL = 'local';
    $scope.RACE_LEVEL_STATE = 'state';
    $scope.raceLevel = $routeParams.raceLevel || $scope.RACE_LEVEL_LOCAL;
    return $scope.campaignId = $routeParams.campaignId;
  });

}).call(this);