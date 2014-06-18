'use strict'

angular.module('frontendApp')
  .controller 'BrowseCtrl', ($scope, $location, $routeParams, SessionService) ->

    # TODO: move to constants
    $scope.raceLevels =
      LOCAL: 'local'
      STATE: 'state'
      CITY: 'city'
      NATIONAL: 'national'
      COUNTY: 'county'

    $scope.go = (location) ->
      $location.path location

    $scope.viewModel =
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

    $scope.onAddressSubmit = ->
      SessionService.addAddress $scope.viewModel.address
      $scope.viewModel.editMode = false;
      return

    $scope.enableAddressEdit = ->
      $scope.viewModel.editMode = true
      return

    $scope.validate()

    return;

