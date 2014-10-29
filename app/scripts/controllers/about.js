(function() {
  'use strict';
  angular.module('frontendApp').controller('AboutCtrl', function($scope, Title) {

    Title.setTitle('About HackOregon');

  });

}).call(this);