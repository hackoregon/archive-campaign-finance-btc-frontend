(function () {
  'use strict';
  angular.module('frontendApp').directive('sliderChart', function () {
    return {
      restrict: 'EA',
      scope: {
       fundingExpenditures: '='
     },
     link: function (scope, element, attrs) {
      scope.$watch('fundingExpenditures', function(){
        render();
      });

      d3.legend = function(g) {
        g.each(function() {
          var g= d3.select(this),
              items = {},
              svg = d3.select(g.property("nearestViewportElement")),
              legendPadding = g.attr("data-style-padding") || 5,
              lb = g.selectAll(".legend-box").data([true]),
              li = g.selectAll(".legend-items").data([true])

          lb.enter().append("rect").classed("legend-box",true)
          li.enter().append("g").classed("legend-items",true)

          svg.selectAll("[data-legend]").each(function() {
              var self = d3.select(this)
              items[self.attr("data-legend")] = {
                pos : self.attr("data-legend-pos") || this.getBBox().y,
                color : self.attr("data-legend-color") != undefined ? self.attr("data-legend-color") : self.style("fill") != 'none' ? self.style("fill") : self.style("stroke")
              }
            })

          items = d3.entries(items).sort(function(a,b) { return a.value.pos-b.value.pos})


          li.selectAll("text")
              .data(items,function(d) { return d.key})
              .call(function(d) { d.enter().append("text")})
              .call(function(d) { d.exit().remove()})
              .attr("y",function(d,i) { return i+"em"})
              .attr("x","1em")
              .text(function(d) { ;return d.key})

          li.selectAll("circle")
              .data(items,function(d) { return d.key})
              .call(function(d) { d.enter().append("circle")})
              .call(function(d) { d.exit().remove()})
              .attr("cy",function(d,i) { return i-0.25+"em"})
              .attr("cx",0)
              .attr("r","0.4em")
              .style("fill",function(d) { return d.value.color})

          // Reposition and resize the box
          var lbbox = li[0][0].getBBox()
          lb.attr("x",(lbbox.x-legendPadding))
              .attr("y",(lbbox.y-legendPadding))
              .attr("height",(lbbox.height+2*legendPadding))
              .attr("width",(lbbox.width+2*legendPadding))
        })
        return g
      }


      function render(){
        if (!scope.fundingExpenditures) {
          return;
        }
        var inData = scope.fundingExpenditures.data;

        var margin = {top: 10, right: 10, bottom: 100, left: 100},
        margin2 = {top: 430, right: 10, bottom: 20, left: 100},
        width = 750 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom,
        height2 = 500 - margin2.top - margin2.bottom;

        var parseDate = d3.time.format("%b %Y").parse;
        var parseDate2 = d3.time.format("%Y-%m-%d").parse;

        var x = d3.time.scale().range([0, width]),
        x2 = d3.time.scale().range([0, width]),
        y = d3.scale.linear().range([height, 0]),
        y2 = d3.scale.linear().range([height2, 0]);

        var xAxis = d3.svg.axis().scale(x).orient("bottom"),
        xAxis2 = d3.svg.axis().scale(x2).orient("bottom"),
        yAxis = d3.svg.axis().scale(y).orient("left");

        var brush = d3.svg.brush()
        .x(x2)
        .on("brush", brushed);

        var svg = d3.select(element[0]).append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom);

        var count = 0;

        var areaFundsRaised = d3.svg.area()
        .interpolate("linear")
        .x(function(d) { return x(d.tran_date); })
        .y0(height)
        .y1(function(d) { return y(d.total_in); });

        var areaFundsSpent = d3.svg.area()
        .interpolate("linear")
        .x(function(d) { return x(d.tran_date); })
        .y0(height)
        .y1(function(d) { return y(d.total_out); });

        var areaFundsRaisedMini = d3.svg.area()
        .interpolate("linear")
        .x(function(d) { return x2(d.tran_date); })
        .y0(height2)
        .y1(function(d) { return y2(d.total_in); });

        var areaFundsSpentMini = d3.svg.area()
        .interpolate("linear")
        .x(function(d) { return x2(d.tran_date); })
        .y0(height2)
        .y1(function(d) { return y2(d.total_out); });

        svg.append("defs").append("clipPath")
        .attr("id", "clip")
        .append("rect")
        .attr("width", width)
        .attr("height", height);

        var focus = svg.append("g")
        .attr("class", "focus")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var context = svg.append("g")
        .attr("class", "context")
        .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");

        var parsedDates = inData.map(function(d) { return type(d); })

        x.domain(d3.extent(parsedDates.map(function(d) { return d.tran_date; })));
        y.domain([0, d3.max(parsedDates.map(function(d) { return d.total_in; }))]);
        x2.domain(x.domain());
        y2.domain(y.domain());

        focus.append("path")
        .datum(parsedDates)
        .attr("class", "areaFundsRaised")
        .attr("data-legend", function () { return "Funds Raised";})
        .attr("d", areaFundsRaised);

	  /*For later use: appending text
	    focus.selectAll("g")
            .data(parsedDates)
	    .enter()
	    .append("text")
	    .attr("x", function(d) {console.log("adding text");return  x(d.tran_date);})
	    .attr("y", function(d){return y(d.total_in);})
	    .text(function (d, i) {return "hi";})
	    .attr("font-family", "sans-serif")
	    .attr("font-size", "10px")
	    .attr("fill", "red")
	    .attr("class", "myText");*/

     focus.append("path")
     .datum(parsedDates)
     .attr("class", "areaFundsSpent")
     .attr("data-legend", function () { return "Funds Spent";})
     .attr("d", areaFundsSpent);

     focus.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height + ")")
     .call(xAxis);

     focus.append("g")
     .attr("class", "y axis")
     .call(yAxis);

     context.append("path")
     .datum(parsedDates)
     .attr("class", "areaFundsRaised")
     .attr("d", areaFundsRaisedMini);

     context.append("path")
     .datum(parsedDates)
     .attr("class", "areaFundsSpent")
     .attr("d", areaFundsSpentMini);

     context.append("g")
     .attr("class", "x axis")
     .attr("transform", "translate(0," + height2 + ")")
     .call(xAxis2);

     context.append("g")
     .attr("class", "x brush")
     .call(brush)
     .selectAll("rect")
     .attr("y", -6)
     .attr("height", height2 + 7);

     focus.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (-80) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Funds Raised and Spent ($)");

            focus.append("text")
            .attr("text-anchor", "left")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (0) +","+(height+40)+")")  // text is drawn off the screen top left, move down and out and rotate
            .text("Tip: Drag your mouse cursor along this mini graph to zoom in and slide.")
            .attr("class","tip-text");

            focus.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(15)+")")  // text is drawn off the screen top left, move down and out and rotate
            .text("Funds Raised and Spent Over Time")
            .attr("class","slider-title");

            var legend = svg.append("g")
            .attr("class","legend")
            .attr("transform","translate(620,50)")
            .style("font-size","16px")
            .call(d3.legend);
            function brushed() {
             x.domain(brush.empty() ? x2.domain() : brush.extent());
             focus.select(".areaFundsRaised").attr("d", areaFundsRaised);
             focus.select(".areaFundsSpent").attr("d", areaFundsSpent);
             focus.select(".x.axis").call(xAxis);
           }

           function type(d) {
             d.tran_date = parseDate2(d.tran_date);
	    return d;		//
	  }
  };
}
};
});
}).call(this);
