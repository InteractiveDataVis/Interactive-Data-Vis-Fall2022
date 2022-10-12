const data = d3.range(10)
  .map((d) => (
    [ Math.floor(Math.random() * 100), Math.floor(Math.random() * 100) ]
  ));
console.log('data', data)

const svg = d3.select("#container")
    .append("svg")
    .attr("width", 500)
    .attr("height", 500)
    .style("overflow", "visible");

svg.selectAll("circle.dot")
    .data(data)
    .join("circle")
    .attr("class", "dot")
    .attr("cx", d => d[0] * 5)
    .attr("cy", ([x, y]) => y * 5)
    .attr("r", 10)
