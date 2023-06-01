// Read in Data
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  
  //set data keys as variables for ease of access
  let names = data.names
  let metadata = data.metadata
  let samples = data.samples

  //Set index number
  let optNum=0;

  //set variable and map initial Y-Axis labels for bar graph
  let ySource=samples[optNum]?.otu_ids.slice(0,10).reverse();
  
  let mapYaxis=ySource.map(OTU=> `OTU ${OTU}`);
  console.log(mapYaxis);


  //select dropdown menu
  let dropDown=d3.select("#selDataset") 

  //loop to add dropdown menu options
  for (let i=0;i<names.length; i++){
    dropDown.append("option").attr("value",[i]).text(names[i])
  ;}
  
  //select elements for metadata
  let metaId=d3.select("#id")
  let metaEth=d3.select("#ethnicity")
  let metaGen=d3.select("#gender")
  let metaAge=d3.select("#age")
  let metaLoc=d3.select("#location")
  let metaBbt=d3.select("#bbtype")
  let metaWfreq=d3.select("#wfreq")

  //initial conditions for the plots and metadata
  function init() {
    //default values for bar chart at index 0  
    let barData=[{
      x:samples[optNum]?.sample_values.slice(0,10).reverse(),
      y:mapYaxis,
      text: samples[optNum]?.otu_labels.slice(0,10).reverse(),
      name:"Top 10",
      type:"bar",
      orientation: "h"
    }];

    //default layout for bar chart
    let barLayout = {
      title: "Top 10 OTUs",
      height: 1200,
      width: 600
    };
    
    //default values for bubble chart
    let bubData=[{
      x:samples[optNum]?.otu_ids,
      y:samples[optNum]?.sample_values,
      text: samples[optNum]?.otu_labels,
      mode: 'markers',
      marker: {
        color: samples[optNum]?.otu_ids,
        size: samples[optNum]?.sample_values
      }

    }];

    //default layout for bubble chart
    let bubLayout = {
      title: 'OTU IDs',
      showlegend: false,
      height: 600,
      width: 1200
    };

    //default values for metadata at index 0
    metaId.html(`ID: ${metadata[optNum]?.id}`);
    metaEth.html(`Ethnicity: ${metadata[optNum]?.ethnicity}`);
    metaGen.html(`Gender: ${metadata[optNum]?.gender}`);
    metaAge.html(`Age: ${metadata[optNum]?.age}`);
    metaLoc.html(`Location: ${metadata[optNum]?.location}`);
    metaBbt.html(`BBType: ${metadata[optNum]?.bbtype}`);
    metaWfreq.html(`WFreq: ${metadata[optNum]?.wfreq}`);

    //call the plots into existance
    Plotly.newPlot("bar", barData, barLayout);
    Plotly.newPlot("bubble", bubData, bubLayout);
    
  }
  // On change to the DOM, call getData()
  d3.selectAll("#selDataset").on("change", getData);

  // Function called by DOM changes
  function getData() {
    
    // Assign the value of the dropdown menu option to a letiable
      optNum = dropDown.property("value");
      console.log(optNum);
    
    //map updated y-axis labels for bar
    let yUpdate=samples[optNum]?.otu_ids.slice(0,10).reverse();
    let mapYUpdate=yUpdate.map(OTU=> `OTU ${OTU}`)

    //update bar graph values
    let updateBar={
      x:[samples[optNum]?.sample_values.slice(0,10).reverse()],
      y:[mapYUpdate],
      text: [samples[optNum]?.otu_labels.slice(0,10).reverse()],
    };
    
    //update bubble graph values
    let updateBub={
      x:[samples[optNum]?.otu_ids],
      y:[samples[optNum]?.sample_values],
      text: [samples[optNum]?.otu_labels],
      'marker.color': [samples[optNum]?.otu_ids],
      'marker.size': [samples[optNum]?.sample_values]
      };
    
    
    // restyle to update the charts
    Plotly.update("bar", updateBar);
    Plotly.update("bubble", updateBub);
    console.log(updateBar)
    console.log(updateBub)

      //update metadata
      metaId.html(`ID: ${metadata[optNum]?.id}`)
      metaEth.html(`Ethnicity: ${metadata[optNum]?.ethnicity}`)
      metaGen.html(`Gender: ${metadata[optNum]?.gender}`)
      metaAge.html(`Age: ${metadata[optNum]?.age}`)
      metaLoc.html(`Location: ${metadata[optNum]?.location}`)
      metaBbt.html(`BBType: ${metadata[optNum]?.bbtype}`)
      metaWfreq.html(`WFreq: ${metadata[optNum]?.wfreq}`)
  };

  init();
  });
