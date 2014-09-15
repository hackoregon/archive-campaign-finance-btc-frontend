(function() {
  'use strict';
  angular.module('frontendApp')
    .controller('SearchCtrl', function($scope, $location, SEARCH_TYPE) {

      $scope.SEARCH_TYPE = SEARCH_TYPE;

      $scope.viewModel = {
        candidateSearchTerm: '',
        partySearchTerm: ''
      };

      $scope.onCandidateSearch = function() {
        $location.path('/results/' + SEARCH_TYPE.CANDIDATE + '/' + $scope.viewModel.candidateSearchTerm);
      };

      $scope.onPartySearch = function() {

      };

    })
    .constant('SEARCH_TYPE', {
      'CANDIDATE': 'candidate',
      'PARTY': 'party',
      'ADDRESS': 'address'
    });;

}());