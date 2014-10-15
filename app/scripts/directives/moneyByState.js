(function () {
  'use strict';
  angular.module('frontendApp').directive('moneyByState', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/moneyByState.html',
      scope: {
        money: '='
      },
      controller: function ($scope) {

      },
      link: function(scope, element) {
        var width = 960;
        var	height = 600;

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width)
          .attr("height", height);

        var path = d3.geo.path();

        var color = d3.scale.linear()
          .domain([100, 1000, 10000, 100000, 1000000, 10000000, 100000000])
          .range(["rgb(204,236,230)", "rgb(153,216,201)", "rgb(102,194,164)", "rgb(65,174,118)","rgb(35,139,69)","rgb(0,109,44)", "rgb(0, 55, 22)"]);

        var usStates = null;

        d3.json("/data/us-states.json", function(json) {
          usStates = json;
          render();
        });

        scope.$watch('money', function(){
          render();
        });

        var render = function() {
          if (!scope.money || !usStates) {
            return;
          }

          svg.empty();
          for (var i = 0; i < scope.money.length; i++) {
            var dataState = scope.money[i].state;
            var dataValue = parseFloat(scope.money[i].value);
            for (var j = 0; j < usStates.features.length; j++) {
              var jsonState = usStates.features[j].properties.name;
              if (dataState == jsonState) {
                usStates.features[j].properties.value = dataValue;
                break;

              }
            }
          }

          svg.selectAll("path")
            .data(usStates.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d) {
              var value = d.properties.value;
              if (value) {
                return color(value);
              } else {
                return "#ccc";
              }
            });
          };
      }
    };
  });

}).call(this);
