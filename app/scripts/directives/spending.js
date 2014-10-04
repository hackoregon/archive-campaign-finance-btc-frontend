(function () {
  'use strict';
  angular.module('frontendApp').directive('spendingChart', function () {
    return {
      restrict: 'EA',
      templateUrl: '/views/directives/spending.html',
      scope: {
        money: '='
      },
      controller: function ($scope, $attrs) {
        $scope.chartType = 'bar';
        $scope.h = $attrs.height || 300; // hmmm, in px :/
        $scope.w = 100; // in percent
        $scope.dataSet = [];
      },
      link: function(scope, element, attrs) {

        function formatPercent(val) {
          return Math.round(100.0 * val) + '%';
        }

        var h = scope.h;
        var w = scope.w;
        var padding = { top: 35, left: 10, bottom: 85, right: 10 };
        var pieColors = d3.scale.category20c();
        var interpColor = d3.interpolateRgb('#D8E4D1', '#49A14C');

        var svg = d3.select(element[0]).select('.d3spend')
          .append('svg');

        function clearSvg() {
          svg.selectAll('g').remove();
          svg.selectAll('rect').remove();
          svg.selectAll('text').remove();
        }
        function renderBars() {
          var dataSet = scope.dataSet;
          var total = d3.sum(dataSet, function(d) { return d.amount} );
          var maxVal = d3.max(dataSet, function(d) { return d.amount} );

          var xScale = d3.scale.ordinal()
            .domain(d3.range(dataSet.length))
            .rangeRoundBands([0, 100], 0.2);

          var colWidth = Math.min(xScale.rangeBand(), 20);

          var yScale = d3.scale.linear()
            .domain([0, maxVal])
            .range([padding.top, h - padding.bottom - padding.top]);

          clearSvg();
          svg.attr('height', scope.h)
            .attr('width', scope.w + '%');
          svg.selectAll('rect')
            .data(dataSet)
            .enter()
              .append('rect')
              .attr('x', function(d,i) { return xScale(i)+'%' })
              .attr('y', function(d) { return h - yScale(d.amount) - padding.bottom })
              .attr("width", colWidth + '%')
              .attr('height', function(d) { return yScale(d.amount) })
              .attr('fill', function(d, i) { return interpColor( d.amount / maxVal )})
              .append('title')
                .text(function(d) { return d.name });

          svg.selectAll('text')
            .data(dataSet)
            .enter()
              .append('text')
              .text(function(d) { return formatPercent(d.amount / total) })
              .attr('x', function(d,i) { return xScale(i) + (colWidth/2)+'%' })
              .attr('y', function(d) { return h - yScale(d.amount) - padding.bottom - 10});
        }
        function renderPie() {
          var dataSet = scope.dataSet;
          var total = d3.sum(dataSet, function(d) { return d.amount} );

          clearSvg();
          svg.attr('height', scope.h)
            .attr('width', scope.w + '%');

          var r = scope.h / 2;
          var g = svg.attr('height', 2*r)
            .append('g')
            .attr('transform', 'translate('+r+','+r+')')
            .data([dataSet])

          var pie = d3.layout.pie().sort(null).value( function(d) { return d.amount });
          var arc = d3.svg.arc().outerRadius(r);
          var arcs = g.selectAll("g.slice")
              .data(pie)
            .enter()
              .append("g")
                .attr("class", "slice");

          arcs.append("path")
            .attr("fill", function(d, i){ return pieColors(i); })
            .attr("d", function (d) {
              return arc(d);
            });

          arcs.append("text")
            .attr("transform", function(d) {
              d.innerRadius = 0;
              d.outerRadius = r;
              return "translate(" + arc.centroid(d) + ")";
            })
            .text( function(d, i) {
              return formatPercent(d.data.amount / total);
            })
            .append('title')
              .text(function(d,i) { return dataSet[i].name });
        }
        function renderEmpty() {
          clearSvg();
          svg.attr('width', '100%')
            .append('text')
            .text('(No data reported)')
            .attr('x', '50%')
            .attr('y', '50%');
        }
        function render() {
          if (scope.dataSet.length == 0) { renderEmpty() }
          else if (scope.chartType === 'bar') { renderBars() }
          else if (scope.chartType === 'pie') { renderPie() }
        }

        attrs.$observe('height', function() { render(); })
        scope.$watch('chartType', function(newVal) {
          render();
        });
        scope.$watch('money', function(newVal) {
          var dataSrc = (newVal || []);
          scope.dataSet.length = 0;
          angular.forEach(dataSrc, function(d, i) {
            var itemName = i || "Unknown";
            scope.dataSet.push( {amount: d, name: itemName});
          })

          render();
        });
      }
    };
  });

})();
