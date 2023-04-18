var data = [
    {label: 'Apples', value: 30},
    {label: 'Oranges', value: 40},
    {label: 'Bananas', value: 20},
    {label: 'Grapes', value: 10}
];

var width = 400,
    height = 400,
    radius = Math.min(width, height) / 2;

var color = d3.scaleOrdinal()
    .range(['#6930c3', '#5e60ce', '#5390d9', '#4ea8de']);

var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d.value; });

var svg = d3.select('#chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');

var path = svg.selectAll('path')
    .data(pie(data))
    .enter()
    .append('path')
    .attr('d', arc)
    .attr('fill', function(d) { return color(d.data.label); })
    .on('mouseover', function(d) {
        var xPosition = d3.event.pageX;
        var yPosition = d3.event.pageY;
        d3.select('#tooltip')
            .style('left', xPosition + 'px')
            .style('top', yPosition + 'px')
            .select('#value')
            .text(d.data.label + ': ' + d.data.value);
        d3.select('#tooltip').classed('hidden', false);
    })
    .on('mouseout', function() {
        d3.select('#tooltip').classed('hidden', true);
    });

var tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .attr('class', 'tooltip hidden')
    .append('p')
    .attr('id', 'value')
    .text('');
