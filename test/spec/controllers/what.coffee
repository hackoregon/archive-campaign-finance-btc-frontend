'use strict'

describe 'Controller: WhatCtrl', () ->

  # load the controller's module
  beforeEach module 'frontendApp'

  WhatCtrl = {}
  scope = {}

  # Initialize the controller and a mock scope
  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()
    WhatCtrl = $controller 'WhatCtrl', {
      $scope: scope
    }

  it 'should attach a list of awesomeThings to the scope', () ->
    expect(scope.awesomeThings.length).toBe 3
