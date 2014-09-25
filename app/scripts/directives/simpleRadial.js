(function () {
  'use strict';
  angular.module('frontendApp').directive('simpleRadial', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/simpleRadial.html',
      scope: {
        percent: '=',
        title: '@',
        icon: '@'
      },
      controller: function ($scope) {
        $scope.viewModel = {
          formattedPercent: ''
        };

        $scope.$watch('percent', function(){
          if (_($scope.percent).isNumber()){
            var percent = $scope.percent * 100;
            $scope.viewModel.formattedPercent = Math.round(percent);
          } else {
            $scope.viewModel.formattedPercent = '';
          }
        });

      },
      link: function(scope, element) {
        // generate d3 donut chart here
      }
    };
  });

}).call(this);
