(function() {
  'use strict';
  angular.module('frontendApp').controller('BrowseCtrl', function($scope, $location, SessionService, BALLOT) {

    $scope.BALLOT = BALLOT;

    $scope.viewModel = {
      searchArea: BALLOT.FULLADDRESS,
      hasAttempted: false,
      address: {
        streetAddress: SessionService.address.streetAddress,
        city: SessionService.address.city,
        zip: SessionService.address.zip
      }
    };
    $scope.selectArea = function(area) {
      $scope.viewModel.searchArea = area;
    }
    $scope.isLocal = function() {
      return $scope.viewModel.searchArea === BALLOT.FULLADDRESS;
    }
    $scope.isZip = function() {
      return $scope.viewModel.searchArea === BALLOT.ZIP;
    }
    $scope.isCounty = function() {
      return $scope.viewModel.searchArea === BALLOT.COUNTY;
    }
    $scope.go = function(location) {
      return $location.path(location);
    };
    $scope.setMyBallot = function() {
      $scope.viewModel.hasAttempted = true;
      if ($scope.query.$valid) {
        // TODO: check which search is used ($scope.searchArea) and call different methods on SessionService or AddressService?
        SessionService.update($scope.viewModel.address);
        go('/myballot');
      }
    }

  })
  .constant('BALLOT', {
    'FULLADDRESS': 'Local',
    'ZIP': 'Zipcode',
    'COUNTY': 'County'
  });

})();