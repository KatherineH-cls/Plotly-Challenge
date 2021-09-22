//read in data
d3.json("samples.json").then((data) => {
    console.log(data);

    var id = "940";

    var samples = data.samples;
    var names = data.names;
    console.log(names);

    //add list of test subjects to dropdown box
    var options = d3.select("#selDataset");
    names.forEach((name, index) => {
        var row = options.append("option");
        row.property("value", index);
        row.text(name);
    });
      

    // <option value="dataset1">US</option>

    // function to draw the bar chart
    function barChart(id) {
        // Create empty arrays to store the bar chart data
        var bact = [];

        // Iterate through each sample
        samples.forEach((sample) => {

            if (sample.id === id) {
                console.log(sample);
                var labels = sample.otu_labels;
                var values = sample.sample_values;
                var otu_id = sample.otu_ids;

                console.log(otu_id);

                // add to array
                for (i = 0; i < labels.length; i++) {
                    bact.push({ b_label: labels[i], b_value: values[i], b_id: otu_id[i] });
                };
                console.log(bact);
                bactSorted = bact.sort((a, b) => b.b_value - a.b_value).slice(0, 10).reverse();
                console.log(bactSorted);


                // horizontal bar chart
                var trace_bar = {
                    type: 'bar',
                    x: bactSorted.map(bactSorted => bactSorted.b_value),
                    y: bactSorted.map(bactSorted => `OTU ${bactSorted.b_id}`),
                    orientation: 'h',
                    text: bactSorted.map(bactSorted => bactSorted.b_label),
                    marker: { color: 'rgb(142,124,195)' }
                };

                var data = [trace_bar];

                var layout = {
                    title: "Common Bacteria",
                    xaxis: { title: "Frequency" },
                    yaxis: { title: "Bacteria Grouping" }
                };

                Plotly.newPlot("bar", data, layout);

            }

        });
    }

    barChart(id);






});





// Create an array of each country's numbers
// var us = Object.values(data.us);
// var uk = Object.values(data.uk);
// var canada = Object.values(data.canada);

// Create an array of music provider labels
// var labels = Object.keys(data);
// console.log(labels);

// Display the default plot
// function init() {
//   var data = [{
//     values: us,
//     labels: labels,
//     type: "pie"
//   }];

//   var layout = {
//     height: 600,
//     width: 800
//   };

//   Plotly.newPlot("pie", data, layout);
// }

// // On change to the DOM, call getData()
// d3.selectAll("#selDataset").on("change", getData);

// // Function called by DOM changes
// function getData() {
//   var dropdownMenu = d3.select("#selDataset");
//   // Assign the value of the dropdown menu option to a variable
//   var dataset = dropdownMenu.property("value");
//   // Initialize an empty array for the country's data
//   var data = [];

//   if (dataset == 'us') {
//       data = us;
//   }
//   else if (dataset == 'uk') {
//       data = uk;
//   }
//   else if (dataset == 'canada') {
//       data = canada;
//   }
//   // Call function to update the chart
//   updatePlotly(data);
// }

// // Update the restyled plot's values
// function updatePlotly(newdata) {
//   Plotly.restyle("pie", "values", [newdata]);
// }

// init();


