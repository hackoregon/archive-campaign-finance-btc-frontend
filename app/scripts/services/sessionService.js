(function() {
  'use strict';
  /**
   # @ngdoc service
   # @name frontendApp.Sessionservice
   # @description
   # # Sessionservice
   # Service in the frontendApp.
   */

  angular.module('frontendApp').service('SessionService', function() {
    this.address = {
      streetAddress: '',
      city: '',
      zip: ''
    };
    this.addAddress = function(value) {
      this.address = _.clone(value);
    };
    return this;
  });

}).call(this);