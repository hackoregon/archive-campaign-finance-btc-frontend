(function() {
  'use strict';
  angular.module('frontendApp').controller('MyBallotCtrl', function($scope, $location, $routeParams, SessionService, DISTRICTS) {

    $scope.raceLevels = DISTRICTS;

    $scope.viewModel = {
      races: [],
      raceLevel: $routeParams.raceLevel || $scope.raceLevels.CITY
    };
    $scope.viewing = function(level) {
      return level === $scope.viewModel.raceLevel;
    }
    $scope.selectLevel = function(level) {
      $scope.viewModel.raceLevel = level;
      $scope.go('/myballot/'+level);
    }
    $scope.go = function(location) {
      return $location.path(location);
    };

  });

})();