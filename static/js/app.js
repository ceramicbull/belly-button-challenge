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
    let barData=[{
      x:samples[optNum]?.sample_values.slice(0,10).reverse(),
      y:mapYaxis,
      text: samples[optNum]?.otu_labels.slice(0,10).reverse(),
      name:"Top 10",
      type:"bar",
      orientation: "h"
    }];

    let barLayout = {
      title: "Top 10 OTUs",
      height: 1200,
      width: 600
    };

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

    let bubLayout = {
      title: 'OTU IDs',
      showlegend: false,
      height: 600,
      width: 1200
    };

    metaId.html(`ID: ${metadata[optNum]?.id}`)
    metaEth.html(`Ethnicity: ${metadata[optNum]?.ethnicity}`)
    metaGen.html(`Gender: ${metadata[optNum]?.gender}`)
    metaAge.html(`Age: ${metadata[optNum]?.age}`)
    metaLoc.html(`Location: ${metadata[optNum]?.location}`)
    metaBbt.html(`BBType: ${metadata[optNum]?.bbtype}`)
    metaWfreq.html(`WFreq: ${metadata[optNum]?.wfreq}`)

    Plotly.newPlot("bar", barData, barLayout)

    Plotly.newPlot("bubble", bubData, bubLayout)
    
  }
  // On change to the DOM, call getData()
  d3.selectAll("#selDataset").on("change", getData);

  // Function called by DOM changes
  function getData() {
    
    // Assign the value of the dropdown menu option to a letiable
      optNum = dropDown.property("value");
      console.log(optNum)
  
    let updateBar={
      x:[samples[optNum]?.sample_values.slice(0,10).reverse()],
      y:[mapYaxis],
      text: [samples[optNum]?.otu_labels.slice(0,10).reverse()],
    };

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

  

  //setup for loop to rearrange data:
  // let names = data.names
  
  // let outputData=[]

//   console.log(data.samples[0]?.sample_values[0])
//   //external loop through the array of subjects
//   for (let i=0;i<names.length; i++){
//     _name=names[i];
//     _ids=data.samples[i];
//     //list to hold all the samples of a given subject
//     let idData=[];
//     //internal loop through each subject's samples
//     for (let j=0;j<_ids.length; j++){
//       // _id=data.samples[i]?.otu_ids[j];
//       // _value=data.samples[i]?.sample_values[j];
//       // _label=data.samples[i]?.otu_labels[j];
//       // give each sample a dictionary with otu_id, value, and label
//       let sampleDict={
//         ID:data.samples[i]?.otu_ids[j],
//         Value:data.samples[i]?.sample_values[j],
//         Label:data.samples[i]?.otu_labels[j]
//       }
//       // push the sample dict into the list for the subject
//       idData.push(sampleDict);
//       };
//     // establish a dictonary for the subject's name and their list of samples  
//     let nameDict={
//       Name:_name,
//       Data:idData
//     }
//     // push the subject's dictionary into the output info
//     outputData.push(nameDict);}

// // console log the output info 
//     console.log(outputData)});



// // Select data for Bar Chart
// //X-Axis:
// let sampleData=data.samples[0]?.sample_values;

// //Y-Axis:
// let sampleLabels=data.samples[0]?.otu_ids;

// //HoverText:
// let sampleText=data.samples[0]?.otu_labels;

// //Slice and reverse Data
// xData=sampleData.slice(0,10).reverse();
// yData=sampleLabels.slice(0,10).reverse();
// hText=sampleText.slice(0,10).reverse();

// let default = {
//   x: reversedData.map(object => object.xData),
//   y: reversedData.map(object => object.yData),
//   text: reversedData.map(object => object.hText),
//   name: "OTU",
//   type: "bar",
//   orientation: "h"};

// function init() {
//   let data = [{
//     values: default,
//     labels: labels,
//     type: "bar"
//   }];
  
//   let layout = {
//     height: 600,
//     width: 800
//   };
//   Plotly.newPlot("pie", data, layout);
// }