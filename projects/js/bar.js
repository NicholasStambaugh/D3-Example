const data = [
    { label: "A", value: 10 },
    { label: "B", value: 20 },
    { label: "C", value: 30 },
    { label: "D", value: 40 },
    { label: "E", value: 50 }
];

const svg = d3.select("svg");

const margin = { top: 20, right: 20, bottom: 30, left: 40 };
const width = +svg.attr("width") - margin.left - margin.right;
const height = +svg.attr("height") - margin.top - margin.bottom;

const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
const y = d3.scaleLinear().rangeRound([height, 0]);

const g = svg.append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

x.domain(data.map(d => d.label));
y.domain([0, d3.max(data, d => d.value)]);

g.selectAll(".bar")
    .data(data)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.label))
        .attr("y", d => y(d.value))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.value))
        .on("mouseover", function(d) {
            d3.select(this).attr("fill", "brown");
            svg.append("text")
                .attr("class", "value")
                .attr("x", x(d.label) + x.bandwidth() / 2)
                .attr("y", y(d.value) - 5)
                .attr("text-anchor", "middle")
                .text(d.value);
        })
        .on("mouseout", function(d) {
            d3.select(this).attr("fill", "steelblue");
            svg.select(".value").remove();
        });

g.selectAll(".label")
    .data(data)
    .enter().append("text")
        .attr("class", "label")
        .attr("x", d => x(d.label) + x.bandwidth() / 2)
        .attr("y", d => y(d.value) + 15)
        .attr("text-anchor", "middle")
        .text(d => d.label);