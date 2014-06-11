'use strict'

angular.module('frontendApp')
  .controller 'MainCtrl', ($scope, $location) ->
    class MainCtrl
      viewModel: [
        address: '1234'
      ]

      find: ->
        $location.path '#who/local'
