(function () {
  'use strict';
  angular.module('frontendApp').directive('bubbleChart', function (CampaignService) {
    return {
      restrict: 'EA',
      scope: {
        donations: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch('viewModel.donations', function(){
          console.log(viewModel.donations);
        });


      }
    };
  });

}).call(this);
