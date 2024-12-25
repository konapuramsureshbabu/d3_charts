// const defaultData = Array.from({ length: 31 }, (_, i) => ({
//   value: i + 1,
//   day: "Tue",
//   month: "Jan",
// }));

// const userData = [
//   { value: 820, day: "Mon", month: "Jan", icon: "icon1" },
//   { value: 932, day: "Tue", month: "Jan", icon: "icon2" },
//   // ... add more data entries as needed
// ];

// // Map of icons based on user data
// const icons = {
//   icon1: "M10 10 L50 10 L50 50 L10 50 Z",
//   icon2: "M5 25 L25 5 L45 25 L25 45 Z",
//   // ... add more icons as needed
// };

// // Combine default data with user data
// const combinedData = defaultData.map((d) => {
//   const userDataEntry = userData.find(
//     (u) => u.day === d.day && u.month === d.month
//   );
//   return { ...d, ...userDataEntry };
// });
// // Assigning different icons for cells containing multiples of 3
// defaultData.forEach((data, index) => {
//   if ((index + 1) % 3 === 0) {
//     data.icon = index % 2 === 0 ? "icon1" : "icon2";
//   }
// });

// const defaultStyle = {
//   chartContainer: {
//     width: 500,
//     height: 400,
//   },
//   cellSize: 70,
//   cellPadding: 5,
//   yearLabelHeight: 20,
//   axisLabels: {
//     x: {
//       view: false,
//       text: "X Axis Label",
//       fill: "#333",
//       fontSize: "14px",
//       tickLabelOrientation: "rotate(0)",
//       textAnchor: "middle",
//     },
//     y: {
//       view: false,
//       text: "Y Axis Label",
//       fill: "#333",
//       fontSize: "14px",
//       transform: "rotate(-90)",
//       textAnchor: "middle",
//     },
//   },
//   chartTitle: {
//     view: true,
//     text: "Calendar Chart Title",
//     fill: "#333",
//     fontSize: "16px",
//     marginTop: -30,
//   },
//   margin: {
//     top: 50,
//     right: 50,
//     bottom: 60,
//     left: 70,
//   },
//   chartColor: { fill: "steelblue", radius: 10 },
//   tooltip: {
//     fontSize: "12px",
//     visibility: "visible",
//     visibilityOnMouseOut: "hidden",
//     pointerEvents: "none",
//     opacity: 0.9,
//     mouseOutOpacity: 0,
//     zIndex: 100,
//     boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
//     transition:
//       "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
//     padding: "10px",
//     position: "absolute",
//     display: "block",
//     borderStyle: "solid",
//     whiteSpace: "nowrap",
//     tooltipContainer: {
//       borderWidth: "1px",
//       borderRadius: "4px",
//       fontSize: "14px",
//       fill: "#ffffff",
//       strokeColor: "#000",
//     },
//   },
// };

// // Static data
// const layouts = [
//   [[0, 0]],
//   [
//     [-0.25, 0],
//     [0.25, 0],
//   ],
//   [
//     [0, -0.2],
//     [-0.2, 0.2],
//     [0.2, 0.2],
//   ],
//   [
//     [-0.25, -0.25],
//     [-0.25, 0.25],
//     [0.25, -0.25],
//     [0.25, 0.25],
//   ],
// ];

// const pathes = [
//   "M10 10 L50 10 L50 50 L10 50 Z", // Your path data for icon 1
//   "M5 25 L25 5 L45 25 L25 45 Z", // Your path data for icon 2
//   "M0 0 L50 0 L50 50 L0 50 Z", // Your path data for icon 3
//   "M10 10 L20 10 L20 20 L10 20 Z", // Your path data for icon 4
// ];

// // Add a row for day labels
// const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// const colors = ["#c4332b", "#16B644", "#6862FD", "#FDC763"];

// export function DrawCalendarChart(calendarChartId, propsData, styles) {
//   const mergedStyles = styles || defaultStyle;

//   d3.select(`#${calendarChartId}`).selectAll("svg").remove();
//   // Set up SVG container
//   const svg = d3
//     .select(`#${calendarChartId}`)
//     .append("svg")
//     .attr("width", +mergedStyles?.chartContainer?.width)
//     .attr("height", +mergedStyles?.chartContainer?.height);

//   // Set up calendar layout
//   const cellSize = +mergedStyles.cellSize || defaultStyle.cellSize;
//   const yearLabelHeight =
//     +mergedStyles.yearLabelHeight || defaultStyle.yearLabelHeight;

//   // Add day labels on top of each column
//   const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

//   svg
//     .selectAll(".dayLabel")
//     .data(dayLabels)
//     .enter()
//     .append("text")
//     .text((d) => d)
//     .attr("x", (d, i) => (i + 0.5) * cellSize) // Centering the label
//     .attr("y", yearLabelHeight - 10)
//     .attr("text-anchor", "middle")
//     .style("font-weight", "bold");

//   // Create calendar cells
//   const cells = svg
//     .selectAll(".cell")
//     .data(combinedData)
//     .enter()
//     .append("g")
//     .attr("class", "cell")
//     .attr("transform", (d, i) => {
//       const col = i % 7;
//       const row = Math.floor(i / 7);
//       const x = col * cellSize || 0;
//       const y = yearLabelHeight + row * cellSize || 0;
//       return `translate(${x},${y})`;
//     });

//   // Append custom icons to selected cells
//   cells
//     .filter((d) => d.icon)
//     .append("path")
//     .attr("d", (d) => icons[d.icon])
//     .attr("transform", `translate(${cellSize / 2},${cellSize / 2})`)
//     .attr("fill", "white");

//   // Add day labels inside each cell
//   cells
//     .append("text")
//     .attr("x", cellSize / 2)
//     .attr("y", cellSize / 2 + 10) // Adjusted y-coordinate
//     .attr("dy", ".35em")
//     .attr("text-anchor", "middle")
//     .text((d) => d.value);

//   // Adding the tooltip
//   const tooltip = d3
//     .select(`#${calendarChartId}`)
//     .append("div")
//     .attr("class", "tooltip") // Add a class for easy styling
//     .style("position", defaultStyle?.tooltip?.position)
//     .style("display", defaultStyle?.tooltip?.display)
//     .style("border-style", defaultStyle?.tooltip?.borderStyle)
//     .style("white-space", defaultStyle?.tooltip?.whiteSpace)
//     .style("z-index", defaultStyle?.tooltip?.zIndex)
//     .style("box-shadow", defaultStyle?.tooltip?.boxShadow)
//     .style("transition", defaultStyle?.tooltip?.transition)
//     .style(
//       "background-color",
//       styles?.tooltip?.tooltipContainer?.fill ||
//         defaultStyle?.tooltip?.tooltipContainer?.fill
//     )
//     .style("border-width", defaultStyle?.tooltip?.tooltipContainer?.borderWidth)
//     .style(
//       "border-radius",
//       defaultStyle?.tooltip?.tooltipContainer?.borderRadius
//     )
//     .style("padding", defaultStyle?.tooltip?.padding)
//     .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
//     .style("visibility", "hidden") // Initially set to hidden
//     .style("opacity", 0); // Initially set to invisible

//   // Mousemove for updating tooltip position
//   svg.on("mousemove", function (event) {
//     // Update tooltip position based on mousemove
//     tooltip.style("left", event.pageX + "px").style("top", event.pageY + "px");
//   });

//   // Hover effect for cells
//   cells
//     .on("mouseover", function (event, d) {
//       const xPos = parseFloat(
//         d3.select(this).attr("transform").split("(")[1].split(",")[0]
//       );
//       const yPos = parseFloat(
//         d3.select(this).attr("transform").split(",")[1].split(")")[0]
//       );

//       // Calculate the center of the cell
//       const cellCenterX = xPos + cellSize / 2;
//       const cellCenterY = yPos + cellSize / 2;

//       // Show tooltip
//       tooltip
//         .style("left", event.pageX + "px")
//         .style("top", event.pageY + "px")
//         .style("visibility", defaultStyle?.tooltip?.visibility)
//         .style("opacity", defaultStyle?.tooltip?.opacity);

//       // Update tooltip text
//       tooltip.html(
//         `<div>
//        <div  style="font-size: ${
//          styles?.tooltip?.fontSize ||
//          defaultStyle?.tooltip?.tooltipContainer?.fontSize
//        };
//        color: ${
//          styles?.tooltip?.fill ||
//          defaultStyle?.tooltip?.tooltipContainer?.strokeColor
//        }; ">
//          ${d.day} : ${d.value}
//        </div>
//      </div>`
//       );
//     })
//     .on("mouseout", function () {
//       // Hide tooltip on mouseout
//       tooltip.style("opacity", 0);
//     });

//   // Chart Title
//   if (
//     styles?.chartTitle?.view !== false &&
//     defaultStyle?.chartTitle?.view !== false
//   ) {
//     // Add chart title
//     if (mergedStyles?.chartTitle?.view) {
//       svg
//         .append("text")
//         .attr("x", mergedStyles.chartContainer.width / 2)
//         .attr("y", -extraMarginTop / 2)
//         .attr("text-anchor", "middle")
//         .style("font-size", mergedStyles.chartTitle.fontSize)
//         .style("fill", mergedStyles.chartTitle.fill)
//         .text(mergedStyles.chartTitle.text);
//     }
//   }
// }

const defaultStyle = {
  chartContainer: {
    width: 500,
    height: 400,
  },
  cellSize: 70,
  cellPadding: 5,
  yearLabelHeight: 20,
  axisLabels: {
    x: {
      view: false,
      text: "X Axis Label",
      fill: "#333",
      fontSize: "14px",
      tickLabelOrientation: "rotate(0)",
      textAnchor: "middle",
    },
    y: {
      view: false,
      text: "Y Axis Label",
      fill: "#333",
      fontSize: "14px",
      transform: "rotate(-90)",
      textAnchor: "middle",
    },
  },
  chartTitle: {
    view: true,
    text: "Calendar Chart Title",
    fill: "#333",
    fontSize: "18px",
    marginTop: -30,
  },
  margin: {
    top: 50,
    right: 50,
    bottom: 60,
    left: 70,
  },
  chartColor: { fill: "steelblue", radius: 10 },
  tooltip: {
    fontSize: "12px",
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
    whiteSpace: "nowrap",
    tooltipContainer: {
      borderWidth: "1px",
      borderRadius: "4px",
      fontSize: "14px",
      fill: "#ffffff",
      strokeColor: "#000",
    },
  },
};

// Static data
const layouts = [
  [[0, 0]],
  [
    [-0.25, 0],
    [0.25, 0],
  ],
  [
    [0, -0.2],
    [-0.2, 0.2],
    [0.2, 0.2],
  ],
  [
    [-0.25, -0.25],
    [-0.25, 0.25],
    [0.25, -0.25],
    [0.25, 0.25],
  ],
];

const pathes = [
  "M10 10 L50 10 L50 50 L10 50 Z", // Your path data for icon 1
  "M5 25 L25 5 L45 25 L25 45 Z", // Your path data for icon 2
  "M0 0 L50 0 L50 50 L0 50 Z", // Your path data for icon 3
  "M10 10 L20 10 L20 20 L10 20 Z", // Your path data for icon 4
];

const colors = ["#c4332b", "#16B644", "#6862FD", "#FDC763"];

const defaultData = Array.from({ length: 31 }, (_, i) => ({
  value: i + 1,
  day: "Mon",
  month: "Jan",
}));

// Assigning different icons for cells containing multiples of 3
defaultData.forEach((data, index) => {
  if ((index + 1) % 3 === 0) {
    data.icon = index % 2 === 0 ? "icon1" : "icon2";
  }
});

const icons = {
  Mon: "M10 10 L50 10 L50 50 L10 50 Z", // Custom path data for Mon
  Tue: "M5 25 L25 5 L45 25 L25 45 Z", // Custom path data for Tue
  Wed: "M0 0 L50 0 L50 50 L0 50 Z", // Custom path data for Wed
  Thu: "M10 10 L20 10 L20 20 L10 20 Z", // Custom path data for Thu
  Fri: "M20 20 L30 20 L30 30 L20 30 Z", // Custom path data for Fri
  Sat: "M0 30 L20 0 L40 30 Z", // Custom path data for Sat
  Sun: "M10 10 L30 10 L30 30 L10 30 Z", // Custom path data for Sun
  icon1: "M5 0 L10 10 L0 10 Z", // Custom path data for icon1
  icon2: "M0 5 L10 5 L5 15 Z", // Custom path data for icon2
};

export function DrawCalendarChart(calendarChartId, propsData, styles) {
  const mergedStyles = styles || defaultStyle;

  // Extract chart dimensions and margins from styles or use default values
  const { width, height } =
    styles?.chartContainer || defaultStyle.chartContainer;
  const { top, right, bottom, left } = defaultStyle.margin;

  // Calculate font size changes
  const fontSizeTitleChanged =
    +mergedStyles?.chartTitle?.fontSize?.replace("px", "") !==
    +defaultStyle?.chartTitle?.fontSize?.replace("px", "");

  // Calculate additional margin based on font size changes
  const extraMarginTop =
    mergedStyles?.chartTitle?.view !== false && fontSizeTitleChanged
      ? parseFloat(mergedStyles?.chartTitle?.fontSize) * 1.5
      : parseFloat(mergedStyles?.chartTitle?.fontSize);
  const adjustedTop = top + extraMarginTop;
  const cellSize = 50;

  d3.select(`#${calendarChartId}`).selectAll("svg").remove();

  const svg = d3
    .select(`#${calendarChartId}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height + adjustedTop)
    .append("g")
    .attr("transform", `translate(0, ${adjustedTop})`);

  const cell = svg
    .selectAll("g")
    .data(defaultData)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) =>
        `translate(${(i % 7) * cellSize},${Math.floor(i / 7) * cellSize})`
    );

  cell
    .append("rect")
    .attr("width", cellSize - 1)
    .attr("height", cellSize - 1)
    .style("fill", (d) => d3.interpolateViridis(d.value / 31));

  cell
    .filter((d) => d.icon)
    .append("path")
    .attr("d", (d) => icons[d.icon])
    .attr("transform", `translate(${cellSize / 2},${cellSize / 2})`)
    .attr("fill", "white");

  cell
    .append("text")
    .attr("x", cellSize / 2)
    .attr("y", cellSize / 2)
    .attr("dy", ".35em")
    .attr("text-anchor", "middle")
    .text((d) => d.value);

  // Adding the tooltip
  const tooltip = d3
    .select(`#${calendarChartId}`)
    .append("div")
    .attr("class", "tooltip") // Add a class for easy styling
    .style("position", defaultStyle?.tooltip?.position)
    .style("display", defaultStyle?.tooltip?.display)
    .style("border-style", defaultStyle?.tooltip?.borderStyle)
    .style("white-space", defaultStyle?.tooltip?.whiteSpace)
    .style("z-index", defaultStyle?.tooltip?.zIndex)
    .style("box-shadow", defaultStyle?.tooltip?.boxShadow)
    .style("transition", defaultStyle?.tooltip?.transition)
    .style(
      "background-color",
      styles?.tooltip?.tooltipContainer?.fill ||
        defaultStyle?.tooltip?.tooltipContainer?.fill
    )
    .style("border-width", defaultStyle?.tooltip?.tooltipContainer?.borderWidth)
    .style(
      "border-radius",
      defaultStyle?.tooltip?.tooltipContainer?.borderRadius
    )
    .style("padding", defaultStyle?.tooltip?.padding)
    .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
    .style("visibility", "hidden") // Initially set to hidden
    .style("opacity", 0); // Initially set to invisible

  // Mousemove for updating tooltip position
  svg.on("mousemove", function (event) {
    // Update tooltip position based on mousemove
    tooltip.style("left", event.pageX + "px").style("top", event.pageY + "px");
  });

  // Hover effect for cells
  cell
    .on("mouseover", function (event, d) {
      const xPos = parseFloat(
        d3.select(this).attr("transform").split("(")[1].split(",")[0]
      );
      const yPos = parseFloat(
        d3.select(this).attr("transform").split(",")[1].split(")")[0]
      );

      // Calculate the center of the cell
      const cellCenterX = xPos + cellSize / 2;
      const cellCenterY = yPos + cellSize / 2;

      // Show tooltip
      tooltip
        .style("left", event.pageX + "px")
        .style("top", event.pageY + "px")
        .style("visibility", defaultStyle?.tooltip?.visibility)
        .style("opacity", defaultStyle?.tooltip?.opacity);

      // Update tooltip text
      tooltip.html(
        `<div>
       <div  style="font-size: ${
         styles?.tooltip?.fontSize ||
         defaultStyle?.tooltip?.tooltipContainer?.fontSize
       };
       color: ${
         styles?.tooltip?.fill ||
         defaultStyle?.tooltip?.tooltipContainer?.strokeColor
       }; ">
         ${d.day} : ${d.value}
       </div>
     </div>`
      );
    })
    .on("mouseout", function () {
      // Hide tooltip on mouseout
      tooltip.style("opacity", 0);
    });

  if (mergedStyles?.chartTitle?.view) {
    svg
      .append("text")
      .attr("x", +mergedStyles?.chartContainer?.width / 2)
      .attr("y", defaultStyle?.chartTitle?.marginTop)
      .attr("text-anchor", "middle")
      .style("font-size", mergedStyles.chartTitle.fontSize)
      .style("fill", mergedStyles.chartTitle.fill)
      .text(mergedStyles.chartTitle.text);
  }
}
