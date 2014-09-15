(function () {
  'use strict';
  angular.module('frontendApp').directive('campaignTile', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/campaignTile.html',
      scope: {
        campaign: '='
      },
      controller: function ($scope) {

      }
    };
  });

}).call(this);
