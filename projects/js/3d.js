 // Define the dimensions of the canvas
 const width = 600;
 const height = 600;

 // Create the SVG element
 const svg = d3.select('body')
   .append('svg')
   .attr('width', width)
   .attr('height', height)
   .attr('fill', '#fff');

 // Define the data for the graphic
 const data = [
    { x: -0.5, y: 0.5, z: 0 },
    { x: 111, y: 0.5, z: -0.3 },
    { x: -50, y: -0.5, z: 0 },
    { x: 0.5, y: -200, z: 0 },
    { x: 4, y: 0.5, z: 0 },
    { x: 250, y: -0.5, z: 0 },
    { x: 0.5, y: 55, z: 0 },
    { x: -0.5, y: 0, z: 0 },
    { x: 6, y: 0, z: 0.5 },
    { x: 70, y: 25, z: -0.5 },
    { x: 0.5, y: 0.5, z: 0 },
    { x: -0.5, y: 40, z: 0 },
    { x: 100, y: -0.5, z: 0 },
    { x: -0.5, y: -0.5, z: 0 },
    { x: 0.3, y: 0.3, z: 0.3 },
    { x: -0.3, y: -0.3, z: -0.3 },
  ];
  
  
 // Define the projection for the graphic
 const projection = d3.geoOrthographic().scale(250)
   .translate([width / 2, height / 2])
   .clipAngle(90)
   .precision(0.1);

// Define a path generator
const path = d3.geoPath().projection(projection);

// Load the GeoJSON data
d3.json('https://raw.githubusercontent.com/d3/d3-composite-projections/master/test/data/world-50m.json').then(function(world) {
  // Add the countries to the map
  svg
    .append('g')
    .attr('class', 'countries')
    .selectAll('path')
    .data(topojson.feature(world, world.objects.countries).features)
    .enter()
    .append('path')
    .attr('d', path);
});

 // Create the mesh for the graphic
 const mesh = svg
   .append('path')
   .datum(d3.geoGraticule10())
   .attr('d', path)
   .attr('fill', 'none')
   .attr('stroke', '#ccc');

 // Create the dots for the graphic
 const dots = svg
 .selectAll('.dot')
 .data(data)
 .enter()
 .append('circle')
 .attr('class', 'dot')
 .attr('cx', function(d) { return projection([d.x, d.y])[0]; })
 .attr('cy', function(d) { return projection([d.x, d.y])[1]; })
 .attr('cz', function(d) { return projection([d.z, d.y])[1]; }) // add a 'cz' attribute
 .attr('r', 5)
 .attr('fill', '#0000FF');


 // Define the rotation function
 function rotate() {
   projection.rotate([Date.now() / 1000 * 20, -30]);
   dots.attr('cx', function(d) { return projection([d.x, d.y])[0]; })
     .attr('cy', function(d) { return projection([d.x, d.y])[1]; });
   mesh.attr('d', path);
   requestAnimationFrame(rotate);
 }

 // Start the rotation
 requestAnimationFrame(rotate);