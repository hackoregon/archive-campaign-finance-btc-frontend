(function() {
  'use strict';
  angular.module('frontendApp').directive('whereDir', function() {
    return {
      restrict: 'EA',
      scope: {},
      link: function(scope, element, attrs) {
        var height, path, quantize, rateById, rateByIdAfter, ready, svg, width;
        ready = function(error, us) {
          var g;
          return g = svg.append("g").attr("class", "counties").selectAll("path").data(topojson.feature(us, us.objects.counties).features).enter().append("path").attr("style", function(d, i) {
            return "opacity: " + rateById.get(d.id) * 6 + ";";
          }).attr("d", path);
        };
        width = 300;
        height = 300;
        rateById = d3.map();
        rateByIdAfter = d3.map();
        quantize = d3.scale.quantize().domain([0, .15]).range(d3.range(9).map(function(i) {
          return "q" + i + "-9";
        }));
        path = d3.geo.path();
        svg = d3.select(element[0]).append("svg").attr("width", width).attr("height", height);
        queue().defer(d3.json, "/data/where-map.json").defer(d3.tsv, "/data/where-before.tsv", function(d) {
          return rateById.set(d.id, +d.rate);
        }).defer(d3.tsv, "/data/where-after.tsv", function(d) {
          return rateByIdAfter.set(d.id, +d.rate);
        }).await(ready);
        window.redraw = function(z) {
          var x, y;
          g.attr("style", function(d, i) {});
          x = rateById.get(d.id) * 6;
          y = rateByIdAfter.get(d.id) * 6;
          "opacity: " + (x + ((y - x) * z)) + ";";
        };
      }
    };
  });

}).call(this);