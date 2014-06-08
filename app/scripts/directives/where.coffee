'use strict'

angular.module('frontendApp')
  .directive('whereDir', () ->
    restrict: 'EA'
    scope: {}
    link: (scope, element, attrs) ->
        ready = (error, us) ->
            g = svg.append("g")
                .attr("class", "counties")
                .selectAll("path")
                .data(topojson.feature(us, us.objects.counties).features)
                .enter()
                .append("path")
                .attr("style", (d, i) ->
                        "opacity: " + rateById.get(d.id) * 6 + ";")
                .attr("d", path)

        width = 300
        height = 300
        rateById = d3.map()
        rateByIdAfter = d3.map()
        quantize = d3.scale.quantize()
                         .domain([0,.15])
                         .range(d3.range(9).map((i) ->
                                "q" + i + "-9"))
        path = d3.geo.path()
        svg = d3.select(element[0]).append("svg")
                                   .attr("width", width)
                                   .attr("height", height)
        # data collection should go to a service and then be controlled
        # with the where controller
        queue()
        .defer(d3.json, "/data/where-map.json")
        .defer(d3.tsv, "/data/where-before.tsv", (d) -> rateById.set(d.id, +d.rate))
        .defer(d3.tsv, "/data/where-after.tsv", (d) -> rateByIdAfter.set(d.id, +d.rate))
        .await(ready)
        # d3.json "/data/where-map.json"
        # d3.tsv "/data/where-before.tsv", (d) ->
        #     rateById.set d.id, +d.rate
        # d3.tsv "/data/where-after.tsv", (d) ->
        #     rateByIdAfter.set d.id, +d.rate

        window.redraw = (z) ->
            g.attr "style", (d, i) ->
            x = rateById.get(d.id) * 6
            y = rateByIdAfter.get(d.id) * 6
            "opacity: " + (x + ((y - x) * z)) + ";"
            return
        return
)


# queue = require("../lib/queue")
# topojson = require("../lib/topojson")
# module.exports = new HackOre.View("Where",
  # prerender: false
  # render: ->
    # ready = (error, us) ->
    #   g = svg.append("g")
    #         .attr("class", "counties")
    #         .selectAll("path")
    #         .data(topojson.feature(us, us.objects.counties).features)
    #         .enter()
    #         .append("path")
    #         .attr("style", (d, i) ->
    #                 "opacity: " + rateById.get(d.id) * 6 + ";")
    #         .attr("d", path)
    #   window.redraw .5
    #   return
    # document.querySelector("#viz-style").href = "/where.css"
    # document.querySelector("main").innerHTML = "<h3>Concentration of Campaign Money in the State of Oregon</h3>"
    
