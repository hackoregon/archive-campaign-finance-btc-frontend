'use strict'

angular.module('frontendApp')
  .controller 'BrowseCtrl', ($scope, $location, $routeParams, SessionService, AddressService, DISTRICTS) ->

    # TODO: move to constants
    $scope.raceLevels = DISTRICTS

    $scope.go = (location) ->
      $location.path location

    $scope.viewModel =
      races: []
      editMode: false
      raceLevel: $routeParams.raceLevel || $scope.raceLevels.CITY
      validAddress: false
      address:
        streetAddress: SessionService.address.streetAddress
        city: SessionService.address.city
        zip: SessionService.address.zip

    $scope.validate = ->
      $scope.viewModel.validAddress = $scope.viewModel.address.streetAddress &&
        $scope.viewModel.address.city &&
        $scope.viewModel.address.zip
      return

    $scope.enableAddressEdit = ->
      $scope.viewModel.editMode = true
      return

    $scope.onAddressSubmit = ->
      AddressService.getRacesByAddress($scope.viewModel.address).then( (result) ->
        $scope.viewModel.races = result
      )
      $scope.viewModel.editMode = false;
      return

    $scope.validate()
    $scope.onAddressSubmit()

    return;

