/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

let party = "R"

/* LOAD DATA */
d3.json("../data/environmentRatings.json").then(data => {
  console.log('data', data)
  const selection = d3.select("#selection")
  console.log(selection)

  /* SCALES */

  // xScale  - linear,count
  const xScale = d3.scaleLinear()
    .domain([0, 1])
    .range([margin.left, width - margin.right])

  // yScale - linear,count
  const yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([height - margin.bottom, margin.top])

  // colorScale
  const colorScale = d3.scaleOrdinal()
    .domain(["R", "D"])
    .range(["red", "blue"])

  /* HTML ELEMENTS */

  // svg
  const svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "pink")
  
  // x axis

  // y axis

  // circles
  const circles = svg.selectAll(".dot")
    .data(data)
    .join(
      enter => enter
        .append("circle")
        .attr("r", 0)
        .call(sel => sel.transition()
          .duration(1000)
          .delay(d => d.ideologyScore2020 * 2000)
          .attr("r", 10)),
      update => update,
      exit => exit,
    )
    .attr("class", "dot")
    .attr("cx", d => xScale(d.ideologyScore2020))
    .attr("cy", d => yScale(d.envScore2020))
    .attr("fill", d => colorScale(d.Party))

});