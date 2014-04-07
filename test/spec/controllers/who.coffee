'use strict'

describe 'Controller: WhoCtrl', () ->

  # load the controller's module
  beforeEach module 'frontendApp'

  WhoCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    WhoCtrl = $controller 'WhoCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
