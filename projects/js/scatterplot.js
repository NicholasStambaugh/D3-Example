// Generate fake data
var data = [];
for (var i = 0; i < 50; i++) {
    data.push({
        x: Math.random() * 100,
        y: Math.random() * 100
    });
}

// Set up dimensions and margins for the plot
var margin = {top: 20, right: 20, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

// Create SVG element within the container div
var svg = d3.select("#scatterplot").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

// Create scales for the x and y axes
var x = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.x; })])
    .range([0, width]);

var y = d3.scaleLinear()
    .domain([0, d3.max(data, function(d) { return d.y; })])
    .range([height, 0]);

// Create and add x and y axes to the SVG element
var xAxis = d3.axisBottom(x);
var yAxis = d3.axisLeft(y);

svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

// Create and add circles to the SVG element based on the data
svg.selectAll("circle")
    .data(data)
    .enter().append("circle")
    .attr("r", 5)
    .attr("cx", function(d) { return x(d.x); })
    .attr("cy", function(d) { return y(d.y); })
    .on("mouseover", function(d) {
        // Change color and size of circle on mouseover
        d3.select(this).attr("r", 10).style("fill", "orange");
    })
    .on("mouseout", function(d) {
        // Revert color and size of circle on mouseout
        d3.select(this).attr("r", 5).style("fill", "black");
    });

// Add a line of best fit to the SVG element
var regression = ss.linearRegression(data.map(function(d) { return [d.x, d.y]; }));
var x1 = 0;
var y1 = regression.m * x1 + regression.b;
var x2 = d3.max(data, function(d) { return d.x; });
var y2 = regression.m * x2 + regression.b;
var lineData = [[x1, y1], [x2, y2]];
var line = d3.line()
    .x(function(d) { return x(d[0]); })
    .y(function(d) { return y(d[1]); });

svg.append("path")
    .datum(lineData)
    .attr("class", "line")
    .attr("d", line)
    .style("stroke", "red")
    .style("stroke-width", 2)
    .style("fill", "none");
