'use strict'

describe 'Directive: test', () ->

  # load the directive's module
  beforeEach module 'frontendApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<test></test>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the test directive'
