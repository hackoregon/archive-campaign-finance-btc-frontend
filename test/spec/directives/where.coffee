'use strict'

describe 'Directive: where', () ->

  # load the directive's module
  beforeEach module 'frontendApp'

  scope = {}

  beforeEach inject ($controller, $rootScope) ->
    scope = $rootScope.$new()

  it 'should make hidden element visible', inject ($compile) ->
    element = angular.element '<where></where>'
    element = $compile(element) scope
    expect(element.text()).toBe 'this is the where directive'
