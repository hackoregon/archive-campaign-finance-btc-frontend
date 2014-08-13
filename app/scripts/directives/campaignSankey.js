(function () {
  'use strict';
  angular.module('frontendApp').directive('campaignSankey', function (CampaignService) {
    return {
      restrict: 'EA',
      link: function (scope, element, attrs) {
        var margin = {top: 1, right: 1, bottom: 6, left: 1},
          width = 960 - margin.left - margin.right,
          height = 1500 - margin.top - margin.bottom;

        var formatNumber = d3.format(",.0f"),
          format = function (d) {
            return formatNumber(d) + " TWh";
          },
          color = d3.scale.category20();

        var svg = d3.select(element[0]).append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
          .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var sankey = d3.sankey()
          .nodeWidth(15)
          .nodePadding(10)
          .size([width, 500]);

        var path = sankey.link();


        CampaignService.getCampaignFinances().then(function(finances){
          var network = {nodes: [], links: []};

          var campaignNode = {name: ""};
          network.nodes.push(campaignNode);
          var nodeIndex = 0;
          _(finances.contributions).each(function(contribution, type){
            nodeIndex++;
            network.nodes.push({name: type});
            network.links.push({source: nodeIndex, target: 0, value: contribution.amount});
          });
          _(finances.expenditures).each(function(expenditure, type){
            nodeIndex++;
            network.nodes.push({name: type});
            network.links.push({source: 0, target: nodeIndex, value: expenditure});
          });

          sankey
            .nodes(network.nodes)
            .links(network.links)
            .layout(32);

          var link = svg.append("g").selectAll(".link")
            .data(network.links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", path)
            .style("stroke-width", function (d) {
              return Math.max(1, d.dy);
            })
            .sort(function (a, b) {
              return b.dy - a.dy;
            });

          link.append("title")
            .text(function (d) {
              return d.source.name + " → " + d.target.name + "\n" + format(d.value);
            });

          var node = svg.append("g").selectAll(".node")
            .data(network.nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function (d) {
              return "translate(" + d.x + "," + d.y + ")";
            });

          node.append("rect")
            .attr("height", function (d) {
              return d.dy;
            })
            .attr("transform", function(d){
//              if (d.name === "") {
//                return "translate(-150)";
//              } else {
                return null;
//              }
            })
            .attr("class", "node")
            .attr("width", function(d){

                return sankey.nodeWidth();
              //}
            });

          node.append("text")
            .attr("x", -6)
            .attr("y", function (d) {
              return d.dy / 2;
            })
            .attr("dy", ".35em")
            .attr("text-anchor", "end")
            .attr("transform", null)
            .text(function (d) {
              if (d.name) {
                return d.name + ' ($'+ (d.value) + ')';
              }
              return '';
            })
            .filter(function (d) {
              return d.x < width / 2;
            })
            .attr("x", 6 + sankey.nodeWidth())
            .attr("text-anchor", "start");


        });



      }
    };
  });

}).call(this);
