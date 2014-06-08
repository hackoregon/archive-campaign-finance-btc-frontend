'use strict'

describe 'Directive: boilerPlate', () ->

  # load the directive's module
  beforeEach module 'frontendApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<boiler-plate></boiler-plate>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the boilerPlate directive'
