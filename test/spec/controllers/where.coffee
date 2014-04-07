'use strict'

describe 'Controller: WhereCtrl', () ->

  # load the controller's module
  beforeEach module 'frontendApp'

  WhereCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    WhereCtrl = $controller 'WhereCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
