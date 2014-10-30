(function() {
  'use strict';
  angular.module('frontendApp')
    .factory('Title', function(){
      var title = 'Behind The Curtain';
      return {
        title: function() { return title; },
        setTitle: function(newTitle) { title = newTitle; }
      };
    })
    .controller('TitleCtrl', function($scope, Title) {
      $scope.Page = Title;
    })

})();