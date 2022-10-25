 /* CONSTANTS AND GLOBALS */
 const width = window.innerWidth * 0.7,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 60 }

/* LOAD DATA */
d3.csv('../data/populationOverTime.csv', d => {
 // use custom initializer to reformat the data the way we want it
 // ref: https://github.com/d3/d3-fetch#dsv
 return {
   year: new Date(+d.Year, 0, 1),
   country: d.Entity,
   population: +d.Population
 }
}).then(data => {
 console.log('data :>> ', data);

//  const usdata = data.filter(d => d.country === "United States")
//  const chinadata = data.filter(d => d.country === "China")

//  console.log('usdata, chinadata', usdata, chinadata)


 const yScale = d3.scaleLinear()
  .domain(d3.extent(data, d => d.population))
  .range([height - margin.bottom, margin.top])

const xScale = d3.scaleTime()
  .domain(d3.extent(data, d => d.year))
  .range([margin.left, width - margin.right])

const svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

const line = d3.line()
  .x(d => xScale(d.year))
  .y(d => yScale(d.population))

const groupedData = d3.groups(data, d => d.country)
console.log(groupedData)

const path = svg.selectAll("path")
  .data(groupedData)
  .join("path")
  .attr("d", ([country, data]) => line(data))
  .attr("class", ([country, data]) => country)
  .attr("stroke", "black")
  .attr("fill", "none")
});