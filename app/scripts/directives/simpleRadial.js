(function () {
  'use strict';
  angular.module('frontendApp').directive('simpleRadial', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/simpleRadial.html',
      scope: {
        percent: '=',
        title: '@',
        icon: '@'
      },
      controller: function ($scope) {
        $scope.viewModel = {
          formattedPercent: ''
        };
      },
      link: function(scope, element) {

        element.addClass("radial");

        var radius = 50;
        var svg = d3.select(element.find(".radial")[0]).append("svg")
          .attr("width", "100")
          .attr("height", "100")
        .append("g")
          .attr("transform", "translate("+radius+","+radius+")");

        var colors = [ '#64BCBB', '#D9D9D9' ]

        var pie = d3.layout.pie().sort(null);

        var arc = d3.svg.arc()
            .innerRadius(radius - 15)
            .outerRadius(radius -  5);

        var render = function() {
          if (!scope.percent) {
            return;
          }

          svg.empty();
          svg.selectAll("path")
              .data( pie([scope.percent, 1.0-scope.percent]) )
            .enter().append("path")
              .attr("fill", function(d, i) { return colors[ (i % colors.length) ]} )
              .transition().duration(1000).ease('cubic')
              .attrTween("d", function(b) {
                var i = d3.interpolate({startAngle: 0, endAngle: 2*Math.PI}, b);
                return function(t) { return arc(i(t)); };
              });
        }

        scope.$watch('percent', function(){
          if (_(scope.percent).isNumber()){
            var percent = scope.percent * 100;
            scope.viewModel.formattedPercent = Math.round(percent);
          } else {
            scope.viewModel.formattedPercent = '';
          }
          render();
        });

      }
    };
  });

}).call(this);
