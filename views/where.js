var HackOre = require('sara')
  , d3 = require('d3')
  , queue = require('../lib/queue')
  , topojson = require('../lib/topojson')

module.exports = new HackOre.View('Where', {
  prerender: false
, render: function () {
    document.querySelector('#viz-style').href = '/where.css'
    document.querySelector('main').innerHTML  = '<h3>Concentration of Campaign Money in the State of Oregon</h3>'

    var width = 300,
        height = 300,
        g;

    var rateById = d3.map();
    var rateByIdAfter = d3.map();
  
    var quantize = d3.scale.quantize()
        .domain([0, .15])
        .range(d3.range(9).map(function(i) { return "q" + i + "-9"; }));

    var path = d3.geo.path();
  
    var svg = d3.select('main').append("svg")
        .attr("width", width)
        .attr("height", height);

    queue()
      .defer(d3.json, "/where-map.json")
      .defer(d3.tsv, "/where-before.tsv", function(d) { rateById.set(d.id, +d.rate); })
      .defer(d3.tsv, "/where-after.tsv", function(d) { rateByIdAfter.set(d.id, +d.rate); })
      .await(ready);

    window.redraw = function (z) {
      g.attr('style', function (d, i) {
        var x = rateById.get(d.id) * 6
          , y = rateByIdAfter.get(d.id) * 6

        return 'opacity: ' + (x + ((y - x) * z)) + ';'
      })
    }

    function ready(error, us) {
      g = svg.append("g")
        .attr("class", "counties")
        .selectAll("path")
        .data(topojson.feature(us, us.objects.counties).features)
        .enter().append("path")
        .attr('style', function (d, i) {
          return 'opacity: ' + rateById.get(d.id) * 6 + ';'
        })
        .attr("d", path);

      window.redraw(.5)
    }
  }
})
