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
        $scope.dataSet = [];
        $scope.showTooltip = false;
      },
      link: function(scope, element, attrs) {

        function formatPercent(val) {
          return Math.round(100.0 * val) + '%';
        }

        var padding = { top: 35, left: 10, bottom: 85, right: 10 };
        var interpColor = d3.interpolateRgb('#D8E4D1', '#49A14C');
        var themeColors = [
          '#64BCBB', '#A3D3D2', '#DEEEED', '#E8F5F5',
          '#49A14C', '#72AE69', '#B5D0AB', '#D8E4D1',
          '#C89C60', '#DBBF96', '#E6D1B5', '#F0E5D6',
          '#C3645E', '#CC7E75', '#E1B7AE', '#EDD7D1',
          '#67576A', '#98869A', '#B4A7B5', '#D4CCD4',
          '#666666', '#828282', '#BFBFBF', '#D9D9D9'
        ]
        function pieColor(i) {
          return themeColors[ i % themeColors.length ];
        }

        var svg = d3.select(element[0]).select('.d3spend')
          .append('svg')
          .attr('width', '100%');

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
            .range([0, scope.h - padding.bottom - padding.top]);

          function fillTooltip(d, element) {
            var xPosition = parseFloat(d3.select(element).attr('x')) + xScale.rangeBand() / 2;
            var yPosition = parseFloat(d3.select(element).attr('y')) + 14;

            d3.select('#d3tooltip')
              .style('left', xPosition + '%')
              .style('top', yPosition + 'px')
              .select('#value')
                .text(d.name);
          }

          clearSvg();
          svg.attr('height', scope.h)
            .selectAll('rect')
            .data(dataSet)
            .enter()
              .append('rect')
              .attr('x', function(d,i) { return xScale(i)+'%' })
              .attr('y', function(d) { return scope.h - yScale(d.amount) - padding.bottom })
              .attr("width", colWidth + '%')
              .attr('height', function(d) { return yScale(d.amount) })
              .attr('fill', function(d, i) { return interpColor( d.amount / maxVal )})
              .on('mouseover', function(d) {
                d3.select(this).attr('fill', '#10716F')
                fillTooltip(d, this);
                scope.$apply( function() {
                  scope.showTooltip = true;
                })
              })
              .on('mouseout', function(d) {
                d3.select(this)
                  .attr('fill', function(d, i) { return interpColor( d.amount / maxVal )})

                scope.$apply( function() {
                  scope.showTooltip = false;
                })
              });

          svg.selectAll('text')
            .data(dataSet)
            .enter()
              .append('text')
              .text(function(d) { return formatPercent(d.amount / total) })
              .attr('x', function(d,i) { return xScale(i) + (colWidth/2)+'%' })
              .attr('y', function(d) { return scope.h - yScale(d.amount) - padding.bottom - 10})
              .on('mouseover', function(d) {
                fillTooltip(d, this);
                scope.$apply( function() {
                  scope.showTooltip = true;
                })
              })
              .on('mouseout', function(d) {
                scope.$apply( function() {
                  scope.showTooltip = false;
                })
              });
        }
        function renderPie() {
          var dataSet = scope.dataSet;
          var total = d3.sum(dataSet, function(d) { return d.amount} );

          clearSvg();
          svg.attr('height', scope.h + padding.top + padding.bottom);

          var r = scope.h / 2;
          var g = svg.append('g')
            .attr('transform', 'translate('+(r+padding.left+50)+','+(r+padding.top)+')')
            .data([dataSet])

          var pie = d3.layout.pie().sort(null).value( function(d) { return d.amount });
          var arc = d3.svg.arc().outerRadius(r);
          var arcs = g.selectAll("g.slice")
              .data(pie)
            .enter()
              .append("g")
                .attr("class", "slice");

          function fillTooltip(d, element) {
            var pos = arc.centroid(d);
            d3.select('#d3tooltip')
              .style('left', pos[0] + r + 'px')
              .style('top', (pos[1] + r - 14) + 'px')
              .select('#value')
                .text(d.data.name);
          }

          arcs.each(function(d) {
            var a = d.startAngle + (d.endAngle - d.startAngle) / 2 - Math.PI / 2;
            if ((d.value / total) < .05) {
              d.cx = Math.cos(a) * (r + 20);
              d.cy = Math.sin(a) * (r + 20);
            }
          })
          arcs.append("path")
            .attr("fill", function(d, i){ return pieColor(i); })
            .attr("d", function (d) { return arc(d); })
            .on('mouseover', function(d) {
              d3.select(this).attr('fill', '#10716F')
              fillTooltip(d, this);
              scope.$apply( function() {
                scope.showTooltip = true;
              })
            })
            .on('mouseout', function(d, i) {
              var color = pieColor(i);
              d3.select(this)
                .attr('fill', color);

              scope.$apply( function() {
                scope.showTooltip = false;
              })
            });

          arcs.append("text")
            .attr("transform", function(d) {
              if (d.cx && d.cy) {
                return "translate(" + d.cx + "," + d.cy + ")";
              }
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
