//read in data
d3.json("samples.json").then((data) => {
    console.log(data);

    var samples = data.samples;
    var names = data.names;
    var metadata = data.metadata;

    //add list of test subjects to dropdown box
    var options = d3.select("#selDataset");
    names.forEach((name, index) => {
        var row = options.append("option");
        row.property("value", name);
        row.text(name);
    });

    // function to grab the demographic info
    // console.log(metadata);
    function getDemographics(id) {
        var demographics = [];

        // Iterate through each person to select right demographics
        metadata.forEach((person) => {
            if (person.id.toString() === id) {
                demographics = person;

                console.log(demographics);

                var details = d3.select("#sample-metadata");
                details.selectAll("li").remove();

                Object.entries(demographics).forEach(([key, value]) => {
                    var row = details.append("li").classed("list-group-item", true);
                    row.text(`${key}: ${value}`);
                });
            }
        });
    }

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
                    title: "Most Common Bacteria Found",
                    xaxis: { title: "Frequency" },
                    yaxis: { title: "Bacteria Grouping" }
                };

                var config = { responsive: true }

                Plotly.newPlot("bar", data, layout, config);

            }

        });
    }

    // function to draw the bubble chart
    function bubbleChart(id) {

        // Iterate through each sample
        samples.forEach((sample) => {

            if (sample.id === id) {
                console.log(sample);
                var labels = sample.otu_labels;
                var values = sample.sample_values;
                var otu_id = sample.otu_ids;


                var trace_bubble = {
                    x: otu_id,
                    y: values,
                    text: labels,
                    mode: 'markers',
                    marker: {
                        color: otu_id,
                        colorscale: 'Picnic',
                        size: values,

                    }
                };

                var data = [trace_bubble];

                var layout = {
                    title: 'Bacteria Frequency by OTU Grouping',
                    showlegend: false,
                    xaxis: { title: "OTU ID" },
                    yaxis: { title: "Bacteria Frequency" }
                };

                var config = { responsive: true }


                Plotly.newPlot("bubble", data, layout, config);

            }

        });


    }

    // function to draw the wash gauge
    function washChart(id) {
        // Iterate through each person to select right demographics
        metadata.forEach((person) => {
            if (person.id.toString() === id) {
                wash_freq = person.wfreq;
                console.log(`washing frequency is ${wash_freq}`)

                var data = [
                    {
                        domain: { x: [0, 1], y: [0, 1] },

                        value: wash_freq,
                        title: { text: "Belly Button Washing Frequency <br> Scrubs per Week" },
                        type: "indicator",
                        mode: "gauge+number",
                        gauge: {
                            axis: { range: [0, 9], tick0: 0, dtick: 1 },
                            bar: { color: "purple" },
                            steps: [
                                { range: [0, 1], color: 'lavender' },
                                { range: [1, 2], color: 'thistle' },
                                { range: [2, 3], color: 'plum' },
                                { range: [3, 4], color: 'violet' },
                                { range: [4, 5], color: 'orchid' },
                                { range: [5, 6], color: 'mediumorchid' },
                                { range: [6, 7], color: 'blueviolet' },
                                { range: [7, 8], color: 'slateblue' },
                                { range: [8, 9], color: 'lightsteelblue' }
                            ],

                        }
                    }
                ];

                var layout = {margin: { t: 0, b: 0 } };

                var config = { responsive: true }
                Plotly.newPlot("gauge", data, layout, config);
            }
        });
    }

    // initialise page
    var id = "940";
    getDemographics(id);
    barChart(id);
    bubbleChart(id);
    washChart(id);

    function optionChanged() {
        // Prevent the page from refreshing
        d3.event.preventDefault();
        var dropdownMenu = d3.select("#selDataset");
        var id = dropdownMenu.property("value");
        console.log(`update for ${id}`);
        getDemographics(id);
        barChart(id);
        bubbleChart(id);
        washChart(id);
    }

    // update page on dropdown selection
    d3.select("#selDataset").on("change", optionChanged);

});


