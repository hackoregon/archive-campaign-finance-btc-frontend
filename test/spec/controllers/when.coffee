'use strict'

describe 'Controller: WhenCtrl', () ->

  # load the controller's module
  beforeEach module 'frontendApp'

  WhenCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    WhenCtrl = $controller 'WhenCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
