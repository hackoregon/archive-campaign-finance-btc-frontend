'use strict'

describe 'Service: D3service', () ->

  # load the service's module
  beforeEach module 'frontendApp'

  # instantiate service
  D3service = {}
  beforeEach inject (_D3service_) ->
    D3service = _D3service_

  it 'should do something', () ->
    expect(!!D3service).toBe true
