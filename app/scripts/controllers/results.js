(function() {
  'use strict';
  angular.module('frontendApp').controller('ResultsCtrl', function($scope, $routeParams, CampaignService, SEARCH_TYPE) {

    $scope.viewModel = {
      searchType: $routeParams.searchType,
      searchTerm: $routeParams.searchTerm,
      campaigns: []
    };

    $scope.$watchCollection('[viewModel.searchType, viewModel.searchTerm]', _(function(){
      CampaignService.searchCampaigns($scope.viewModel.searchTerm)
        .then(function(campaigns){
          $scope.viewModel.campaigns = campaigns;
        });
    }).debounce(250));


  });

}());