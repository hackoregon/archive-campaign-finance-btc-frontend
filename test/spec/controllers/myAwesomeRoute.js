'use strict';

describe('Controller: MyawesomerouteCtrl', function () {

  // load the controller's module
  beforeEach(module('frontendApp'));

  var MyawesomerouteCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    MyawesomerouteCtrl = $controller('MyawesomerouteCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
