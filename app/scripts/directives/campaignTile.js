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

  // todo: double-check with http://stackoverflow.com/questions/15150168/title-case-in-javascript-for-diacritics-non-ascii
  angular.module('frontendApp').filter('convertCase', function() {
    return function(str) {
      var lower = str.toLowerCase();
      return lower.replace(/(^| )(\w)/g, function(x) {
        return x.toUpperCase();
      });
    }
  })
}).call(this);
