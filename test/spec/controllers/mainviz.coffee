'use strict'

describe 'Controller: MainvizCtrl', () ->

  # load the controller's module
  beforeEach module 'frontendApp'

  MainvizCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    MainvizCtrl = $controller 'MainvizCtrl', {
      $scope: scope
    }

  # it 'should attach a list of awesomeThings to the scope', () ->
  #   expect(scope.awesomeThings.length).toBe 3
