(function () {
  'use strict';
  angular.module('frontendApp').directive('whoChart', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/whoChart.html',
      scope: {
        financialSummary: '='
      },
      controller: function ($scope) {

      }
    };
  });

}).call(this);
