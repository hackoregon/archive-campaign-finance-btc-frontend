(function () {
  'use strict';
  angular.module('frontendApp').directive('bubbleChart', function () {
    return {
      restrict: 'EA',
      scope: {
        donations: '=',
        colorMap: '='
      },
      link: function (scope, element, attrs) {

        scope.$watch('donations', function(){
          if (scope.donations && !_(scope.donations).isEmpty()) {
            render();
          }
        });
        
        var render = function(){
          element.empty();

          var width = 800;
          var height = 600;

          var colorMap = function(d) {
            return scope.colorMap[d.category];
          };

          var bubble = d3.layout.pack()
            .sort(null)
            .size([width, height])
            .padding(1.5);

          var legend = d3.select(element[0]).append('div').attr('class', 'legend');

          legend.selectAll('.category').data(_(scope.colorMap).keys())
            .enter().append('div')
            .attr('class', 'category')
            .attr('style', function(d){
              var backgroundColor = scope.colorMap[d];
              return 'background-color:'+backgroundColor;
            })
            .text(function(d){
              return d;
            });

          var svg = d3.select(element[0]).append('svg')
            .attr('width', width)
            .attr('height', height)
            .attr('class', 'bubble');

          var node = svg.selectAll('.node')
            .data(bubble.nodes(scope.donations)
            .filter(function(d){
              return d.depth > 0;
            }))
            .enter().append('g')
            .attr('class', 'node')
            .attr('transform', function(d) {
              return 'translate(' + d.x + ',' + d.y + ')';
            });

          node.append('title')
            .text(function(d) {
              return d.category + ': ' + d.value;
            });

          node.append('circle')
            .attr('r', function(d) { return d.r; })
            .style('fill', colorMap);

          node.append('text')
            .attr('dy', '.3em')
            .style('text-anchor', 'middle')
            .text(function(d) { return d.category; });

        };

      }
    };
  });

}).call(this);
