(function() {
  'use strict';
  angular.module('frontendApp').controller('SpendCtrl', function($scope, $routeParams) {
    $scope.campaignId = $routeParams.campaignId;
    return $scope.contributorId = $routeParams.contributorId;
  });

}).call(this);