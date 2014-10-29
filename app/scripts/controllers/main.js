(function() {
  'use strict';
  angular.module('frontendApp').controller('MainCtrl', function($scope, $location, SessionService, Title) {

    Title.setTitle('Behind The Curtain');

  });

}).call(this);