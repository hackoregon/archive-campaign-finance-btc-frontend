(function () {
  'use strict';
  angular.module('frontendApp').directive('searchBox', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/searchBox.html',
      scope: {
        searchTerm: '@',
        searchType: '@',
        prompt: '@'
      },
      controller: function ($scope, $location) {

        $scope.onSubmit = function() {
          $location.path('/results/' + $scope.searchType + '/' + $scope.searchTerm);
        };


      }
    };
  });

}).call(this);
