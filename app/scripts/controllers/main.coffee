'use strict'

angular.module('frontendApp')
  .controller 'MainCtrl', ($scope, $location, SessionService) ->
    $scope.sections =
        SECTION_BROWSE: 'browse'
        SECTION_SEARCH: 'search'
        SECTION_VIEW_ALL: 'view all'

    $scope.viewModel =
      openSection: null
      candidateSearch: ''
      validAddress: false
      address:
        streetAddress: ''
        city: ''
        zip: ''

    $scope.validate = ->
      $scope.viewModel.validAddress = $scope.viewModel.address.streetAddress &&
        $scope.viewModel.address.city &&
        $scope.viewModel.address.zip
      return

    $scope.onAddressSubmit = ->
      SessionService.addAddress $scope.viewModel.address
      $location.path 'browse'
      return

    $scope.maximize = (section) ->
      $scope.viewModel.openSection = section;
      return

    return