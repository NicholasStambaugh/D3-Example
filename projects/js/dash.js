// Survey data
const surveyData = [
    { question: "What is your favorite color?", response: "Blue", count: 15 },
    { question: "What is your favorite color?", response: "Red", count: 10 },
    { question: "What is your favorite color?", response: "Green", count: 8 },
    { question: "What is your favorite color?", response: "Yellow", count: 5 },
    { question: "What is your favorite color?", response: "Other", count: 2 },
    { question: "What is your favorite food?", response: "Pizza", count: 12 },
    { question: "What is your favorite food?", response: "Tacos", count: 10 },
    { question: "What is your favorite food?", response: "Sushi", count: 6 },
    { question: "What is your favorite food?", response: "Burgers", count: 5 },
    { question: "What is your favorite food?", response: "Other", count: 4 },
    { question: "What is your favorite movie genre?", response: "Action", count: 18 },
    { question: "What is your favorite movie genre?", response: "Comedy", count: 10 },
    { question: "What is your favorite movie genre?", response: "Drama", count: 6 },
    { question: "What is your favorite movie genre?", response: "Sci-Fi", count: 5 },
    { question: "What is your favorite movie genre?", response: "Other", count: 1 },
    ];
    
    // Filter options
    const filterOptions = [
    { question: "What is your favorite color?", options: ["Blue", "Red", "Green", "Yellow", "Other"] },
    { question: "What is your favorite food?", options: ["Pizza", "Tacos", "Sushi", "Burgers", "Other"] },
    { question: "What is your favorite movie genre?", options: ["Action", "Comedy", "Drama", "Sci-Fi", "Other"] },
    ];
    
    // Create filter select element
    const filterSelect = d3.select(".filter-select");
    filterSelect.append("option").text("Select a question...");
    
    // Add filter options to select element
    filterOptions.forEach((filter) => {
    const optGroup = filterSelect.append("optgroup").attr("label", filter.question);
    filter.options.forEach((option) => {
    optGroup.append("option").text(option);
    });
    });
    
    // Chart dimensions
    const margin = { top: 20, right: 20, bottom: 50, left: 50 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;
    
    // Create SVG element
    const svg = d3.select("#chart")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    
    // Set scales
    const xScale = d3.scaleBand()
    .range([0, width])
    .padding(0.1);
    const yScale = d3.scaleLinear()
    .range([height, 0]);
    
    // Create axes
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale);
    
    // Add axes to SVG
    svg.append("g")
    .attr("class", "x-axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

    svg.append("g")
    .attr("class", "y-axis")
    .call(yAxis);

    // Function to update chart based on selected filter
function updateChart(selectedQuestion, selectedOption) {
    const filteredData = surveyData.filter((d) => d.question === selectedQuestion && d.response === selectedOption);
    
    // Update scales
    xScale.domain(filteredData.map((d) => d.response));
    yScale.domain([0, d3.max(filteredData, (d) => d.count)]);
    
    // Select bars
    const bars = svg.selectAll(".bar")
    .data(filteredData, (d) => d.response);
    
    // Update existing bars
    bars.attr("height", (d) => height - yScale(d.count))
    .attr("y", (d) => yScale(d.count));
    
    // Add new bars
    bars.enter()
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => xScale(d.response))
    .attr("y", (d) => yScale(d.count))
    .attr("width", xScale.bandwidth())
    .attr("height", (d) => height - yScale(d.count));
    
    // Remove old bars
    bars.exit().remove();
    
    // Update axes
    svg.select(".x-axis")
    .call(xAxis)
    .selectAll("text")
    .attr("y", 10)
    .attr("x", -5)
    .attr("dy", ".35em")
    .attr("transform", "rotate(-45)")
    .style("text-anchor", "end");
    
    svg.select(".y-axis")
    .call(yAxis);
    }
    
    // Listen for filter changes
    d3.select(".filter-select").on("change", function() {
    const selectedQuestion = d3.select(this).property("value").split(": ")[0];
    const selectedOption = d3.select(this).property("value").split(": ")[1];
    updateChart(selectedQuestion, selectedOption);
    });
    
 // Initialize chart with first filter option
const initialQuestion = filterOptions[0].question;
const initialOption = filterOptions[0].options[0];
updateChart(initialQuestion, initialOption);

// Update chart on filter change
filterSelect.on("change", function() {
const question = d3.select(this).selectAll(":checked").attr("data-question");
const option = d3.select(this).selectAll(":checked").text();
updateChart(question, option);
});

// Function to update chart based on filter selection
function updateChart(question, option) {
const filteredData = surveyData.filter((d) => d.question === question && d.response === option);
const data = filteredData.map((d) => ({ response: d.response, count: d.count }));

// Update scales with filtered data
xScale.domain(data.map((d) => d.response));
yScale.domain([0, d3.max(data, (d) => d.count)]);

// Select and update bars
const bars = svg.selectAll(".bar")
.data(data);
bars.enter()
.append("rect")
.attr("class", "bar")
.attr("x", (d) => xScale(d.response))
.attr("width", xScale.bandwidth())
.attr("y", height)
.attr("height", 0)
.merge(bars)
.transition()
.duration(1000)
.attr("x", (d) => xScale(d.response))
.attr("width", xScale.bandwidth())
.attr("y", (d) => yScale(d.count))
.attr("height", (d) => height - yScale(d.count));
bars.exit().remove();

// Update axes
svg.select(".x-axis")
.transition()
.duration(1000)
.call(xAxis);
svg.select(".y-axis")
.transition()
.duration(1000)
.call(yAxis);
}
