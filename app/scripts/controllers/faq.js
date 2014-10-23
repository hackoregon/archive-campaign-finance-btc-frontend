(function() {
  'use strict';
  angular.module('frontendApp').controller('FaqCtrl', function($scope, CampaignService) {

    $scope.endpointDocs = [];

    CampaignService.getEndpointDocs().then(function(docs){
      $scope.endpointDocs = docs;
    });

  });


}).call(this);
