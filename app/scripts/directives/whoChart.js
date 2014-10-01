(function () {
  'use strict';
  angular.module('frontendApp')
  .directive('whosGiving', function(CampaignService, $window) {
    return {
      restrict: 'EA',
      template: '<div class="source">' +
                  '<div class="icon-container">' +
                    '<div ng-style="getStyle()"'+
                         'class="funding-icon" ng-class="icon()"></div>' +
                  '</div>' +
                  '<div>' +
                    '<p class="h3 text-center"> {{ label() }} </p>' +
                    '<p class="h4 text-center"> {{ getamount() | toMoney }} </p>' +
                  '</div>' +
                '</div>',
      replace: true,
      scope: true,
      controller: function($scope, $attrs) {
        $scope.ui = {
          PAC:        {label: 'PAC', icon: 'pac'},
          Business:   {label: 'Corporate', icon: 'corporate'},
          Grassroots: {label: 'Grass Roots', icon: 'grassroot'},
          Individual: {label: 'Large Donors', icon: 'individual'},
          Party:      {label: 'Party', icon: 'party'},
          //Union?
          NA: {label: 'Unknown'}
        };

        $scope.giver = $attrs['whosGiving'] || 'NA';

        $scope.label = function() {
          return $scope.ui[$scope.giver].label;
        }
        $scope.icon = function() {
          return "icon-" + $scope.ui[$scope.giver].icon;
        }
        $scope.getamount = function() {
          if ($scope.money && $scope.money[$scope.giver]) {
            return $scope.money[$scope.giver].amount;
          }
          return 0;
        }
        var normalize = function(key) {
          var val = 0;
          if ($scope.money && $scope.money[key]) {
            val = $scope.money[key].amount;
          }
          var result = 100.0 * Math.sqrt(val / $scope.maxVal);
          if (result < 5.0) {
            return 5.0;
          }
          return result;
        }
        $scope.getStyle = function() {
          var sz = normalize($scope.giver);
          var margin = (100 - sz) / 2;
          return {
            width: sz + '%',
            height: sz + '%',
            position: 'relative',
            top: margin + '%',
            left: margin + '%'
          }
        }
      }
    }
  })
  .directive('whoChart', function (CampaignService, $window) {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/whoChart.html',
      scope: {
        money: '=',
        donors: '='
      },
      controller: function ($scope, $attrs) {

        $scope.maxVal = 1.0;
        $scope.dataSet = [];
        
        $scope.topDonors = [];
        $scope.topCorp = [];
        $scope.startAt = 0;
        $scope.selectLength = 5;

        $scope.formatData = function(dataSrc) {
          $scope.dataSet.length = 0;
          angular.forEach(dataSrc, function(val, key) {
            var obj = angular.copy(val);
            obj.name = key;
            $scope.dataSet.push(obj);
          });
        }
        $scope.computeMax = function(money) {
          $scope.maxVal = 1.0;
          if (!money) {
            return;
          }
          angular.forEach(CampaignService.CONTRIBUTION, function(val, key) {
            if (money[val]) {
              $scope.maxVal = Math.max(money[val].amount, $scope.maxVal);
            }
          });
        }
        $scope.size = function(key) {
          var val = 0;
          var dataSrc = $scope.money || $scope.defaultMoney;
          if (dataSrc[key]) {
            val = dataSrc[key].amount;
          }
          return (0.7 * $scope.h) * Math.sqrt(1.0 * val / $scope.maxVal);
        }
        function transfer(fromList, toList) {
          toList.length = 0;
          if (fromList) {
            var start = $scope.startAt;
            var end = Math.min(fromList.length, start + $scope.selectLength);
            for(var i = start; i < end; i += 1) {
              toList.push(fromList[i]);
            }
          }
        }
        $scope.fillTopDonors = function() {
          if ($scope.donors && $scope.donors.indiv) {
            transfer($scope.donors.indiv, $scope.topDonors);
          }
          if ($scope.donors && $scope.donors.corp) {
            transfer($scope.donors.corp, $scope.topCorp);
          }
        }
        var colorBlend = d3.interpolateRgb('#A3D3D2', '#10716F');
        $scope.donorPercent = function(i) {
          var val = $scope.topDonors[i].amount / $scope.topDonors[0].amount; 
          return {
            size: 100 * val + '%',
            color: colorBlend(val)
          };
        }
        $scope.businessPercent = function(i) {
          var val = $scope.topCorp[i].amount / $scope.topCorp[i].amount;
          return {
            size: 100 * val + '%',
            color: colorBlend(val)
          };
        }
      },
      link: function(scope) {

        scope.$watch('money', function(newVal, oldVal) {
          var data = newVal || scope.defaultMoney;
          scope.formatData(data);
          scope.computeMax(data);
        });
        scope.$watch('donors', function(newVal) {
          scope.fillTopDonors();
        });

      }
    };
  });
  angular.module('frontendApp').filter('toMoney', function() {
    return function(amt) {
      var suffix = '';
      if (amt > 49999) {
        amt = Math.round(amt / 1000);
        suffix = ' k';
      } else if (amt > 999999) {
        amt = Math.round(amt / 1000000);
        suffix = ' m';
      }
      return '$' + amt + suffix;
    }
  })

})();