// Get the SVG text element
const text = d3.select('text');

// Add a panning animation to the text
function animate(selection) {
  selection
    .transition()
    .duration(10000)
    .ease(d3.easeLinear)
    .attrTween('transform', function() {
      const bbox = this.getBBox();
      const startX = bbox.x + bbox.width / 2;
      const endX = -startX;
      return d3.interpolateString(`translate(${startX}, 0)`, `translate(${endX}, 0)`);
    })
    .on('end', function() {
      this.parentNode.appendChild(this);
      d3.select(this).call(animate);
    });
}

function startAnimation() {
  // Start the animation sequence
  text
    .transition()
    .duration(5000)
    .ease(d3.easeLinear)
    .attr('font-size', '60px') // Make the text smaller
    .attrTween('transform', function() {
      const bbox = this.getBBox();
      const startX = bbox.x + bbox.width / 2;
      const endX = -startX;
      return d3.interpolateString(`translate(${startX}, 0)`, `translate(${endX}, 0)`);
    })
    .on('end', function() {
      // Reverse the panning direction
      text
        .transition()
        .duration(5000)
        .ease(d3.easeLinear)
        .attrTween('transform', function() {
          const bbox = this.getBBox();
          const startX = -bbox.x - bbox.width / 2;
          const endX = -startX;
          return d3.interpolateString(`translate(${startX}, 0)`, `translate(${endX}, 0)`);
        })
        .on('end', function() {
          // Repeat the animation sequence
          this.parentNode.appendChild(this);
          text.call(animate);
        });
    });
}

startAnimation();
