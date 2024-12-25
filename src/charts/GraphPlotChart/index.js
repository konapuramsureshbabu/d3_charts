// /* eslint-disable no-undef */
// const nodes = [
//     { name: 'Node 1', x: 300, y: 300 },
//     { name: 'Node 2', x: 800, y: 300 },
//     { name: 'Node 3', x: 550, y: 100 },
//     { name: 'Node 4', x: 550, y: 500 }
//   ];

// export function DrawGraphPlotChart(
//     // PieChartId,
//     options,
//     propsData,
//     styles
//     // pieChartDimensions,
//     // pieChartMeasures
//   ) {

// const defaultValues = {
//     chartContainer: { width: 1050, height: 450 },
//     margin: {
//       top: 40,
//       right: 50,
//       bottom: 60,
//       left: 70,
//     },
//     charts: { opacity: 0.9, visibility: "visible" },
//     line: { fill: "none" },
//     tooltip: {
//       zIndex: "999",
//       transition:
//         "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
//       fontFamily: "Arial",
//       fontSize: "14px",
//       fill: "gray",
//       TextColor: "black",
//       bgColor: "white",
//       shadow: "2px 2px 5px #888888",
//       borderRadius: "5px",
//       borderColor: "#1f77b4",
//       borderColors:"white",
//       borderWidth: "1px",
//       padding: "12px",
//       pointerEvents: "none",
//       visibility: "hidden",
//       opacity: "0",
//       top: "0px",
//       left: "0px",
//       view: "bottom",
//     },
//     legends: { fontFamily: "Arial", fontSize: "14px", placement: "left" },
//     pieLabels: {
//       fontFamily: "Arial",
//       fontSize: "14px",
//       color: "black",
//       rotation: 1,
//     },
//     container: { opacity: 0.8, visibility: "hidden" },
//     rect: {
//       fontFamily: "Arial",
//       rectSize: 18,
//       color: "#A9A9A9",
//       fontSize: "14px",
//     },
//     text: { textAnchor: "middle", rectSpace: 6, color: "#A9A9A9" },
//     chartColor: { backgroundColor: "#fff" },
//     chartTitle: {
//       view: true,
//       value: "Pie Chart",
//       color: "#333",
//       fontSize: "20px",
//       marginTop: 10,
//       fontFamily: "Arial",
//     },
//     color: {
//       schemas: {
//         schema1: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"],
//         schema2: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
//         schema3: ["#c6e48b", "#7bc96f", "#249a3c", "#196127", "#003820"],
//       },
//       colorSchema: "schema1",
//     },
//     chart: {
//       type: "pie",
//     },
//   };
//   const width = 500;
//   const height = 500;
// const svg = d3
//    .select("#chart-container")
//    .append("svg")
//   .attr("width", width)
//   .attr("height", height);



// // const links = [
// //   { source: 0, target: 1 },
// //   { source: 1, target: 0 },
// //   { source: 0, target: 2 },
// //   { source: 1, target: 2 },
// //   { source: 1, target: 3 },
// //   { source: 0, target: 3 },
// // ];

// const curvedLinks = [
//   { source: 0, target: 1 },
//   { source: 1, target: 0 },
// ];

// const straightLinks = [
//   { source: 0, target: 2 },
//   { source: 1, target: 2 },
//   { source: 1, target: 3 },
//   { source: 0, target: 3 },
// ];

// const simulation = d3.forceSimulation(nodes)
//   .force("link", d3.forceLink([...curvedLinks, ...straightLinks]).distance(225))
//   .force("charge", d3.forceManyBody().strength(-500))
//   .force("center", d3.forceCenter(width / 2, height / 2));


//   svg.append("defs").append("marker")
//   .attr("id", "arrowhead")
//   .attr("refX", 6 + 15) // Adjust as needed
//   .attr("refY", 2)
//   .attr("markerWidth", 6)
//   .attr("markerHeight", 4)
//   .attr("orient", "auto")
//   .append("path")
//   .attr("d", "M 0,0 V 4 L6,2 Z")
//   .attr("fill",'lightgrey');


//   const linkTooltip = d3
//   .select("body")
//   .append("div")
//   .style("position", "absolute")
//   .style("display", "block")
//   .style("border-style", "solid")
//   .style("white-space", "nowrap")
//   .style("z-index", defaultValues.tooltip.zIndex)
//   .style("box-shadow", styles?.tooltip.shadow || defaultValues.tooltip.shadow)
//   .style(
//       "transition",
//       styles?.tooltip.transition || defaultValues.tooltip.transition
//   )
//   .style(
//       "background-color",
//       styles?.tooltip.bgColor || defaultValues.tooltip.bgColor
//   )
//   .style(
//       "border-width",
//       styles?.tooltip.borderWidth || defaultValues.tooltip.borderWidth
//   )
//   .style(
//       "border-radius",
//       styles?.tooltip.borderRadius || defaultValues.tooltip.borderRadius
//   )
//   .style(
//       "color",
//       styles?.tooltip.TextColor || defaultValues.tooltip.TextColor
//   )
//   .style("padding", styles?.tooltip.padding || defaultValues.tooltip.padding)
//   .style("top", defaultValues.tooltip.top)
//   .style("left", defaultValues.tooltip.left)
//   .style("view", styles?.tooltip?.view || defaultValues?.tooltip?.view)
//   .style(
//       "border-color",
//       styles?.tooltip.borderColors || defaultValues.tooltip.borderColors
//   )
//   .style("pointer-events", defaultValues.tooltip.pointerEvents)
//   .style("visibility", "hidden")
//   .style("opacity", defaultValues.tooltip.opacity)
//   .style(
//       "font-family",
//       styles?.tooltip?.fontFamily || defaultValues.tooltip.fontFamily
//   )
//   .style(
//       "font-size",
//       styles?.tooltip?.fontSize || defaultValues.tooltip.fontSize
//   )
//   .style("fill", defaultValues.tooltip.fill);

//   const curvedLink = svg
//   .selectAll(".curved-link")
//   .data(curvedLinks)
//   .enter()
//   .append("path")
//   .attr("class", "curved-link")
//   .attr("fill", "none")
//   .attr("stroke", "#ccc")
//   .attr("stroke-width", '2px')
//   .attr("marker-end", "url(#arrowhead)")
//   .on("mouseover", handleLinkMouseover)
//   .on("mouseout", handleLinkMouseout)
//   .attr("d", d => {
//     const sourceNode = nodes[d.source];
//     const targetNode = nodes[d.target];

//     // Check if source and target nodes exist
//     if (sourceNode && targetNode) {
//       const dx = targetNode.x - sourceNode.x;
//       const dy = targetNode.y - sourceNode.y;
//       const dr = Math.sqrt(dx * dx + dy * dy);
//       return `M${sourceNode.x},${sourceNode.y}A${dr},${dr} 0 0,1 ${targetNode.x},${targetNode.y}`;
//     } else {
//       // Handle the case where source or target node is undefined
//       return '';
//     }
//   })
//   .on("mouseover", handleLinkMouseover)
//   .on("mouseout", handleLinkMouseout);

// const straightLink = svg
//   .selectAll(".straight-link")
//   .data(straightLinks)
//   .enter()
//   .append("line")
//   .attr("class", "straight-link")
//   .attr("fill", "none")
//   .attr("stroke", "#ccc")
//   .attr("stroke-width", '2px')
//   .attr("marker-end", "url(#arrowhead)")
//   .on("mouseover", handleLinkMouseover)
//   .on("mouseout", handleLinkMouseout);

// // ... (rest of your code)

// // Add mouseover and mouseout functions
// function handleLinkMouseover(event, d) {
//   linkTooltip
//     .transition()
//     .duration(200)
//     .style("opacity", defaultValues.charts.opacity)
//     .style("visibility", defaultValues.charts.visibility);

//   const relationText = d.source.x < d.target.x
//     ? `${d.source.name} < ${d.target.name}`
//     : `${d.source.name} > ${d.target.name}`;

//   linkTooltip
//     .html(`<div>${relationText}</div>`)
//     .style("left", event.pageX + "px")
//     .style("top", event.pageY - 28 + "px");
// }

// function handleLinkMouseout(event, d) {
//   linkTooltip
//     .transition()
//     .duration(500)
//     .style("opacity", defaultValues.container.opacity)
//     .style("visibility", defaultValues.container.visibility);
// }



//   const tooltip = d3
//   .select("body")
//   .append("div")
//   .style("position", "absolute")
//   .style("display", "block")
//   .style("border-style", "solid")
//   .style("white-space", "nowrap")
//   .style("z-index", defaultValues.tooltip.zIndex)
//   .style("box-shadow", styles?.tooltip.shadow || defaultValues.tooltip.shadow)
//   .style(
//     "transition",
//     styles?.tooltip.transition || defaultValues.tooltip.transition
//   )
//   .style(
//     "background-color",
//     styles?.tooltip.bgColor || defaultValues.tooltip.bgColor
//   )
//   .style(
//     "border-width",
//     styles?.tooltip.borderWidth || defaultValues.tooltip.borderWidth
//   )
//   .style(
//     "border-radius",
//     styles?.tooltip.borderRadius || defaultValues.tooltip.borderRadius
//   )
//   .style(
//     "color",
//     styles?.tooltip.TextColor || defaultValues.tooltip.TextColor
//   )
//   .style("padding", styles?.tooltip.padding || defaultValues.tooltip.padding)
//   .style("top", defaultValues.tooltip.top)
//   .style("left", defaultValues.tooltip.left)
//   .style("view", styles?.tooltip?.view || defaultValues?.tooltip?.view)
//   .style(
//     "border-color",
//     styles?.tooltip.borderColor || defaultValues.tooltip.borderColor
//   )
//   .style("pointer-events", defaultValues.tooltip.pointerEvents)
//   .style("visibility", "hidden")
//   .style("opacity", defaultValues.tooltip.opacity)
//   .style(
//     "font-family",
//     styles?.tooltip?.fontFamily || defaultValues.tooltip.fontFamily
//   )
//   .style(
//     "font-size",
//     styles?.tooltip?.fontSize || defaultValues.tooltip.fontSize
//   )
//   .style("fill", defaultValues.tooltip.fill);

// // ...

// const node = svg
//   .selectAll(".node")
//   .data(nodes)
//   .enter()
//   .append("g")
//   .attr("class", "node")
//   .attr("fill", "#1f77b4")
//   .attr("stroke", "#fff")
//   .on("mouseover", function (event, d) {
//     tooltip
//       .transition()
//       .duration(200)
//       .style("opacity", defaultValues.charts.opacity)
//       .style("visibility", defaultValues.charts.visibility);
//     tooltip
//       .html(
//         `
//        <div><span>
//        ${d.name}</span> : - </div> `
//       )
//       .style("left", event.pageX + "px")
//       .style("top", event.pageY - 28 + "px");
//   })
//   .on("mouseout", function (event, d) {
//     tooltip
//       .transition()
//       .duration(500)
//       .style("opacity", defaultValues.container.opacity)
//       .style("visibility", defaultValues.container.visibility);
//   });

// // Append a circle to each node
// node.append("circle")
//   .attr("r", 30);

// // Append text to each node
// node.append("text")
//   .text(d => d.name)
//   .attr("text-anchor", "middle")
//   .attr("font-size","13px")
//   .attr("font-family",'Arial') // Center the text
//   .attr("dy", 1); // Adjust the vertical position of the text

//   simulation.on("tick", () => {
//     // Update both circle and text positions
//     node
//       .attr("transform", d => `translate(${d.x},${d.y})`);
  
//     // Update straight links
//     straightLink
//       .attr("x1", d => d.source.x)
//       .attr("y1", d => d.source.y)
//       .attr("x2", d => d.target.x)
//       .attr("y2", d => d.target.y);
  
//     // Update curved links
//     curvedLink.attr("d", d => {
//       const sourceNode = nodes[d.source];
//       const targetNode = nodes[d.target];
  
//       // Check if source and target nodes exist
//       if (sourceNode && targetNode) {
//         const dx = targetNode.x - sourceNode.x;
//         const dy = targetNode.y - sourceNode.y;
//         const dr = Math.sqrt(dx * dx + dy * dy);
//         return `M${sourceNode.x},${sourceNode.y}A${dr},${dr} 0 0,1 ${targetNode.x},${targetNode.y}`;
//       } else {
//         // Handle the case where source or target node is undefined
//         return '';
//       }
//     });
//   });
  
// }
// DrawGraphPlotChart("chart-container")

/* eslint-disable no-undef */
const nodes = [
  { name: 'Node 1', x: 300, y: 300 },
  { name: 'Node 2', x: 800, y: 300 },
  { name: 'Node 3', x: 550, y: 100 },
  { name: 'Node 4', x: 550, y: 500 },
  { name: "Node 5", x: 850, y: 300},
  // { name: 'Node 6', x: 600, y: 300}
];

export function DrawGraphPlotChart(
  // PieChartId,
  options,
  propsData,
  styles
  // pieChartDimensions,
  // pieChartMeasures
) {

const defaultValues = {
  chartContainer: { width: 800, height: 600 },
  margin: {
    top: 40,
    right: 50,
    bottom: 60,
    left: 70,
  },
  charts: { opacity: 0.9, visibility: "visible" },
  line: { fill: "#333333" },
  links: { stroke: "#ccc", strokeWidth: "2px"},
  linkText: { fontFamily:"Arial",fontSize:"14px",textAnchor:"middle",fill:"#333333"},
  tooltip: {
    zIndex: "999",
    transition:
      "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
    fontFamily: "Arial",
    fontSize: "14px",
    fill: "gray",
    textColor: "#000000",
    bgColor: "#ffffff",
    shadow: "2px 2px 5px #888888",
    borderRadius: "5px",
    borderColor: "#1f77b4",
    borderColors:"#ffffff",
    borderWidth: "1px",
    padding: "12px",
    pointerEvents: "none",
    visibility: "hidden",
    opacity: "0",
    top: "0px",
    left: "0px",
    view: "bottom",
  },
  container: { opacity: 0.8, visibility: "hidden" },
  chartColor: { backgroundColor: "#ffffff" },
  chartTitle: {
    view: true,
    value: "Graph Plot Chart",
    color: "#333333",
    fontSize: "20px",
    marginTop: 20,
    fontFamily: "Arial",
    fontWeight:"bold"
  },
  color: {
    schemas: {
      schema1: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"],
      schema2: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
      schema3: ["#c6e48b", "#7bc96f", "#249a3c", "#196127", "#003820"],
    },
    colorSchema: "schema1",
  },
  chart: {
    type: "pie",
  },
};
const width = styles?.chartContainer?.width?.value || defaultValues?.chartContainer?.width;
const height = styles?.chartContainer?.height?.value || defaultValues?.chartContainer?.height;
// const {top,right,bottom,left}=defaultValues?.margin;

const svg = d3
 .select("#chart-container")
 .append("svg")
.attr("width", width)
.attr("height", height)
.style("background-color",styles?.chartColor?.backgroundColor?.value || defaultValues?.chartColor?.backgroundColor);

const fontSizeTitle=
    styles?.chartTitle?.fontSize?.value?.value || defaultValues?.chartTitle?.fontSize
    const fontSizeTitleChanged=
    fontSizeTitle !== defaultValues?.chartTitle?.fontSize
    const extraMarginTop=
    styles?.chartTitle?.view?.value!==false && fontSizeTitleChanged
    ? parseFloat(fontSizeTitle) * 1.5
    :0;
    // const adjustedTop = top + extraMarginTop;
    function dragStarted() {
      d3.select(this).raise().classed("active", true);
    }
    function dragged(event) {
      d3.select(this).attr("x", event.x).attr("y", event.y);
    }
    function dragEnded() {
      d3.select(this).classed("active", false);
    }


const links = [
{ source: 0, target: 1 },
// { source: 4, target: 5 },
{ source: 0, target: 2 },
{ source: 1, target: 2 },
{ source: 1, target: 3 },
{ source: 0, target: 3 },
{ source: 1, target: 4 }
];

const simulation = d3.forceSimulation(nodes)
.force("link", d3.forceLink(links).distance(200))
.force("charge", d3.forceManyBody().strength(-520))
.force("center", d3.forceCenter(width/2 , height/2 ));


svg.append("defs").append("marker")
.attr("id", "arrowhead")
.attr("refX", 6 + 15) // Adjust as needed
.attr("refY", 2)
.attr("markerWidth", 6)
.attr("markerHeight", 4)
.attr("orient", "auto")
.append("path")
.attr("d", "M 0,0 V 4 L6,2 Z")
.attr("fill",styles?.line?.fill?.value||defaultValues?.line?.fill);


const linkTooltip = d3
.select("body")
.append("div")
.style("position", "absolute")
.style("display", "block")
.style("border-style", "solid")
.style("white-space", "nowrap")
.style("z-index", defaultValues.tooltip.zIndex)
.style("box-shadow", styles?.tooltip?.shadow?.value || defaultValues?.tooltip?.shadow)
.style(
    "transition",
    styles?.tooltip?.transition?.value || defaultValues?.tooltip?.transition
)
.style(
    "background-color",
    styles?.tooltip?.bgColor?.value || defaultValues?.tooltip?.bgColor
)
.style(
    "border-width",
    styles?.tooltip?.borderWidth?.value || defaultValues?.tooltip?.borderWidth
)
.style(
    "border-radius",
    styles?.tooltip?.borderRadius?.value || defaultValues?.tooltip?.borderRadius
)
.style(
    "color",
    styles?.tooltip?.textColor?.value || defaultValues?.tooltip?.textColor
)
.style("padding", styles?.tooltip?.padding?.value || defaultValues?.tooltip?.padding)
.style("top", defaultValues?.tooltip?.top)
.style("left", defaultValues?.tooltip?.left)
.style("view", styles?.tooltip?.view?.value || defaultValues?.tooltip?.view)
.style(
    "border-color",
    styles?.tooltip?.borderColors?.value || defaultValues?.tooltip?.borderColors
)
.style("pointer-events", defaultValues?.tooltip?.pointerEvents)
.style("visibility", "hidden")
.style("opacity", defaultValues?.tooltip?.opacity)
.style(
    "font-family",
    styles?.tooltip?.fontFamily?.value || defaultValues?.tooltip?.fontFamily
)
.style(
    "font-size",
    styles?.tooltip?.fontSize?.value || defaultValues?.tooltip?.fontSize
)
.style("fill", defaultValues?.tooltip?.fill);

const link = svg
.selectAll(".link")
.data(links)
.enter()
.append("line")
.attr("class", "link")
.attr("fill", "none")
.attr("stroke", styles?.links?.stroke?.value || defaultValues?.links?.stroke)
.attr("stroke-width", styles?.links?.strokeWidth?.value || defaultValues?.links?.strokeWidth)
.attr("marker-end", "url(#arrowhead)")
.on("mouseover", function (event, d) {
    linkTooltip
        .transition()
        .duration(200)
        .style("opacity", defaultValues?.charts?.opacity)
        .style("visibility", defaultValues?.charts?.visibility);
        const relationText = d.source.x < d.target.x ? `${d.source.name} < ${d.target.name}` : `${d.source.name} > ${d.target.name}`;

  linkTooltip
      .html(

          `<div> ${relationText}</div>`
      )
        .style("left", event.pageX + "px")
        .style("top", event.pageY - 28 + "px");
})
.on("mouseout", function (event, d) {
    linkTooltip
        .transition()
        .duration(500)
        .style("opacity", defaultValues.container.opacity)
        .style("visibility", defaultValues.container.visibility);
});

const linkText = svg.selectAll(".link-text")
  .data(links)
  .enter()
  .append("text")
  .attr("class", "link-text")
  .attr("text-anchor", styles?.linkText?.textAnchor?.value || defaultValues?.linkText?.textAnchor)
  .attr("font-size", styles?.linkText?.fontSize?.value || defaultValues?.linkText?.fontSize)
  .attr("font-family", styles?.linkText?.fontFamily?.value || defaultValues?.linkText?.fontFamily)
  .attr("fill", styles?.linkText?.fill?.value || defaultValues?.linkText?.fill)
  .text(d => `${d.source.index} < ${d.target.index}`);
 
const tooltip = d3
.select("body")
.append("div")
.style("position", "absolute")
.style("display", "block")
.style("border-style", "solid")
.style("white-space", "nowrap")
.style("z-index", defaultValues?.tooltip?.zIndex)
.style("box-shadow", styles?.tooltip?.shadow?.value || defaultValues?.tooltip?.shadow)
.style(
  "transition",
  styles?.tooltip?.transition?.value || defaultValues?.tooltip?.transition
)
.style(
  "background-color",
  styles?.tooltip?.bgColor?.value || defaultValues?.tooltip?.bgColor
)
.style(
  "border-width",
  styles?.tooltip?.borderWidth?.value || defaultValues?.tooltip?.borderWidth
)
.style(
  "border-radius",
  styles?.tooltip?.borderRadius?.value || defaultValues?.tooltip?.borderRadius
)
.style(
  "color",
  styles?.tooltip?.textColor?.value || defaultValues?.tooltip?.textColor
)
.style("padding", styles?.tooltip?.padding?.value || defaultValues?.tooltip?.padding)
.style("top", defaultValues?.tooltip?.top)
.style("left", defaultValues?.tooltip?.left)
.style("view", styles?.tooltip?.view?.value || defaultValues?.tooltip?.view)
.style(
  "border-color",
  styles?.tooltip?.borderColor?.value || defaultValues?.tooltip?.borderColor
)
.style("pointer-events", defaultValues?.tooltip?.pointerEvents)
.style("visibility", "hidden")
.style("opacity", defaultValues?.tooltip?.opacity)
.style(
  "font-family",
  styles?.tooltip?.fontFamily?.value || defaultValues?.tooltip?.fontFamily
)
.style(
  "font-size",
  styles?.tooltip?.fontSize?.value || defaultValues?.tooltip?.fontSize
)
.style("fill", defaultValues?.tooltip?.fill);

// ...

const node = svg
.selectAll(".node")
.data(nodes)
.enter()
.append("g")
.attr("class", "node")
.attr("fill", styles?.tooltip?.borderColor?.value || defaultValues?.tooltip?.borderColor)
.attr("stroke", styles?.tooltip?.borderColors?.value || defaultValues?.tooltip?.borderColors)
.on("mouseover", function (event, d) {
  tooltip
    .transition()
    .duration(200)
    .style("opacity", defaultValues?.charts?.opacity)
    .style("visibility", defaultValues?.charts?.visibility);
  tooltip
    .html(
      `
     <div><span>
     ${d.name}</span> : - </div> `
    )
    .style("left", event.pageX + "px")
    .style("top", event.pageY - 28 + "px");
})
.on("mouseout", function (event, d) {
  tooltip
    .transition()
    .duration(500)
    .style("opacity", defaultValues?.container?.opacity)
    .style("visibility", defaultValues?.container?.visibility);
});

// Append a circle to each node
node.append("circle")
.attr("r", 30);

// Append text to each node
node.append("text")
.text(d => d.name)
.attr("text-anchor", styles?.linkText?.textAnchor?.value || defaultValues?.linkText?.textAnchor)
.attr("font-size", styles?.linkText?.fontSize?.value || defaultValues?.linkText?.fontSize)
.attr("font-family", styles?.linkText?.fontFamily?.value || defaultValues?.linkText?.fontFamily) // Center the text
.attr("dy", 1); // Adjust the vertical position of the text

simulation.on("tick", () => {
link
  .attr("x1", d => d.source.x)
  .attr("y1", d => d.source.y)
  .attr("x2", d => d.target.x)
  .attr("y2", d => d.target.y);
  linkText
  .attr("x", d => (d.source.x + d.target.x) / 2)
  .attr("y", d => (d.source.y + d.target.y) / 2);
// Update both circle and text positions
node
  .attr("transform", d => `translate(${d.x},${d.y})`);
});

if (
  styles?.chartTitle?.view?.value !== false && 
  defaultValues?.chartTitle?.view
)
{
svg
.append("text")
.attr("x", width / 2)
.attr("y", defaultValues?.chartTitle?.marginTop)
// .attr("dy", "-14rem")
.attr("text-anchor", "middle")
.style("view", styles?.chartTitle?.view?.value || defaultValues?.chartTitle?.view)
.style(
  "font-size",
  styles?.chartTitle?.fontSize?.value || defaultValues?.chartTitle?.fontSize
)
.style(
  "font-family",
  styles?.chartTitle?.fontFamily?.value || defaultValues?.chartTitle?.fontFamily
)
.style(
  "fill",
  styles?.chartTitle?.color?.value || defaultValues?.chartTitle?.color
)
.style("font-weight",styles?.chartTitle?.fontWeight?.value || defaultValues?.chartTitle?.fontWeight)
.text(styles?.chartTitle?.value?.value || defaultValues?.chartTitle?.value)
.call(
  d3
    .drag()
    .on("start", dragStarted)
    .on("drag", dragged)
    .on("end", dragEnded)
);
}
}
DrawGraphPlotChart("chart-container");
