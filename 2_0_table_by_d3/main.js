console.log(d3);

d3.csv('roster.csv', d3.autoType)
  .then((classRoster) => {
    console.log("classRoster", classRoster)

    const table = d3.select("#container")
      .append("table");

    const thead = table
      .append("thead");

    const tbody = table.append("tbody");

    const rows = tbody.selectAll("tr.student")
      .data(classRoster)
      .join("tr")
      .attr("class", "student")
      .attr("id", (booger, index, nodes) => {
        console.log("booger", booger)
        console.log("index", index)
        console.log("nodes", nodes)
        return booger.Last
      })

    rows
      .append("td")
      .text(data => data.First)

    rows
      .append("td")
      .text(data => data.Last)
  })