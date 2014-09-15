(function () {
  'use strict';
  angular.module('frontendApp').directive('campaignTile', function () {
    return {
      restrict: 'EA',
      templateUrl: '/scripts/directives/templates/campaignTile.html',
      scope: {
        campaign: '='
      },
      controller: function ($scope) {

      }
    };
  });

}).call(this);
