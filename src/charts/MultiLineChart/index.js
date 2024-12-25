/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-empty */
/* eslint-disable no-undef */
/* eslint-disable no-redeclare */
// /* eslint-disable no-redeclare */
// /* eslint-disable no-empty */
// /* eslint-disable no-unsafe-optional-chaining */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-undef */
// /* eslint-disable no-unsafe-optional-chaining */
// /* eslint-disable no-empty */
// /* eslint-disable @typescript-eslint/no-unused-vars */
// /* eslint-disable no-redeclare */
// /* eslint-disable no-undef */

// const MultiLineChartData = {
//   data: [
//     {
//       x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       y: [
//         { email: ["100", "130", "101", "134", "90", "230", "210"] },
//         { unionads: ["220", "182", "191", "234", "290", "330", "310"] },
//         { videoads: ["150", "232", "201", "154", "190", "330", "410"] },
//         { direct: ["320", "332", "301", "334", "390", "330", "320"] },
//         { searchengine: ["820", "932", "901", "934", "1290", "1330", "1320"] },
//       ],
//     },
//   ],
// };

// export function DrawMultiLineChart(options, propsData, styles) {

//   const defaultValues = {
//     width: 600,
//     height: 300,
//     margin: { top: 30, right: 20, bottom: 30, left: 50 },
//     container: {
//       opacity: 0,
//       opacits: 1,
//       opacities: 0.9,
//       visibility: "hidden",
//       visibilities: "visible",
//       strokewidth: 3,
//       textAnchor: "start",
//     },
//     chartColor: { backgroundColor: "#fff" },
//     tooltip: {
//       fontSize: "14px",
//       fontFamily: "Arial",
//       visibility: "visible",
//       visibilityOnMouseOut: "hidden",
//       pointerEvents: "none",
//       opacity: 0.9,
//       mouseOutOpacity: 0,
//       zIndex: 100,
//       boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
//       transition:
//         "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
//       padding: "10px",
//       position: "absolute",
//       display: "block",
//       borderStyle: "solid",
//       borderColor: "gray",
//       borderWidth: "1px",
//       view: "bottom",
//       textColor: "white",
//       bgColor: "white",
//       whiteSpace: "nowrap",
//       top: "30%",
//       right: "0",
//       tooltipContainer: {
//         borderWidth: "1px",
//         borderRadius: "4px",
//         fontSize: "14px",
//         fill: "#fff",
//         strokeColor: "#000",
//       },
//     },
//     tooltipline: {
//       strokeWidth: 2,
//       fill: "none",
//       opacity: 1,
//       transition: "opacity 0.5s",
//       stroke: "#999",
//       strokeDasharray: "5, 5",
//     },
//     legend: {
//       cursor: "pointer",
//       fontSize: "14px",
//       fontFamily: "Arial, sans-serif",
//     },

//     circleLegend: {
//       strokeWidth: 2,
//       fill: "#fff",
//     },

//     lineLegend: {
//       strokeWidth: 2,
//     },
//     xAxis: {
//       Title: {
//         view: true,
//         value: "X Axis Label", // Set the X-axis label here
//         fontFamily: "Arial",
//         color: "#333",
//         fontSize: "16px",
//         placement: "start",
//       },
//       AxisLine: {
//         color: "#333",
//       },
//       AxisTick: {
//         color: "black",
//       },
//       tickLabel: {
//         rotation: 0,
//         view: "auto",
//         fontFamily: "Arial",
//         color: "black",
//         fontSize: "16px",
//       },
//     },
//     yAxis: {
//       Title: {
//         view: true,
//         value: "Y Axis Label", // Set the Y-axis label here
//         fontFamily: "Arial",
//         color: "#333",
//         fontSize: "16px",
//         placement: "middle",
//       },
//       AxisLine: {
//         color: "#333",
//       },
//       AxisTick: {
//         color: "black",
//         TickCount: null,
//       },
//       tickLabel: {
//         view: "auto",
//         fontFamily: "Arial",
//         color: "black",
//         fontSize: "16px",
//       },
//     },
//     GridLine: {
//       view: true,
//       color: "#c7d2da",
//       opacity: 0.7,
//     },
//     chartTitle: {
//       view: true,
//       text: "Multi Line Chart ",
//       fontFamily: "Arial",
//       color: "#333",
//       fontSize: "16",
//       marginTop: -30,
//     },
//   };

//   // const categories = MultiLineChartData.data[0].x;

//   // const dataValues = MultiLineChartData.data[0].y.map((measure) => ({
//   //   [Object.keys(measure)[0]]: measure[Object.keys(measure)[0]].map(Number),
//   // }));

//   // const maxValues = d3.max(
//   //   dataValues.map((d) => {
//   //     const valuesArray = Object.values(d)[0];
//   //     if (Array.isArray(valuesArray)) {
//   //       return d3.max(valuesArray) || 0;
//   //     } else {
//   //       return 0;
//   //     }
//   //   })
//   // );

//   // const { width, height } = styles?.chartContainer || defaultValues;
//   // const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//   // d3.select(`#${options.id}`).selectAll("svg").remove();

//   const categories =
//     Array.isArray(options.dimension) &&
//     options.dimension.length > 0
//     // options.dimension.some((item) => item !== undefined)
//       ? options.dimension
//       : Array.isArray(propsData?.data) && propsData?.data?.length > 0
//       ? propsData?.data?.map((item) => item?.x)
//       : MultiLineChartData?.data?.map((item) => item?.x);
//       console.log("categories",categories);
//       console.log("options",options);

//   const dataValues =
//     Array.isArray(options.measures) && options.measures.length > 0
//       ? options.measures.map((item) => Math.ceil(item))
//       : Array.isArray(propsData?.data) && propsData?.data?.length > 0
//       ? propsData?.data?.map((item) => +item?.y)
//       : MultiLineChartData.data[0]?.y;
//   console.log("dataValues", dataValues);

//   const maxValues = d3.max(
//     dataValues.map((d) => {
//       const valuesArray = Object.values(d)[0];
//       if (Array.isArray(valuesArray)) {
//         return d3.max(valuesArray.map(Number)) || 0;
//       } else {
//         return 0;
//       }
//     })
//   );

//   const { width, height } = styles?.chartContainer || defaultValues;
//   const margin = { top: 20, right: 20, bottom: 30, left: 50 };
//   d3.select(`#${options.id}`).selectAll("svg").remove();

//   // Getting the data for the chart
//   const jsonData = propsData;
//   const data =
//     // options.measures?.map((item) => Math.ceil(item)) ||
//     propsData?.data?.map((item) => +item?.y) ||
//     MultiLineChartData?.data?.map((item) => +item?.y);
//   const xdata =
//     // options.dimensions ||
//     propsData?.data?.[0]?.x || MultiLineChartData?.data?.[0]?.x;

//   // Calculate additional margin based on font sizes
//   const fontSizeX =
//     styles?.xAxis?.Title?.fontSize || defaultValues?.xAxis?.Title?.fontSize;
//   const fontSizeY =
//     styles?.yAxis?.Title?.fontSize || defaultValues?.yAxis?.Title?.fontSize;
//   const fontSizeTitle =
//     styles?.chartTitle?.fontSize || defaultValues?.chartTitle?.fontSize;

//   // Check if font sizes have changed
//   const fontSizeXChanged = fontSizeX !== defaultValues?.xAxis?.Title?.fontSize;
//   const fontSizeYChanged = fontSizeY !== defaultValues?.yAxis?.Title?.fontSize;
//   const fontSizeTitleChanged =
//     fontSizeTitle !== defaultValues?.chartTitle?.fontSize;

//   // Calculate additional margin based on font sizes
//   const extraMarginTop =
//     styles?.chartTitle?.view !== false && fontSizeTitleChanged
//       ? parseFloat(fontSizeTitle) * 1.5
//       : 0; // Additional margin for chart title

//   const extraMarginBottom =
//     styles?.axisLabels?.x?.view !== false && fontSizeXChanged
//       ? parseFloat(fontSizeX) * 2.5
//       : 0; // Additional margin for X-axis label

//   const extraMarginLeft =
//     styles?.axisLabels?.y?.view !== false && fontSizeYChanged
//       ? parseFloat(fontSizeY) * 0.5
//       : 0; // Additional margin for Y-axis label

//   // Update margins based on extra margins
//   const adjustedTop = defaultValues.margin.top + extraMarginTop;
//   const adjustedBottom = defaultValues.margin.bottom + extraMarginBottom;
//   const adjustedLeft = defaultValues.margin.left + extraMarginLeft;
//   const svg = d3
//     .select(`#${options.id}`)
//     .append("svg")
//     .attr("overflow", "visible")
//     .attr("width", width + adjustedLeft + defaultValues.margin.right)
//     .attr("height", height + adjustedTop + adjustedBottom)
//     .style(
//       "background-color",
//       styles?.chartColor?.backgroundColor || defaultValues?.chartColor
//     )
//     .append("g")
//     .attr("transform", `translate(${adjustedLeft},${adjustedTop})`);
//   // Adding the grid lines

//   const color = d3.scaleOrdinal().range(d3.schemeCategory10);
//   const xScale = d3
//     .scaleBand()
//     .domain(categories)
//     .range([0, width])
//     .padding(0.5);

//   const yScale = d3
//     .scaleLinear()
//     .domain([0, maxValues])
//     .range([height, 10])
//     .nice();
//   const line = d3
//     .line()
//     .curve(d3.curveStep) // Set the curve interpolation to step
//     .x((d, i) => xScale(categories[i]) + xScale.bandwidth() / 2)
//     .y((d) => yScale(+Object.values(d)[0]));

//   svg
//     .append("g")
//     // .attr("class", "grid")
//     .call(
//       d3
//         .axisLeft(yScale)
//         .tickSize(-width)
//         .tickFormat("")
//         .tickValues(d3.range(100, 1500, 200))
//     )
//     .selectAll("line")
//     .style("stroke", styles?.grid?.line || "#d3d3d3");

//   svg
//     .append("g")
//     .call(d3.axisLeft(yScale).tickValues(d3.range(100, 1500, 100)));

//   const legend = svg
//     .selectAll(".legend")
//     .data(MultiLineChartData.data[0].y)
//     .enter()
//     .append("g")
//     .attr("class", "legend")
//     .attr("transform", (d, i) => `translate(${i * 120},-${margin.top})`)
//     .style("cursor", defaultValues?.legend?.cursor)
//     .style(
//       "font-size",
//       styles?.legends?.fontSize || defaultValues?.legend?.fontSize
//     )
//     .style(
//       "font-family",
//       styles?.legends?.fontFamily || defaultValues?.legend?.fontFamily
//     )
//     .on("click", toggleLegend);
//   //Adding  the legends
//   legend
//     .append("circle")
//     .attr("r", 9)
//     .attr("cx", 9)
//     .attr("cy", 9)
//     .style("stroke", (d) => color(Object.keys(d)[0]))
//     .style("fill", defaultValues?.circleLegend?.fill || styles?.circle?.fill)
//     .style("strokeWidth", defaultValues?.circleLegend?.strokeWidth);

//   legend
//     .append("line")
//     .attr("x1", 0)
//     .attr("y1", 10)
//     .attr("x2", 40)
//     .attr("y2", 10)
//     .style("transform", "translateX(-10px)")
//     .style("stroke", (d) => color(Object.keys(d)[0]))
//     .style("stroke-width", styles?.strokewidth?.line || 3);

//   legend
//     .append("foreignObject")
//     .attr("width", 40)
//     .attr("height", 20)
//     .html(
//       (d) => `
//       <div style="position:relative; width:100%; height:100%;transform: translate(-11px, -1px);">
//           <svg width="40" height="20">
//               <circle cx="20" cy="10" r="9" stroke="${color(
//                 Object.keys(d)[0]
//               )}" fill="#fff" />
//           </svg>
//       </div>
//     `
//     );

//   legend
//     .append("text")
//     .attr("x", 30)
//     .attr("y", 9)
//     .attr("dy", ".35em")
//     .style(
//       "text-anchor",
//       styles?.text?.textAnchor || defaultValues.container.textAnchor
//     )
//     .style(
//       "font-family",
//       styles?.legends?.fontFamily || defaultValues?.legend?.fontFamily
//     )
//     .style(
//       "font-size",
//       styles?.legends?.fontSize || defaultValues?.legend?.fontSize
//     )
//     .text((d) => Object.keys(d)[0]);

//   // Adding the tooltip
//   let tooltip = d3
//     .select(`#${options.id}`)
//     .append("div")
//     .style(
//       "font-size",
//       styles?.tooltip?.fontSize || defaultValues?.tooltip?.fontSize
//     )
//     .style(
//       "font-family",
//       styles?.tooltip?.fontFamily || defaultValues?.tooltip?.fontFamily
//     )
//     .style("position", defaultValues?.tooltip?.position)
//     .style("display", defaultValues?.tooltip?.display)
//     .style("border-style", defaultValues?.tooltip?.borderStyle)
//     .style("white-space", defaultValues?.tooltip?.whiteSpace)
//     .style("z-index", defaultValues?.tooltip?.zIndex)
//     .style(
//       "box-shadow",
//       styles?.tooltip?.boxshadow || defaultValues?.tooltip?.boxShadow
//     )
//     .style("transition", defaultValues?.tooltip?.transition)
//     .style(
//       "padding",
//       styles?.tooltip?.padding || defaultValues?.tooltip?.padding
//     )
//     .style(
//       "border-radius",
//       styles?.tooltip?.borderRadius ||
//         defaultValues?.tooltipContainer?.borderRadius
//     )
//     .style(
//       "border-width",
//       styles?.tooltip?.borderWidth || defaultValues?.tooltip?.borderWidth
//     )
//     .style(
//       "border-color",
//       styles?.tooltip?.borderColor || defaultValues?.tooltip?.borderColor
//     )
//     .style("view", styles?.tooltip?.view || defaultValues?.tooltip?.view)
//     .style("pointer-events", defaultValues?.tooltip?.pointerEvents)
//     .style("visibility", defaultValues?.tooltip?.visibilityOnMouseOut)
//     .style("opacity", defaultValues?.tooltip?.opacity)
//     .style("marginBottom", defaultValues.tooltip.marginBottom)
//     .style("color", (d) => (d ? color(d.name) : null)) // Set tooltip text color based on line color
//     .style(
//       "background-color",
//       styles?.tooltip?.bgColor || defaultValues?.tooltip?.bgColor
//     ); // Set tooltip background color

//   const transformedData = dataValues.map((category) => ({
//     name: Object.keys(category)[0],
//     values: category[Object.keys(category)[0]].map((value, i) => ({
//       x: categories[i],
//       y: value,
//     })),
//   }));

//   svg
//     .append("rect")
//     .attr("width", width)
//     .attr("height", height)
//     .style("fill", "none")
//     .style("pointer-events", "all")
//     .on("mouseover", function () {
//       tooltip
//         .transition()
//         .duration(200)
//         .style("opacity", defaultValues.container.opacities)
//         .style("visibility", defaultValues.container.visibilities);
//     });
//   // Add mousemove event listener to the chart's container

//   // const verticalLine = svg
//   //   .append("line")
//   //   .attr("class", "vertical-line")
//   //   .style("stroke", "black")
//   //   .style("stroke-dasharray", "5,5")
//   //   .style("stroke-width", 1)
//   //   .style("opacity", 0.7)
//   //   .attr("y1", 0)
//   //   .attr("y2", height);

//   const someThreshold = 40;

//   d3.select(`#${options.id}`).on("mousemove", function (event) {
//     const mouseX = d3.pointer ? d3.pointer(event)[0] : d3.mouse(this)[0];
//     const mouseY = d3.pointer ? d3.pointer(event)[1] : d3.mouse(this)[1];

//     // Filter the data based on the x-position (assuming x-axis represents days like 'Mon', 'Tue', etc.)
//     const hoveredDayData = transformedData.map((category) => ({
//       name: category.name,
//       values: category.values.filter((entry) => {
//         const xPosition = xScale(entry.x) + xScale.bandwidth() / 2;
//         const distance = Math.abs(xPosition - mouseX);
//         return distance < someThreshold; // Adjust as needed
//       }),
//     }));

//     // Check if the mouse is close to any data point
//     const isMouseCloseToData = hoveredDayData.some(
//       (category) => category.values.length > 0
//     );

//     // Show/hide tooltip based on proximity to data
//     if (isMouseCloseToData) {
//       const allXValues = Array.from(
//         new Set(
//           hoveredDayData.flatMap((category) =>
//             category.values.map((entry) => entry.x)
//           )
//         )
//       );

//       const tooltipContent = allXValues
//         .map((xValue) => {
//           const xValuesContent = `<strong>${xValue}</strong>`;
//           const categoryContent = hoveredDayData
//             .map((category) => {
//               const entry = category.values.find((entry) => entry.x === xValue);
//               const circleHTML = entry
//                 ? `<span style="display:inline-block; width:10px; height:10px; background-color:${color(
//                     category.name
//                   )}; border-radius:50%; margin-right:5px;"></span>`
//                 : "";
//               return `${circleHTML}${category.name}: ${entry ? entry.y : ""}`;
//             })
//             .join("<br>");
//           return `${xValuesContent}<br>${categoryContent}`;
//         })
//         .join("<br><br>");

//       // Adjust tooltip position if needed
//       const tooltipX = mouseX + margin.left; // Adjust as needed
//       const tooltipY = mouseY + margin.top; // Adjust as needed

//       // Set tooltip content and position
//       tooltip
//         .html(tooltipContent)
//         .style("left", tooltipX + "px")
//         .style("top", tooltipY + "px");

//       // Show the tooltip
//       tooltip.style("visibility", "visible");
//     } else {
//       // Hide the tooltip if not close to any data point
//       tooltip.style("visibility", "hidden");
//     }
//   });

//   // // Add mouseout event listener to the chart's container
//   // d3.select(`#${options.id}`).on("mouseout", function () {
//   //   // Hide the tooltip and vertical line on mouseout
//   //   tooltip.style("visibility", "hidden");
//   //   verticalLine.style("visibility", "hidden");
//   // });

//   const lines = svg
//     .selectAll(".line")
//     .data(dataValues)
//     .enter()
//     .append("g")
//     .attr("class", (d) => `line lines line-${Object.keys(d)[0]}`);

//   // Append lines connecting data points
//   lines
//     .append("path")
//     .datum((d) =>
//       d[Object.keys(d)[0]].map((value, i) => ({
//         category: categories[i],
//         value,
//       }))
//     )
//     .attr("class", "data-line")
//     .attr("fill", "none")
//     .style("stroke", (d) => color(Object.keys(d)[0])) // Use the color scale
//     .attr("stroke-width", 2)
//     .attr(
//       "d",
//       d3
//         .line()
//         .x((d) => xScale(d.category) + xScale.bandwidth() / 2)
//         .y((d) => yScale(+d.value))
//     )
//     .style("opacity", defaultValues.container.opacity)
//     .transition()
//     .duration(0)
//     .delay((d, i) => i * 100)
//     .style("opacity", defaultValues.container.opacits);

//   // Append circles for each data point
//   lines
//     .selectAll(".data-circle")
//     .data((d) =>
//       d[Object.keys(d)[0]].map((value, i) => ({
//         category: categories[i],
//         value,
//       }))
//     )
//     .enter()
//     .append("circle")
//     .attr("class", "data-circle")
//     .attr("cx", (d) => {
//       // Ensure that 'd.category' is a valid value and 'xScale' is defined
//       if (d.category && xScale) {
//         return xScale(d.category) + xScale.bandwidth() / 2;
//       } else {
//         // Handle the case when the x-coordinate cannot be calculated
//         console.error("Invalid x-coordinate:", d);
//         return 0; // or another default value
//       }
//     })
//     .attr("cy", (d) => {
//       // Ensure that 'd.value' is a valid value and 'yScale' is defined
//       if (!isNaN(d.value) && yScale) {
//         return yScale(+d.value);
//       } else {
//         // Handle the case when the y-coordinate cannot be calculated
//         console.error("Invalid y-coordinate:", d);
//         return 0; // or another default value
//       }
//     })
//     .style("fill", (d) => color(Object.keys(d)[0])) // Use the color scale
//     .style("stroke", "#fff")
//     .style("stroke-width", 2)
//     .style("opacity", defaultValues.container.opacity)
//     .transition()
//     .duration(0)
//     .delay((d, i) => i * 100)
//     .style("opacity", defaultValues.container.opacits);

//   svg
//     .selectAll(".line-connector")
//     .data(dataValues)
//     .enter()
//     .append("g")
//     .attr("class", (d) => `line-connector line-connector-${Object.keys(d)[0]}`)
//     .each(function (parentData) {});

//   // Add transitions if needed
//   svg
//     .selectAll(".connector-line")
//     .transition()
//     .duration(1000)
//     .delay((_, i) => i * 100)
//     .style("opacity", defaultValues.container.opacits);
//   function toggleLegend(d) {
//     // const selectedLine = svg.select(`.line-${d.name} path`);
//     const selectedLine = svg.select(`.line-connector-${d.name}`);
//     // const
//     const selectedPoints = svg.selectAll(`.line-${d.name} .data-circle`);

//     if (selectedLine.node()) {
//       const isHidden = selectedLine.style("opacity") === "0";
//       selectedLine
//         .transition()
//         .duration(500)
//         .style("opacity", isHidden ? 1 : 0);
//       selectedPoints
//         .transition()
//         .duration(500)
//         .style("opacity", isHidden ? 1 : 0);

//       const legendCircle = legend.select(`circle[name="${d.name}"]`);
//       const legendLine = legend.select(`line[name="${d.name}"]`);

//       if (legendCircle.node() && legendLine.node()) {
//         legendCircle.style("fill", isHidden ? color(d.name) : "#fff");
//         legendLine.style("stroke", isHidden ? "#fff" : color(d.name));
//       }

//       // Toggle line and data points together
//       const allLineElements = svg.selectAll(
//         `.line-${d.name} path, .line-${d.name} .data-circle`
//       );
//       allLineElements
//         .transition()
//         .duration(500)
//         .style("opacity", isHidden ? 1 : 0);
//     }
//     // Add or remove a highlight circle to indicate the toggle state
//     const highlightCircles = svg.selectAll(".highlight-circle").data([d.name]);

//     highlightCircles
//       .enter()
//       .append("circle")
//       .attr("class", "highlight-circle")
//       .attr("cx", 50) // Adjust the position of the highlight circle
//       .attr("cy", 20) // Adjust the position of the highlight circle
//       .attr("r", 5)
//       .merge(highlightCircles)
//       .attr("fill", color(d.name))
//       .style("opacity", 0)
//       .transition()
//       .duration(500)
//       .style("opacity", isHidden ? 1 : 0);

//     highlightCircles.exit().remove();
//   }
//   const widthMultiplier = Math.min(styles?.chartContainer?.width / width, 1);
//   const heightMultiplier = Math.min(styles?.chartContainer?.height / height, 1);
//   // calculate font size for responsive chart axis font size
//   const yaxistickFontSize =
//     parseFloat(
//       styles?.yAxis?.tickLabel?.fontSize ||
//         defaultValues?.yAxis?.tickLabel?.fontSize
//       // .replace("px", "")
//     ) *
//       heightMultiplier +
//     "px";
//   const xaxisTickFontSize =
//     parseFloat(
//       (
//         styles?.xAxis?.tickLabel?.fontSize ||
//         defaultValues?.xAxis?.tickLabel?.fontSize
//       ).replace("px", "")
//     ) *
//       widthMultiplier +
//     "px";

//   // Your data processing and scales setup
//   const x = d3
//     .scaleLinear()
//     // .domain([0, d3.max(data, (d) => d.x)]) // adjust based on your data
//     .range([0, width]);

//   // Function to make an element draggable
//   function makeDraggable(selection) {
//     const drag = d3
//       .drag()
//       .on("start", dragStarted)
//       .on("drag", dragged)
//       .on("end", dragEnded);

//     selection.call(drag);
//   }

//   // Drag functions
//   function dragStarted() {
//     d3.select(this).raise().classed("active", true);
//   }

//   function dragged(event, d) {
//     d3.select(this).attr("x", event.x).attr("y", event.y);
//   }

//   function dragEnded() {
//     d3.select(this).classed("active", false);
//   }
//   // Add X-axis
//   const xAxis = svg
//     .append("g")
//     .attr("transform", `translate(0,${height})`)
//     .call(d3.axisBottom(xScale));

//   // Add X-axis label
//   if (
//     styles?.axisLabels?.x?.view !== false &&
//     defaultValues?.xAxis?.Title?.view !== false
//   ) {
//   }

//   // Style the tick lines
//   xAxis
//     .selectAll(".tick line")
//     .style(
//       "stroke",
//       styles?.xAxis?.AxisTick?.color || defaultValues?.xAxis?.AxisTick?.color
//     );

//   // Style the tick labels (values)
//   xAxis
//     .selectAll(".tick text")
//     .style("font-size", `${xaxisTickFontSize}`)
//     .style(
//       "fill",
//       styles?.xAxis?.tickLabel?.color || defaultValues?.xAxis?.tickLabel?.color
//     )
//     .style(
//       "font-family",
//       styles?.xAxis?.tickLabel?.fontFamily ||
//         defaultValues?.xAxis?.tickLabel?.fontFamily
//     )
//     .attr("transform", () => {
//       const rotation =
//         styles?.xAxis?.tickLabel?.rotation ||
//         defaultValues?.xAxis?.tickLabel?.rotation;
//       switch (rotation) {
//         case 45:
//           return "rotate(45)";
//         case -45:
//           return "rotate(-45)";
//         default:
//           return "rotate(0)";
//       }
//     })
//     .style("text-anchor", () => {
//       const rotation =
//         styles?.xAxis?.tickLabel?.rotation ||
//         defaultValues?.xAxis?.tickLabel?.rotation;
//       switch (rotation) {
//         case 45:
//           return "start";
//         case -45:
//           return "end";
//         default:
//           return "middle";
//       }
//     })
//     .text((d) => {
//       const maxLabelLength = 5; // Set your maximum label length
//       const text = String(d); // Convert data to a string
//       if (text?.length > maxLabelLength) {
//         return text?.substring(0, maxLabelLength) + "...";
//       }
//       return text;
//     });

//   // Style the axis line
//   xAxis
//     .select(".domain")
//     .style(
//       "stroke",
//       styles?.xAxis?.AxisLine?.color || defaultValues?.xAxis?.AxisLine?.color
//     );

//   // Add Y-axis label
//   function calculateYPosition(placement, containerHeight) {
//     switch (placement) {
//       case "top":
//         return -containerHeight + 80;
//       case "bottom":
//         return containerHeight - 80;
//       default:
//         return -containerHeight / 5;
//     }
//   }
//   if (
//     styles?.yAxis?.Title?.view !== false &&
//     defaultValues?.yAxis?.Title?.view !== false
//   ) {
//   }

//   // Add Chart Title
//   function dragStarted() {
//     d3.select(this).raise().classed("active", true);
//   }
//   function dragged(event, d) {
//     d3.select(this).attr("x", event.x).attr("y", event.y);
//   }
//   function dragEnded() {
//     d3.select(this).classed("active", false);
//   }
//   if (
//     styles?.chartTitle?.view !== false &&
//     defaultValues?.chartTitle?.view !== false
//   ) {
//     const drag = d3
//       .drag()
//       .on("start", dragStarted)
//       .on("drag", dragged)
//       .on("end", dragEnded);
//     svg
//       .append("text")
//       .attr("x", width / 2)
//       .attr("y", defaultValues?.chartTitle?.marginTop)
//       .style("text-anchor", "middle")
//       .style(
//         "fill",
//         styles?.chartTitle?.color || defaultValues?.chartTitle?.color
//       )
//       .style(
//         "font-size",
//         styles?.chartTitle?.fontSize || defaultValues?.chartTitle?.fontSize
//       )
//       .style(
//         "font-family",
//         styles?.chartTitle?.fontFamily || defaultValues?.chartTitle?.fontFamily
//       )
//       .text(styles?.chartTitle?.text || defaultValues?.chartTitle?.text)
//       .call(drag);
//   }
// }

// const options = {
//   id: "multi-line-chart",
// };
// DrawMultiLineChart(options);

const MultiLineChartData = {
  data: [
    {
      x: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      y: [
        { email: ["100", "130", "101", "134", "90", "230", "210"] },
        { unionads: ["220", "182", "191", "234", "290", "330", "310"] },
        { videoads: ["150", "232", "201", "154", "190", "330", "410"] },
        { direct: ["320", "332", "301", "334", "390", "330", "320"] },
        { searchengine: ["820", "932", "901", "934", "1290", "1330", "1320"] },
      ],
    },
  ],
};

export function DrawMultiLineChart(options, propsData, styles) {
  const defaultValues = {
    width: 600,
    height: 300,
    margin: { top: 30, right: 20, bottom: 30, left: 50 },
    container: {
      opacity: 0,
      opacits: 1,
      opacities: 0.9,
      visibility: "hidden",
      visibilities: "visible",
      strokewidth: 3,
      textAnchor: "start",
    },
    chartColor: { backgroundColor: "#fff" },
    tooltip: {
      fontSize: "14px",
      fontFamily: "Arial",
      visibility: "visible",
      visibilityOnMouseOut: "hidden",
      pointerEvents: "none",
      opacity: 0.9,
      mouseOutOpacity: 0,
      zIndex: 100,
      boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
      transition:
        "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
      padding: "10px",
      position: "absolute",
      display: "block",
      borderStyle: "solid",
      borderColor: "gray",
      borderWidth: "1px",
      view: "bottom",
      textColor: "white",
      bgColor: "white",
      whiteSpace: "nowrap",
      top: "30%",
      right: "0",
      tooltipContainer: {
        borderWidth: "1px",
        borderRadius: "4px",
        fontSize: "14px",
        fill: "#fff",
        strokeColor: "#000",
      },
    },
    tooltipline: {
      strokeWidth: 2,
      fill: "none",
      opacity: 1,
      transition: "opacity 0.5s",
      stroke: "#999",
      strokeDasharray: "5, 5",
    },
    legend: {
      cursor: "pointer",
      fontSize: "14px",
      fontFamily: "Arial, sans-serif",
    },

    circleLegend: {
      strokeWidth: 2,
      fill: "#fff",
    },

    lineLegend: {
      strokeWidth: 2,
    },
    xAxis: {
      Title: {
        view: true,
        value: "X Axis Label", // Set the X-axis label here
        fontFamily: "Arial",
        color: "#333",
        fontSize: "16px",
        placement: "start",
      },
      AxisLine: {
        color: "#333",
      },
      AxisTick: {
        color: "black",
      },
      tickLabel: {
        rotation: 0,
        view: "auto",
        fontFamily: "Arial",
        color: "black",
        fontSize: "16px",
      },
    },
    yAxis: {
      Title: {
        view: true,
        value: "Y Axis Label", // Set the Y-axis label here
        fontFamily: "Arial",
        color: "#333",
        fontSize: "16px",
        placement: "middle",
      },
      AxisLine: {
        color: "#333",
      },
      AxisTick: {
        color: "black",
        TickCount: null,
      },
      tickLabel: {
        view: "auto",
        fontFamily: "Arial",
        color: "black",
        fontSize: "16px",
      },
    },
    GridLine: {
      view: true,
      color: "#c7d2da",
      opacity: 0.7,
    },
    chartTitle: {
      view: true,
      text: "Multi Line Chart ",
      fontFamily: "Arial",
      color: "#333",
      fontSize: "16",
      marginTop: -30,
    },
  };

  const categories = MultiLineChartData.data[0].x;

  const dataValues = MultiLineChartData.data[0].y.map((measure) => ({
    [Object.keys(measure)[0]]: measure[Object.keys(measure)[0]].map(Number),
  }));

  const maxValues = d3.max(
    dataValues.map((d) => {
      const valuesArray = Object.values(d)[0];
      if (Array.isArray(valuesArray)) {
        return d3.max(valuesArray) || 0;
      } else {
        return 0;
      }
    })
  );

  const width = styles?.chartContainer?.width?.value || defaultValues?.width;
  const height = styles?.chartContainer?.height?.value || defaultValues?.height;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  d3.select(`#${options.id}`).selectAll("svg").remove();

  // Calculate additional margin based on font sizes
  const fontSizeX =
    styles?.xAxis?.Title?.fontSize.value ||
    defaultValues?.xAxis?.Title?.fontSize;
  const fontSizeY =
    styles?.yAxis?.Title?.fontSize.value ||
    defaultValues?.yAxis?.Title?.fontSize;
  const fontSizeTitle =
    styles?.chartTitle?.fontSize.value || defaultValues?.chartTitle?.fontSize;

  // Check if font sizes have changed
  const fontSizeXChanged = fontSizeX !== defaultValues?.xAxis?.Title?.fontSize;
  const fontSizeYChanged = fontSizeY !== defaultValues?.yAxis?.Title?.fontSize;
  const fontSizeTitleChanged =
    fontSizeTitle !== defaultValues?.chartTitle?.fontSize;

  // Calculate additional margin based on font sizes
  const extraMarginTop =
    styles?.chartTitle?.view?.value !== false && fontSizeTitleChanged
      ? parseFloat(fontSizeTitle) * 1.5
      : 0; // Additional margin for chart title

  const extraMarginBottom =
    styles?.axisLabels?.x?.view?.value !== false && fontSizeXChanged
      ? parseFloat(fontSizeX) * 2.5
      : 0; // Additional margin for X-axis label

  const extraMarginLeft =
    styles?.axisLabels?.y?.view !== false && fontSizeYChanged
      ? parseFloat(fontSizeY) * 0.5
      : 0; // Additional margin for Y-axis label

  // Update margins based on extra margins
  const adjustedTop = defaultValues.margin.top + extraMarginTop;
  const adjustedBottom = defaultValues.margin.bottom + extraMarginBottom;
  const adjustedLeft = defaultValues.margin.left + extraMarginLeft;
  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("overflow", "visible")
    .attr("width", width + adjustedLeft + defaultValues.margin.right)
    .attr("height", height + adjustedTop + adjustedBottom)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor?.value || defaultValues?.chartColor
    )
    .append("g")
    .attr("transform", `translate(${adjustedLeft},${adjustedTop})`);
  // Adding the grid lines

  const color = d3.scaleOrdinal().range(d3.schemeCategory10);
  const colorScale = d3
    .scaleOrdinal()
    .domain(categories)
    .range(["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd"]);
  const xScale = d3
    .scaleBand()
    .domain(categories)
    .range([0, width])
    .padding(0.5);

  const yScale = d3
    .scaleLinear()
    .domain([0, maxValues])
    .range([height, 10])
    .nice();
  const line = d3
    .line()
    .curve(d3.curveStep) // Set the curve interpolation to step
    .x((d, i) => xScale(categories[i]) + xScale.bandwidth() / 2)
    .y((d) => yScale(+Object.values(d)[0]));

  svg
    .append("g")
    // .attr("class", "grid")
    .call(
      d3
        .axisLeft(yScale)
        .tickSize(-width)
        .tickFormat("")
        .tickValues(d3.range(100, 1500, 200))
    )
    .selectAll("line")
    .style("stroke", styles?.grid?.line || "#d3d3d3");

  svg
    .append("g")
    .call(d3.axisLeft(yScale).tickValues(d3.range(100, 1500, 100)));

  const legend = svg
    .selectAll(".legend")
    .data(MultiLineChartData.data[0].y)
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", (d, i) => `translate(${i * 120},-${margin.top})`)
    .style("cursor", defaultValues?.legend?.cursor)
    .style(
      "font-size",
      styles?.legends?.fontSize?.value || defaultValues?.legend?.fontSize
    )
    .style(
      "font-family",
      styles?.legends?.fontFamily?.value || defaultValues?.legend?.fontFamily
    )
    .on("click", toggleLegend);
  //Adding  the legends
  legend
    .append("circle")
    .attr("r", 9)
    .attr("cx", 9)
    .attr("cy", 9)
    .style("stroke", (d) => color(Object.keys(d)[0]))
    .style("fill", defaultValues?.circleLegend?.fill || styles?.circle?.fill)
    .style("strokeWidth", defaultValues?.circleLegend?.strokeWidth);

  legend
    .append("line")
    .attr("x1", 0)
    .attr("y1", 10)
    .attr("x2", 40)
    .attr("y2", 10)
    .style("transform", "translateX(-10px)")
    .style("stroke", (d) => color(Object.keys(d)[0]))
    .style("stroke-width", styles?.strokewidth?.line || 3);

  legend
    .append("foreignObject")
    .attr("width", 40)
    .attr("height", 20)
    .html(
      (d) => `
      <div style="position:relative; width:100%; height:100%;transform: translate(-11px, -1px);">
          <svg width="40" height="20">
              <circle cx="20" cy="10" r="9" stroke="${color(
                Object.keys(d)[0]
              )}" fill="#fff" />
          </svg>
      </div>
    `
    );

  legend
    .append("text")
    .attr("x", 30)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style(
      "text-anchor",
      styles?.text?.textAnchor?.value || defaultValues.container.textAnchor
    )
    .style(
      "font-family",
      styles?.legends?.fontFamily?.value || defaultValues?.legend?.fontFamily
    )
    .style(
      "font-size",
      styles?.legends?.fontSize?.value || defaultValues?.legend?.fontSize
    )
    .text((d) => Object.keys(d)[0]);

  // Adding the tooltip
  let tooltip = d3
    .select(`#${options.id}`)
    .append("div")
    .style(
      "font-size",
      styles?.tooltip?.fontSize?.value || defaultValues?.tooltip?.fontSize
    )
    .style(
      "font-family",
      styles?.tooltip?.fontFamily?.value || defaultValues?.tooltip?.fontFamily
    )
    .style("position", defaultValues?.tooltip?.position)
    .style("display", defaultValues?.tooltip?.display)
    .style("border-style", defaultValues?.tooltip?.borderStyle)
    .style("white-space", defaultValues?.tooltip?.whiteSpace)
    .style("z-index", defaultValues?.tooltip?.zIndex)
    .style(
      "box-shadow",
      styles?.tooltip?.boxshadow?.value || defaultValues?.tooltip?.boxShadow
    )
    .style("transition", defaultValues?.tooltip?.transition)
    .style(
      "padding",
      styles?.tooltip?.padding?.value || defaultValues?.tooltip?.padding
    )
    .style(
      "border-radius",
      styles?.tooltip?.borderRadius?.value ||
        defaultValues?.tooltipContainer?.borderRadius
    )
    .style(
      "border-width",
      styles?.tooltip?.borderWidth?.value || defaultValues?.tooltip?.borderWidth
    )
    .style(
      "border-color",
      styles?.tooltip?.borderColor?.value || defaultValues?.tooltip?.borderColor
    )
    .style("view", styles?.tooltip?.view?.value || defaultValues?.tooltip?.view)
    .style("pointer-events", defaultValues?.tooltip?.pointerEvents)
    .style("visibility", defaultValues?.tooltip?.visibilityOnMouseOut)
    .style("opacity", defaultValues?.tooltip?.opacity)
    .style("marginBottom", defaultValues.tooltip.marginBottom)
    .style("color", (d) => (d ? color(d.name) : null)) // Set tooltip text color based on line color
    .style(
      "background-color",
      styles?.tooltip?.bgColor?.value || defaultValues?.tooltip?.bgColor
    ); // Set tooltip background color

  const transformedData = dataValues.map((category) => ({
    name: Object.keys(category)[0],
    values: category[Object.keys(category)[0]].map((value, i) => ({
      x: categories[i],
      y: value,
    })),
  }));

  svg
    .append("rect")
    .attr("width", width)
    .attr("height", height)
    .style("fill", "none")
    .style("pointer-events", "all")
    .on("mouseover", function () {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", defaultValues.container.opacities)
        .style("visibility", defaultValues.container.visibilities);
    });
  // Add mousemove event listener to the chart's container

  const verticalLine = svg
    .append("line")
    .attr("class", "vertical-line")
    .style("stroke", "black")
    .style("stroke-dasharray", "5,5")
    .style("stroke-width", 1)
    .style("opacity", 0.7)
    .attr("y1", 0)
    .attr("y2", height);

  const someThreshold = 40;

  d3.select(`#${options.id}`).on("mousemove", function (event) {
    const mouseX = d3.pointer ? d3.pointer(event)[0] : d3.mouse(this)[0];
    const mouseY = d3.pointer ? d3.pointer(event)[1] : d3.mouse(this)[1];

    // Filter the data based on the x-position (assuming x-axis represents days like 'Mon', 'Tue', etc.)
    const hoveredDayData = transformedData.map((category) => ({
      name: category.name,
      values: category.values.filter((entry) => {
        const xPosition = xScale(entry.x) + xScale.bandwidth() / 2;
        const distance = Math.abs(xPosition - mouseX);
        return distance < someThreshold; // Adjust as needed
      }),
    }));

    // Check if the mouse is close to any data point
    const isMouseCloseToData = hoveredDayData.some(
      (category) => category.values.length > 0
    );

    // Show/hide tooltip based on proximity to data
    if (isMouseCloseToData) {
      const allXValues = Array.from(
        new Set(
          hoveredDayData.flatMap((category) =>
            category.values.map((entry) => entry.x)
          )
        )
      );

      const tooltipContent = allXValues
        .map((xValue) => {
          const xValuesContent = `<strong>${xValue}</strong>`;
          const categoryContent = hoveredDayData
            .map((category) => {
              const entry = category.values.find((entry) => entry.x === xValue);
              const circleHTML = entry
                ? `<span style="display:inline-block; width:10px; height:10px; background-color:${color(
                    category.name
                  )}; border-radius:50%; margin-right:5px;"></span>`
                : "";
              return `${circleHTML}${category.name}: ${entry ? entry.y : ""}`;
            })
            .join("<br>");
          return `${xValuesContent}<br>${categoryContent}`;
        })
        .join("<br><br>");

      // Adjust tooltip position if needed
      const tooltipX = mouseX + margin.left;
      const tooltipY = mouseY + margin.right;

      // Set tooltip content and position
      tooltip
        .html(tooltipContent)
        .style("left", tooltipX + "px")
        .style("top", tooltipY + "px");

      // Show the tooltip
      tooltip.style("visibility", "visible");
    } else {
      // Hide the tooltip if not close to any data point
      tooltip.style("visibility", "hidden");
    }
  });

  // Add mouseout event listener to the chart's container
  d3.select(`#${options.id}`).on("mouseout", function () {
    // // Hide the tooltip and vertical line on mouseout
    // tooltip.style("visibility", "hidden");
    // verticalLine.style("visibility", "hidden");
  });

  const lines = svg
    .selectAll(".line")
    .data(dataValues)
    .enter()
    .append("g")
    .attr("class", (d) => `line lines line-${Object.keys(d)[0]}`);

  lines
    .append("path")
    .datum((d) =>
      d[Object.keys(d)[0]].map((value, i) => ({
        category: categories[i],
        value,
      }))
    )
    .attr("class", "data-line")
    .attr("fill", "none")
    .attr("stroke", (d, i) => colorScale(i)) // Use colorScale to get different color for each line based on index
    .attr("stroke-width", 2)
    .attr(
      "d",
      d3
        .line()
        .x((d) => xScale(d.category) + xScale.bandwidth() / 2)
        .y((d) => yScale(+d.value))
    )
    .style("opacity", defaultValues.container.opacity)
    .transition()
    .duration(0)
    .delay((d, i) => i * 100)
    .style("opacity", defaultValues.container.opacits);
  // Append circles for each data point
  lines
    .selectAll(".data-circle")
    .data((d) =>
      d[Object.keys(d)[0]].map((value, i) => ({
        category: categories[i],
        value,
      }))
    )
    .enter()
    .append("circle")
    .attr("class", "data-circle")
    .attr("cx", (d) => xScale(d.category) + xScale.bandwidth() / 2)
    .attr("cy", (d) => yScale(+d.value))
    .attr("r", 5)
    .style("fill", (d, i) => colorScale(i)) // Use colorScale to get different color for each circle based on index
    .style("stroke", "#fff")
    .style("stroke-width", 2)
    .style("opacity", defaultValues.container.opacity)
    .transition()
    .duration(0)
    .delay((d, i) => i * 100)
    .style("opacity", defaultValues.container.opacits);

  svg
    .selectAll(".line-connector")
    .data(dataValues)
    .enter()
    .append("g")
    .attr("class", (d) => `line-connector line-connector-${Object.keys(d)[0]}`)
    .each(function (parentData) {});

  // Add transitions if needed
  svg
    .selectAll(".connector-line")
    .transition()
    .duration(1000)
    .delay((_, i) => i * 100)
    .style("opacity", defaultValues.container.opacits);
  function toggleLegend(d) {
    // const selectedLine = svg.select(`.line-${d.name} path`);
    const selectedLine = svg.select(`.line-connector-${d.name}`);
    // const
    const selectedPoints = svg.selectAll(`.line-${d.name} .data-circle`);

    if (selectedLine.node()) {
      const isHidden = selectedLine.style("opacity") === "0";
      selectedLine
        .transition()
        .duration(500)
        .style("opacity", isHidden ? 1 : 0);
      selectedPoints
        .transition()
        .duration(500)
        .style("opacity", isHidden ? 1 : 0);

      const legendCircle = legend.select(`circle[name="${d.name}"]`);
      const legendLine = legend.select(`line[name="${d.name}"]`);

      if (legendCircle.node() && legendLine.node()) {
        legendCircle.style("fill", isHidden ? color(d.name) : "#fff");
        legendLine.style("stroke", isHidden ? "#fff" : color(d.name));
      }

      // Toggle line and data points together
      const allLineElements = svg.selectAll(
        `.line-${d.name} path, .line-${d.name} .data-circle`
      );
      allLineElements
        .transition()
        .duration(500)
        .style("opacity", isHidden ? 1 : 0);
    }
    // Add or remove a highlight circle to indicate the toggle state
    const highlightCircles = svg.selectAll(".highlight-circle").data([d.name]);

    highlightCircles
      .enter()
      .append("circle")
      .attr("class", "highlight-circle")
      .attr("cx", 50) // Adjust the position of the highlight circle
      .attr("cy", 20) // Adjust the position of the highlight circle
      .attr("r", 5)
      .merge(highlightCircles)
      .attr("fill", color(d.name))
      .style("opacity", 0)
      .transition()
      .duration(500)
      .style("opacity", isHidden ? 1 : 0);

    highlightCircles.exit().remove();
  }
  const widthMultiplier = Math.min(styles?.chartContainer?.width / width, 1);
  const heightMultiplier = Math.min(styles?.chartContainer?.height / height, 1);
  // calculate font size for responsive chart axis font size
  const yaxistickFontSize =
    parseFloat(
      (
        styles?.yAxis?.tickLabel?.fontSize?.value ||
        defaultValues?.yAxis?.tickLabel?.fontSize
      ).replace("px", "")
    ) *
      heightMultiplier +
    "px";
  const xaxisTickFontSize =
    parseFloat(
      (
        styles?.xAxis?.tickLabel?.fontSize?.value ||
        defaultValues?.xAxis?.tickLabel?.fontSize
      ).replace("px", "")
    ) *
      widthMultiplier +
    "px";

  // Your data processing and scales setup
  const x = d3
    .scaleLinear()
    // .domain([0, d3.max(data, (d) => d.x)]) // adjust based on your data
    .range([0, width]);

  // Function to make an element draggable
  function makeDraggable(selection) {
    const drag = d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);

    selection.call(drag);
  }

  // Drag functions
  function dragStarted() {
    d3.select(this).raise().classed("active", true);
  }

  function dragged(event, d) {
    d3.select(this).attr("x", event.x).attr("y", event.y);
  }

  function dragEnded() {
    d3.select(this).classed("active", false);
  }

  // function isNumericData(data) {
  //   return data?.every((value) => !isNaN(value) && typeof value === "number");
  // }

//   function zoomed(event) {
//     console.log("new_xScale.range():", event);

//     const new_xScale = isNumericData(filteredCategory)
//     ? event.transform.rescaleX(xScale)
//     : d3.scaleBand().domain(filteredCategory).range([event.transform.applyX(0), event.transform.applyX(width)]);
//     xScale.domain(new_xScale.domain());
//     const new_yScale = event.transform.rescaleY(yScale);
    
//     xAxis.call(d3.axisBottom(new_xScale));
  
//     svg.selectAll(".data-circle")
//     .attr("cx", d => new_xScale(d.x))
//     .attr("cy", d => new_yScale(d.y));
  
    

//  // Update brush position:
//  const brushSelection = new_xScale.range().map(event.transform.invertX, event.transform);
//  brush.move(d3.select(".brush").transition().duration(50), brushSelection);
//   }

  
  // const zoom = d3.zoom()
  // .scaleExtent([1, Infinity])
  // .translateExtent([[0, 0], [width, height + adjustedBottom]])
  // .extent([[0, 0], [width, height + adjustedBottom]])
  // .on("zoom", zoomed);

  // function brushended(event) {
  //   const selection = event.selection;
 
  //   if (event.sourceEvent && selection) {
  //     const x0 = selection[0];
  //     const x1 = selection[1];
  
  //     // Update the xScale domain based on pixel values
  //     xScale.domain([xScale.invert(x0), xScale.invert(x1)]);
  
  //     // Update the x-axis
  
  //     xAxis.call(d3.axisBottom(xScale));
      
  
  //     // Zoom to the selected range
  //     svg.call(zoom.transform, d3.zoomIdentity.scale(width / (x1 - x0)).translate(-x0, 0));
  //     // brush.move(d3.select(".brush").transition().duration(50), brushSelection);
  //   }
  // }

  // const brush = d3.brushX()
  // .extent([[0, 0], [width, 50]])
  // .on("end", brushended);

  // Add X-axis
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale))
    // .call(brush)
    // .attr("clip-path", "url(#clip)")
    // .call(zoom);


    

  // Add X-axis label
  if (
    styles?.axisLabels?.xAxis?.view?.value !== false &&
    defaultValues?.xAxis?.Title?.view !== false
  ) {
  }

  // Style the tick lines
  xAxis
    .selectAll(".tick line")
    .style(
      "stroke",
      styles?.xAxis?.AxisTick?.color?.value ||
        defaultValues?.xAxis?.AxisTick?.color
    );

  // Style the tick labels (values)
  xAxis
    .selectAll(".tick text")
    .style("font-size", `${xaxisTickFontSize}`)
    .style(
      "fill",
      styles?.xAxis?.tickLabel?.color?.value ||
        defaultValues?.xAxis?.tickLabel?.color
    )
    .style(
      "font-family",
      styles?.xAxis?.tickLabel?.fontFamily?.value ||
        defaultValues?.xAxis?.tickLabel?.fontFamily
    )
    .attr("transform", () => {
      const rotation =
        styles?.xAxis?.tickLabel?.rotation?.value ||
        defaultValues?.xAxis?.tickLabel?.rotation;
      switch (rotation) {
        case 45:
          return "rotate(45)";
        case -45:
          return "rotate(-45)";
        default:
          return "rotate(0)";
      }
    })
    .style("text-anchor", () => {
      const rotation =
        styles?.xAxis?.tickLabel?.rotation?.value ||
        defaultValues?.xAxis?.tickLabel?.rotation;
      switch (rotation) {
        case 45:
          return "start";
        case -45:
          return "end";
        default:
          return "middle";
      }
    })
    .text((d) => {
      const maxLabelLength = 5; // Set your maximum label length
      if (d.length > maxLabelLength) {
        return d.substring(0, maxLabelLength) + "...";
      }
      return d;
    });

  // Style the axis line
  xAxis
    .select(".domain")
    .style(
      "stroke",
      styles?.xAxis?.AxisLine?.color?.value ||
        defaultValues?.xAxis?.AxisLine?.color
    );

  // Add Y-axis label
  function calculateYPosition(placement, containerHeight) {
    switch (placement) {
      case "top":
        return -containerHeight + 80;
      case "bottom":
        return containerHeight - 80;
      default:
        return -containerHeight / 5;
    }
  }
  if (
    styles?.yAxis?.Title?.view?.value !== false &&
    defaultValues?.yAxis?.Title?.view !== false
  ) {
  }

  // Add Chart Title
  function dragStarted() {
    d3.select(this).raise().classed("active", true);
  }
  function dragged(event, d) {
    d3.select(this).attr("x", event.x).attr("y", event.y);
  }
  function dragEnded() {
    d3.select(this).classed("active", false);
  }
  if (
    styles?.chartTitle?.view?.value !== false &&
    defaultValues?.chartTitle?.view !== false
  ) {
    const drag = d3
      .drag()
      .on("start", dragStarted)
      .on("drag", dragged)
      .on("end", dragEnded);
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", defaultValues?.chartTitle?.marginTop)
      .style("text-anchor", "middle")
      .style(
        "fill",
        styles?.chartTitle?.color?.value || defaultValues?.chartTitle?.color
      )
      .style(
        "font-size",
        styles?.chartTitle?.fontSize?.value ||
          defaultValues?.chartTitle?.fontSize
      )
      .style(
        "font-family",
        styles?.chartTitle?.fontFamily?.value ||
          defaultValues?.chartTitle?.fontFamily
      )
      .text(styles?.chartTitle?.text?.value || defaultValues?.chartTitle?.text)
      .call(drag);
  }
}

const options = {
  id: "multi-line-chart",
};
DrawMultiLineChart(options);
