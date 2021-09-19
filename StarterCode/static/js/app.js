//read in data
d3.json("samples.json").then((data) => {
    console.log(data);

    var id = "940";

    // var bar_data = data.samples[0];
    // console.log(bar_data);

    // var id_data.otu_ids = bar_data.otu_ids;
    // var id_data.labels = bar_data.labels;
    // var id_data.values = bar_data.values;

    // console.log(id_data);

    var samples = data.samples;
    // Create empty arrays to store the dish and spice values
    var bact = [];

    // Iterate through each recipe object
    samples.forEach((sample) => {

        if (sample.id === id) {
            console.log(sample);
            var labels = sample.otu_labels;
            var values = sample.sample_values;
            var otu_id = sample.otu_ids;
            
            // console.log(labels);
            for (i = 0; i < labels.length; i++) {
                bact.push({ b_label: labels[i], b_value: values[i], b_id: otu_id[i] });
            };
            console.log(bact);
            bactSorted = bact.sort((a, b) => b.b_value - a.b_value).slice(0,10);
            console.log(bactSorted);


        }


    });
    // // Iterate through each recipe object
    // samples.forEach((sample) => {

    //     // Iterate through each key and value
    //     Object.entries(sample).forEach(([key, value]) => {


    //         // Use the key to determine which array to push the value to
    //         if (sample.id === id) {
    //             var labels = samples.map(sample => sample.otu_ids);
    //             var values = samples.map(sample => sample.sample_values);
    //             console.log(labels);
    //             console.log(values);

    //         }

    //     });
    // });





    // function bar_data(sample) {
    //     var bar_data => 

    // }





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


