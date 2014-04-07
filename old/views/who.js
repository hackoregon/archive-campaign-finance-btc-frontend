var HackOre = require('sara')
  , d3 = require('d3')

module.exports = new HackOre.View('Who', {
  prerender: false
, render: function () {
    document.querySelector('#viz-style').href = '/who.css'
    document.querySelector('main').innerHTML = ''
var
    width = 1600,
    height = 1600,
    radius = Math.min(width, height) / 2;

var x = d3.scale.linear()
    .range([0, 2 * Math.PI]);

var y = d3.scale.linear()
    .range([0, radius]);


//Scale to fit graph on page
var scale = .65;

//Translate variable to fit more in the center of the page
var center = 50;

//var color = d3.scale.category20c();
//Color control
//Primary Pallette
var color = d3.scale.ordinal()
                  .domain([0,15000000])
                  //.range([ "#64BCBB", "#49A14C", "#10716F", "#67576A"]);
                  //Alternate color scheme with 8 hour
                  //.range([ "#C89C60", "#64BCBB", " #72AE69", "#10716F", "#67576A",  "#C89C60", "#49A14C", "#C3645E"]);
                  .range([ "#64BCBB", "#49A14C", "#10716F", "#A3D3D2", "#49A14C", "#72AE69", "#B5D0AB", "#D8E4D1", "#67576A"
                    ]);

//Extended Pallette
// var color = d3.scale.ordinal()
//                   .domain([0,15000000])
//                   .range(["#64BCBB", "#A3D3D2", "#DEEEED", "#E8F5F5", "#49A14C", "#72AE69", "#B5D0AB", "#D8E4D1",
//                           "#C89C60", "#DBBF96", "#E6D1B5", "#F0E5D6", "#C3645E", "#CC7E75", "#E1B7AE", "#EDD7D1",
//                           "#67576A", "#98869A", "#B4A7B5", "#D4CCD4",  "#666666", "#828282", "#BFBFBF", "#DA9D9D" 
//                     ]);


var svg = d3.select("main").append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", "translate(" + (width / 2 + center) + "," + (height / 2 + center) + ")");

var partition = d3.layout.partition()
    .value(function(d) { return d.amount; });

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)) * scale; })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)) * scale; });

d3.json("/who.json", function(error, root) {
  var g = svg.selectAll("g")
      .data(partition.nodes(root))
    .enter().append("g");

  var path = g.append("path")
    .attr("d", arc)
    .style("fill", function(d) { return color((d.children ? d : d.parent).name); })
    .on("click", click);

  var text = g.append("text")
    .attr("transform", function(d) { return "rotate(" + computeTextRotation(d) + ")"; })
    .attr("x", function(d) { return y(d.y); })
    .attr("dx", "6") // margin
    .attr("dy", ".35em") // vertical-align
    .style("font-size", "20px")
    .text(function(d) { 
      if (d.amount > 0) return d.name + ": $" + d.amount;
      else return d.name;

    });

  function click(d) {
    // fade out all text elements
    text.transition().attr("opacity", 0);

    path.transition()
      .duration(750)
      .attrTween("d", arcTween(d))
      .each("end", function(e, i) {
          // check if the animated element's data e lies within the visible angle span given in d
          if (e.x >= d.x && e.x < (d.x + d.dx)) {
            // get a selection of the associated text element
            var arcText = d3.select(this.parentNode).select("text");
            // fade in the text element and recalculate positions
            arcText.transition().duration(750)
              .attr("opacity", 1)
              .attr("transform", function() { return "rotate(" + computeTextRotation(e) + ")" })
              .attr("x", function(d) { return y(d.y); });
          }
      });
  }
});

d3.select(self.frameElement).style("height", height + "px");

// Interpolate the scales!
function arcTween(d) {
  var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]),
      yd = d3.interpolate(y.domain(), [d.y, 1]),
      yr = d3.interpolate(y.range(), [d.y ? 20 : 0, radius]);
  return function(d, i) {
    return i
        ? function(t) { return arc(d); }
        : function(t) { x.domain(xd(t)); y.domain(yd(t)).range(yr(t)); return arc(d); };
  };
}

function computeTextRotation(d) {
  var rotationAngle = 0;

  rotationAngle = (x(d.x + d.dx / 2) - Math.PI / 2) / Math.PI * 180;

  if (rotationAngle > 90 ) rotationAngle -180;
  // //Flips the text so that it does not render upside down
  // if ((rotationAngle > 90) && (rotationAngle < 270)) {
  //   rotationAngle = rotation;
  // }

  //  var angle = (d.x + d.dx / 2) * 180 / Math.PI - 90;
  //          //if (angle > 90) { angle = angle - 180; }
           
  //       return "rotate(" + angle + ")translate(" + (d.y  + 10)  + ")rotate(" + (angle > 90 ? -180 : 0) + ")"

  return rotationAngle;
}
  }
})
