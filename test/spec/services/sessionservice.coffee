'use strict'

describe 'Service: Sessionservice', ->

  # load the service's module
  beforeEach module 'frontendApp'

  # instantiate service
  Sessionservice = {}
  beforeEach inject (_Sessionservice_) ->
    Sessionservice = _Sessionservice_

  it 'should do something', ->
    expect(!!Sessionservice).toBe true
