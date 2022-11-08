/**
 * CONSTANTS AND GLOBALS
 * */
 const width = window.innerWidth * 0.9,
 height = window.innerHeight * 0.7,
 margin = { top: 20, bottom: 50, left: 60, right: 40 };
/** these variables allow us to initialize anything we manipulate in
* init() but need access to in draw().
* All these variables are empty before we assign something to them.*/
let svg;

/**
* APPLICATION STATE
* */
let state = {
  geojson: null,
  hover: {
    latitude: null,
    longitude: null,
    state: null,
  }
};

/**
* LOAD DATA
* Using a Promise.all([]), we can load more than one dataset at a time
* */
Promise.all([
 d3.json("../data/usState.json")
]).then(([geojson]) => {
 state.geojson = geojson;
 console.log("state: ", state);
 init();
});

/**
* INITIALIZING FUNCTION
* this will be run *one time* when the data finishes loading in
* */
function init() {

  svg = d3.select("#container")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background-color", "aliceblue");

  const projection = d3.geoAlbersUsa().fitSize([width, height], state.geojson);
  // const geoPath = d3.geoPath().projection(projection)
  const geoPath = d3.geoPath(projection);

  const states = svg.selectAll(".state")
    .data(state.geojson.features)
    .join("path")
    // .attr("d", d => geoPath(d))
    .attr("d", geoPath)
    .attr("class", "state")
    .attr("fill", "transparent");

  states
    .on("mouseover", (mouseevent, d) => {
      // console.log(d)
      state.hover.state = d.properties.NAME;
      // console.log(state.hover)
      draw(); // re-call the draw function when we set a new hoveredState
    })

  svg.on("mousemove", (e) => {
    const [mx, my] = d3.pointer(e);
    const [px, py] = projection.invert([mx, my]);
    state.hover.latitude = px;
    state.hover.longitude = py;
    // console.log(state.hover)
    draw(); // re-call the draw function when we set a new hoveredState
  });
 
 draw(); // calls the draw function
}

/**
* DRAW FUNCTION
* we call this every time there is an update to the data/state
* */
function draw() {

  const hoverData = Object.entries(state.hover);

  d3.select("#hover-content")
    .selectAll("div.row")
    .data(hoverData)
    .join("div")
    .attr("class", "row")
    .html(d => 
       // each d is [key, value] pair
       d[1] // check if value exist
        ? `${d[0]}: ${d[1]}` // if they do, fill them in
        : null // otherwise, show nothing
    )
 

}