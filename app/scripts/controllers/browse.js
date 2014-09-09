(function() {
  'use strict';
  angular.module('frontendApp').controller('BrowseCtrl', function($scope, $location, $routeParams, SessionService, AddressService, DISTRICTS) {
    $scope.raceLevels = DISTRICTS;
    $scope.go = function(location) {
      return $location.path(location);
    };
    $scope.viewModel = {
      races: [],
      editMode: true,
      raceLevel: $routeParams.raceLevel || $scope.raceLevels.CITY,
      validAddress: false,
      address: {
        streetAddress: SessionService.address.streetAddress,
        city: SessionService.address.city,
        zip: SessionService.address.zip
      }
    };
    $scope.validate = function() {
      $scope.viewModel.validAddress = $scope.viewModel.address.streetAddress && $scope.viewModel.address.city && $scope.viewModel.address.zip;
    };
    $scope.enableAddressEdit = function() {
      $scope.viewModel.editMode = true;
    };
    $scope.onAddressSubmit = function() {
      AddressService.getRacesByAddress($scope.viewModel.address).then(function(result) {
        return $scope.viewModel.races = result;
      });
      $scope.viewModel.editMode = false;
    };
  });

}).call(this);