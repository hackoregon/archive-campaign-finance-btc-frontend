(function () {
  'use strict';
  angular.module('frontendApp').directive('donorList', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/donorList.html',
      scope: {
        donors: '=',
        title: '@'
      },
      controller: function ($scope) {
        var donorMax, donorSize;

        var lazySetup = function(){
          if (!_.isArray($scope.donors)) {
            return;
          }
          if (!donorMax) {
            donorMax = d3.max($scope.donors, function(donor){
              return donor.amount;
            });
          }
          if (!donorSize) {
            donorSize  = d3.scale.linear()
              .domain([0, donorMax])
              .range([0,1]);
          }
        }

        var colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');

        $scope.showAll = false;

        $scope.donorPercent = function(amount) {
          lazySetup();
          if ($scope.donors && $scope.donors.length > 0) {
            return {
              size: 100 * donorSize(amount) + '%',
              color: colorBlend(donorSize(amount))
            };
          }
          else return { size: '0%', color: '#FFF'};
        }
        $scope.toggleSize = function() {
          $scope.showAll = !$scope.showAll;
        }
        $scope.haveMoreDonors = function() {
          if (!$scope.donors) return false;
          if ($scope.donors) {
            return ($scope.donors.length > 5 || $scope.donors.length > 5);
          }
          return false;
        }

      }
    };
  });
}).call(this);
