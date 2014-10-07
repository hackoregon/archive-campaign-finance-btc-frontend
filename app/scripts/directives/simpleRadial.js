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
      controller: function ($scope, $attrs) {
        $scope.viewModel = {
          formattedPercent: ''
        };

        $scope.radius = ($attrs.size ? parseInt($attrs.size) : 50);

        $scope.positionIcon = function() {
          var radius = $scope.radius;
          var half = radius / 2;
          return {
            width: radius + 'px',
            height: radius + 'px',
            'margin-top': (0-radius) + 'px',
            position: 'relative',
            top: (radius + half) + 'px',
            left: (radius - half) + 'px'
          }
        }
        $scope.colors = [ '#64BCBB', '#D9D9D9' ];
        if ($attrs.color) {
          $scope.colors[0] = $attrs.color;
        }
      },
      link: function(scope, element) {

        element.addClass("radial");

        var radius = scope.radius;
        var svg = d3.select(element.find(".radial")[0]).append("svg")
          .attr("width", "100")
          .attr("height", "100")
        .append("g")
          .attr("transform", "translate("+radius+","+radius+")");

        var pie = d3.layout.pie().sort(null);

        var thickness = radius / 5;
        var arc = d3.svg.arc()
            .innerRadius(radius - 5 - thickness)
            .outerRadius(radius - 5);

        var render = function() {
          if (!scope.percent) {
            return;
          }

          // for the visualization, clip to 100%
          var showPercent = d3.min([scope.percent, 1.0]);

          svg.empty();
          svg.selectAll("path")
              .data( pie([showPercent, 1.0-showPercent]) )
            .enter().append("path")
              .attr("fill", function(d, i) { return scope.colors[ (i % scope.colors.length) ]} )
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
