/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 60, left: 60, right: 40 },
  radius = 5;

// these variables allow us to define anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;
let colorScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selectedParty: "All" // + YOUR INITIAL FILTER SELECTION
};

/* LOAD DATA */
d3.json("../data/environmentRatings.json", d3.autoType).then(raw_data => {
  console.log("data", raw_data);
  // save our data to application state
  state.data = raw_data;
  init();
});

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
  xScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.ideologyScore2020))
    .range([margin.left, width - margin.right]);
  
  yScale = d3.scaleLinear()
    .domain(d3.extent(state.data, d => d.envScore2020))
    .range([height-margin.top, margin.bottom]);

  console.log(xScale.domain())

  colorScale = d3.scaleOrdinal()
    .domain(["R", "D"])
    .range(["red", "blue"])

  // + AXES


  // + UI ELEMENT SETUP
  const selectElement = d3.select("#dropdown")

  selectElement  
    .selectAll("option")
    .data([...Array.from(new Set(state.data.map(d => d.Party))), "All"])
    .join("option")
    .attr("value", d => d)
    .text(d => d)

  selectElement
    .on("change", (event) => {
      console.log(event)
      console.log("prev", state)
      state.selectedParty = event.target.value;
      console.log("post", state)

      draw();
    })

  console.log(selectElement)


  // + CREATE SVG ELEMENT
  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "pink")


  // + CALL AXES



  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this every time there is an update to the data/state
function draw() {

  // // + FILTER DATA BASED ON STATE
  const filteredData = state.data
    .filter(d => state.selectedParty === "All" || state.selectedParty === d.Party)

  const dot = svg
    .selectAll("circle")
    .data(filteredData, d => `id_${d.Party}_${d.envScore2020}_${d.ideologyScore2020}`)
    .join(
      // + HANDLE ENTER SELECTION
      enter => enter.append("circle")
        .attr("r", radius)
        .attr("cx", 0)
        .attr("cy", d => yScale(d.envScore2020))
        .attr("fill", d => colorScale(d.Party))
        .call(sel => sel
          .transition()
          .duration(1000)
          .attr("cx", d => xScale(d.ideologyScore2020))
        )
        ,

      // + HANDLE UPDATE SELECTION
      update => {
        update
          .transition()
          .duration(250)
          .attr("r", radius * 3) // increase radius size
          .transition()
          .duration(250)
          .attr("r", radius) // bring it back to original size

        return update
      },

      // + HANDLE EXIT SELECTION
      exit => exit
        .call(sel => sel
          //before
          .attr("opacity", 1)
          .transition()
          .duration(1000)
          // after
          .attr("opacity", 0)
          .remove()
          )
    );
}