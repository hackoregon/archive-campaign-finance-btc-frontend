(function() {
  'use strict';
  angular.module('frontendApp').controller('ResultsCtrl', function($scope, $routeParams, CampaignService, Title, SEARCH_TYPE) {

    Title.setTitle('Search Page');

    $scope.viewModel = {
      searchType: $routeParams.searchType,
      searchTerm: $routeParams.searchTerm,
      campaigns: []
    };

    $scope.$watchCollection('[viewModel.searchType, viewModel.searchTerm]', _.debounce(function(){
      CampaignService.searchCampaigns($scope.viewModel.searchTerm)
        .then(function(campaigns){
          $scope.viewModel.campaigns = campaigns;
        });
    }, 250));


  });

}());