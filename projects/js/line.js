// JavaScript code to reset the page
const resetBtn = document.getElementById("reset-btn");
resetBtn.addEventListener("click", function() {
  location.reload();
});


// Define data and time frame
const data = [
    { year: "2000", value: 10 },
    { year: "2001", value: 25 },
    { year: "2002", value: 14 },
    { year: "2003", value: 30 },
    { year: "2004", value: 25 },
    { year: "2005", value: 50 },
    { year: "2006", value: 40 },
    { year: "2007", value: 55 },
    { year: "2008", value: 60 },
    { year: "2009", value: 75 }
  ];
  
  // Set dimensions for the chart
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = 600 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;
  
  // Create SVG element
  const svg = d3
    .select(".chart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  
  // Set the scales for the X and Y axes
  const x = d3.scaleBand().range([0, width]).padding(0.1);
  const y = d3.scaleLinear().range([height, 0]);
  
  // Define the axes
  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  
  // Define the line
  const line = d3
    .line()
    .x(function(d) {
      return x(d.year);
    })
    .y(function(d) {
      return y(d.value);
    });
  
  // Create the chart
  x.domain(
    data.map(function(d) {
      return d.year;
    })
  );
  y.domain([
    0,
    d3.max(data, function(d) {
      return d.value;
    })
  ]);
  
  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);
  
  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Value");
  
  // Append the line to the chart
  const path = svg
    .append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
  
  // Animate the line
  function animateLine() {
    const totalLength = path.node().getTotalLength();
  
    path
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(2000)
      .ease(d3.easeLinear)
      .attr("stroke-dashoffset", 0);
  }
  
  // Call the animateLine function
  animateLine();

  