(function () {
  'use strict';
  angular.module('frontendApp')
  .directive('whosGiving', function(CampaignService, $window, rangeFilter) {
    return {
      restrict: 'EA',
      template: '<div class="source">' +
                  '<div class="icon-container">' +
                    '<div ng-style="getStyle()"'+
                         'class="funding-icon" ng-class="icon()"></div>' +
                  '</div>' +
                  '<div>' +
                    '<p class="h3 text-center"> {{ label() }} </p>' +
                    '<p class="h4 text-center"> {{ getamount() | currencyFormat }} </p>' +
                  '</div>' +
                '</div>',
      replace: true,
      scope: true,
      controller: function($scope, $attrs) {
        $scope.ui = {
          PAC:        {label: 'PAC', icon: 'pac'},
          Business:   {label: 'Business', icon: 'corporate'},
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
        $scope.donorLists = [];

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
        $scope.shift = function(direction) {
          if ($scope.donorLists.length > 1) {
            if (direction === 'RIGHT') {
              var item = $scope.donorLists.shift();
              $scope.donorLists.push(item);
            } else if (direction === 'LEFT') {
              var item = $scope.donorLists.pop();
              $scope.donorLists.unshift(item);
            }
          }
        }
      },
      link: function(scope) {

        scope.$watch('money', function(newVal, oldVal) {
          var data = newVal;
          scope.formatData(data);
          scope.computeMax(data);
        });
        scope.$watch('donors', function(newVal) {
          if (newVal) {
            scope.donorLists.length = 0;
            if (newVal.indiv && newVal.indiv.length > 0) {
              scope.donorLists.push({data: newVal.indiv, label: "Top Individual Donors"});
            }
            if (newVal.corp && newVal.corp.length > 0) {
              scope.donorLists.push({data: newVal.corp, label: "Top Business Donors"});
            }
            if (newVal.pac && newVal.pac.length > 0) {
              scope.donorLists.push({data: newVal.pac, label: "Top Committee Donors"});
            }
          }
        })
      }
    };
  });

})();
