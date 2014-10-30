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

	  var margin = {top: 10, right: 10, bottom: 100, left: 40},
	  margin2 = {top: 430, right: 10, bottom: 20, left: 40},
	  width = 960 - margin.left - margin.right,
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
	  var area = d3.svg.area()
	    .interpolate("monotone")
	    .x(function(d) { return x(d.date); })
	    .y0(height)
	    .y1(function(d) { return y(d.price); });

	  var area2 = d3.svg.area()
	    .interpolate("monotone")
	    .x(function(d) { return x2(d.date); })
	    .y0(height2)
	    .y1(function(d) { return y2(d.price); });

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

	  /* TEST API ENDPOINT*/

	 //  console.log("d3.y max inData ", d3.max(inData.map(function(d) { return d.total_in; })));
	 //  console.log("before",inData);
	 //  var parsedDates = inData.map(function(d) { return type(d); })
	 //  console.log("after", parsedDates);
	 //  // console.log("d3.extent inData ",d3.extent(parsedDates.map(function(d) { return d.tran_date; })));

	 //  //parse js object
	 //  x.domain(d3.extent(parsedDates.map(function(d) { return d.tran_date; })));

	 //  console.log("x",x);
	 //  console.log("y",y);
	 //  x2.domain(x.domain());
	 //  y2.domain(y.domain());

	 //  focus.append("path")
	 //    .datum(parsedDates)
	 //    .attr("class", "area")
	 //    .attr("d", area);

	 //  focus.append("g")
	 //    .attr("class", "x axis")
	 //    .attr("transform", "translate(0," + height + ")")
	 //    .call(xAxis);

	 //  focus.append("g")
	 //    .attr("class", "y axis")
	 //    .call(yAxis);

	 //  context.append("path")
	 //    .datum(parsedDates)
	 //    .attr("class", "area")
	 //    .attr("d", area2);

	 //  context.append("g")
	 //    .attr("class", "x axis")
	 //    .attr("transform", "translate(0," + height2 + ")")
	 //    .call(xAxis2);

	 //  context.append("g")
	 //    .attr("class", "x brush")
	 //    .call(brush)
	 //    .selectAll("rect")
	 //    .attr("y", -6)
	 //    .attr("height", height2 + 7);


	 //  function brushed() {
	 //    console.log("extent", brush.extent());
	 //    x.domain(brush.empty() ? x2.domain() : brush.extent());
	 //    focus.select(".area").attr("d", area);
	 //    /* focus.select(".area1").attr("d", area1); */
	 //    focus.select(".x.axis").call(xAxis);
	 //  }

	 // function type(d) {
	 //   d.tran_date = parseDate(d.tran_date);
	 //   return d;		// 
	 //  }


	  /** OLD VERSION**/	  

	  // console.log("d3.extent inDate ",d3.extent(inData.map(function(d) { return d.tran_date; })));
	  // console.log("d3.y max inData ", d3.max(inData.map(function(d) { return d.total_in; })));
	  // console.log("before",inData);
	  // var newArr= inData.map(function(d) { return type(d); })
	  // console.log("after",newArr);
	  
	  d3.csv("sp500.csv", type, function(error, data) {

	    x.domain(d3.extent(data.map(function(d) { return d.date; })));
	    console.log("d3.extent",d3.extent(data.map(function(d) { return d.date; })));
	    
	    console.log("x.domain",x.domain);
	    y.domain([0, d3.max(data.map(function(d) { return d.price; }))]);
	    x2.domain(x.domain());
	    y2.domain(y.domain());

	    console.log("data from csv", data);
	    focus.append("path")
	      .datum(data)
	      .attr("class", "area")
	      .attr("d", area);

	    focus.append("g")
	      .attr("class", "x axis")
	      .attr("transform", "translate(0," + height + ")")
	      .call(xAxis);

	    focus.append("g")
	      .attr("class", "y axis")
	      .call(yAxis);

	    context.append("path")
	      .datum(data)
	      .attr("class", "area")
	      .attr("d", area2);

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
	  });

	  function brushed() {
	    console.log("extent", brush.extent());
	    x.domain(brush.empty() ? x2.domain() : brush.extent());
	    focus.select(".area").attr("d", area);
	    /* focus.select(".area1").attr("d", area1); */
	    focus.select(".x.axis").call(xAxis);
	  }

	  
	  function type(d) {
	    d.date = parseDate(d.date);
	    d.price = +d.price;
	    return d;
	  }
        };
      }
    };
  });
}).call(this);
