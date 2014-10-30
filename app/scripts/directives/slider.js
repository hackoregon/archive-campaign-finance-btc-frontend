(function () {
  'use strict';
  angular.module('frontendApp').directive('sliderChart', function () {
    return {
      restrict: 'EA',
      scope: {
	fundingExpenditures: '='
      },
      controller: function($scope) {
	console.log("slider");
      },
      link: function (scope, element, attrs) {
	console.log("scope.fundingExpenditures", scope.fundingExpenditures);
	console.log("scope.viewModel", scope.viewModel);
        scope.$watch('fundingExpenditures', function(){
          render();
        });

        
        function render(){
	  console.log("render");
          if (!scope.fundingExpenditures) {
            return;
          }
	  console.log("scope.fundingExpenditures", scope.fundingExpenditures);

	  var inData = scope.fundingExpenditures.data;
	  console.log("inData", inData);

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

	  //  //parse js object
	  console.log("extent", d3.extent(parsedDates.map(function(d) { return d.tran_date; })));
	  x.domain(d3.extent(parsedDates.map(function(d) { return d.tran_date; })));
	  y.domain([0, d3.max(parsedDates.map(function(d) { return d.total_in; }))]);
	  console.log("x",x);
	  console.log("y",y);
	  x2.domain(x.domain());
	  y2.domain(y.domain());

	  focus.append("path")
	    .datum(parsedDates)
	    .attr("class", "areaFundsRaised")
	    .attr("data-legend", function () { return "Funds Raised";})
	    .attr("d", areaFundsRaised);

	  console.log("parsedDates",parsedDates);

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
