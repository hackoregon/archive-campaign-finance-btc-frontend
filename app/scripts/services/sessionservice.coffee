'use strict'

###*
 # @ngdoc service
 # @name frontendApp.Sessionservice
 # @description
 # # Sessionservice
 # Service in the frontendApp.
###
angular.module('frontendApp')
  .service 'SessionService', ->
    this.address =
      streetAddress: ''
      city: ''
      zip: ''
    this.addAddress = (value) ->
      this.address = _.clone value
      return
    return this

