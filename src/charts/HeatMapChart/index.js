/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

const defaultData = {
    days :[
      'Saturday', 'Friday', 'Thursday',
      'Wednesday', 'Tuesday', 'Monday', 'Sunday'
    ],
    hours : [
        '12a', '1a', '2a', '3a', '4a', '5a', '6a',
        '7a', '8a', '9a', '10a', '11a',
        '12p', '1p', '2p', '3p', '4p', '5p',
        '6p', '7p', '8p', '9p', '10p', '11p'
      ],
      heatdata :[[0, 0, 5], [0, 1, 1], [0, 2, 0], [0, 3, 0], [0, 4, 0], 
      [0, 5, 0], [0, 6, 0], [0, 7, 0], [0, 8, 0], [0, 9, 0], [0, 10, 0], [0, 11, 2], [0, 12, 4], 
      [0, 13, 1], [0, 14, 1], [0, 15, 3], [0, 16, 4], [0, 17, 6], [0, 18, 4], [0, 19, 4], [0, 20, 3], 
      [0, 21, 3], [0, 22, 2], [0, 23, 5], [1, 0, 7], [1, 1, 0], [1, 2, 0], [1, 3, 0], [1, 4, 0],
      [1, 5, 0], [1, 6, 0], [1, 7, 0], [1, 8, 0], [1, 9, 0], [1, 10, 5], [1, 11, 2], [1, 12, 2],
      [1, 13, 6], [1, 14, 9], [1, 15, 11], [1, 16, 6], [1, 17, 7], [1, 18, 8], [1, 19, 12], 
      [1, 20, 5], [1, 21, 5], [1, 22, 7], [1, 23, 2], [2, 0, 1], [2, 1, 1], [2, 2, 0], [2, 3, 0],
      [2, 4, 0], [2, 5, 0], [2, 6, 0], [2, 7, 0], [2, 8, 0], [2, 9, 0], [2, 10, 3], [2, 11, 2], 
      [2, 12, 1], [2, 13, 9], [2, 14, 8], [2, 15, 10], [2, 16, 6], [2, 17, 5], [2, 18, 5], [2, 19, 5], 
      [2, 20, 7], [2, 21, 4], [2, 22, 2], [2, 23, 4], [3, 0, 7], [3, 1, 3], [3, 2, 0], [3, 3, 0], 
      [3, 4, 0], [3, 5, 0], [3, 6, 0], [3, 7, 0], [3, 8, 1], [3, 9, 0], [3, 10, 5], [3, 11, 4], 
      [3, 12, 7], [3, 13, 14], [3, 14, 13], [3, 15, 12], [3, 16, 9], [3, 17, 5], [3, 18, 5], 
      [3, 19, 10], [3, 20, 6], [3, 21, 4], [3, 22, 4], [3, 23, 1], [4, 0, 1], [4, 1, 3], [4, 2, 0], 
      [4, 3, 0], [4, 4, 0], [4, 5, 1], [4, 6, 0], [4, 7, 0], [4, 8, 0], [4, 9, 2], [4, 10, 4], 
      [4, 11, 4], [4, 12, 2], [4, 13, 4], [4, 14, 4], [4, 15, 14], [4, 16, 12], [4, 17, 1], 
      [4, 18, 8], [4, 19, 5], [4, 20, 3], [4, 21, 7], [4, 22, 3], [4, 23, 0], [5, 0, 2], [5, 1, 1], 
      [5, 2, 0], [5, 3, 3], [5, 4, 0], [5, 5, 0], [5, 6, 0], [5, 7, 0], [5, 8, 2], [5, 9, 0], [5, 10, 4], [5, 11, 1], [5, 12, 5], [5, 13, 10], [5, 14, 5], [5, 15, 7], [5, 16, 11], [5, 17, 6], [5, 18, 0], [5, 19, 5], [5, 20, 3], [5, 21, 4], [5, 22, 2], [5, 23, 0], [6, 0, 1], [6, 1, 0], [6, 2, 0], [6, 3, 0], [6, 4, 0], [6, 5, 0], [6, 6, 0], [6, 7, 0], [6, 8, 0], [6, 9, 0], [6, 10, 1], [6, 11, 0], [6, 12, 2], [6, 13, 1], [6, 14, 3], [6, 15, 4], [6, 16, 0], [6, 17, 0], [6, 18, 0], [6, 19, 0], [6, 20, 1], [6, 21, 2], [6, 22, 2], [6, 23, 6]]     
 };
// default style for the chart
const defaultStyle = {
  chartContainer: { width: 500, height: 400 },
  margin: { top: 50, right: 50, bottom: 60, left: 90 },
  tooltip: {
    zIndex: "999",
    boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
    transition:
      "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
    backgroundColor: "rgb(255, 255, 255)",
    borderWidth: "1px",
    borderRadius: "4px",
    color: "rgb(102, 102, 102)",
    font: "14px",
    padding: "10px",
    top: "0px",
    left: "0px",
    borderColor: "rgb(255, 255, 255)",
    pointerEvents: "none",
    visibility: "hidden",
    opacity: "0",
    tooltipContainer: { margin: "2px" },
    tooltiplabel: {
      fontSize: "18px",
      Color: "rgb(102, 102, 102)",
      fontWeight: "400",
    },
  },
  axisLabels: {
    x: {
      view: true,
      text: "X Axis Label",
      fill: "#333",
      fontSize: "14px",
      tickLabelOrientation: "rotate(0)",
      textAnchor: "middle",
    },
    y: {
      view: true,
      text: "Y Axis Label",
      fill: "#333",
      fontSize: "14px",
      transform: "rotate(-90)",
      textAnchor: "middle",
    },
  },
  chartTitle: {
    view: true,
    text: "Heat Map Chart Title",
    fill: "#333",
    fontSize: "16px",
    marginTop: -30,
  },
};
// heatmap data
const data = defaultData.heatdata.map(function (item) {
  return {
    group: defaultData.hours[item[1]],
    variable: defaultData.days[item[0]],
    value: item[2] || "-",
  };
});

export function DrawHeatmapChart(ChartId, propsData, styles) {
  const { width, height } = styles?.chartContainer || defaultStyle.chartContainer;
  const margin = styles?.margin || defaultStyle.margin;
  // const chartData = propsData || defaultData.heatdata;
const chartData = propsData || defaultData;
  

  // Calculate additional margin based on font sizes
  const fontSizeX =
    styles?.axisLabels?.x?.fontSize || defaultStyle?.axisLabels?.x?.fontSize;
  const fontSizeY =
    styles?.axisLabels?.y?.fontSize || defaultStyle?.axisLabels?.y?.fontSize;
  const fontSizeTitle =
    styles?.chartTitle?.fontSize || defaultStyle?.chartTitle?.fontSize;

  // Check if font sizes have changed
  const fontSizeXChanged = fontSizeX !== defaultStyle?.axisLabels?.x?.fontSize;
  const fontSizeYChanged = fontSizeY !== defaultStyle?.axisLabels?.y?.fontSize;
  const fontSizeTitleChanged =
    fontSizeTitle !== defaultStyle?.chartTitle?.fontSize;

  // Calculate additional margin based on font sizes
  const extraMarginTop =
    styles?.chartTitle?.view !== false && fontSizeTitleChanged
      ? parseFloat(fontSizeTitle) * 1.5
      : 0; // Additional margin for chart title

  const extraMarginBottom =
    styles?.axisLabels?.x?.view !== false && fontSizeXChanged
      ? parseFloat(fontSizeX) * 2.5
      : 0; // Additional margin for X-axis label

  const extraMarginLeft =
    styles?.axisLabels?.y?.view !== false && fontSizeYChanged
      ? parseFloat(fontSizeY) * 0.5
      : 0; // Additional margin for Y-axis label

  // Update margins based on extra margins
  const adjustedTop = defaultStyle.margin.top + extraMarginTop;
  const adjustedBottom = defaultStyle.margin.bottom + extraMarginBottom;
  const adjustedLeft = defaultStyle.margin.left + extraMarginLeft;

  // Remove the existing svg
  d3.select(`#${ChartId} svg`).remove();
  // Append the svg object to the body of the page
  const svg = d3
    .select(`#${ChartId}`)
    .append("svg")
    .attr("width", width + adjustedLeft + defaultStyle.margin.right)
    .attr("height", height + adjustedTop + adjustedBottom)
    .append("g")
    .attr("transform", `translate(${adjustedLeft},${adjustedTop})`);
    

  // Build X scales and axis:
  const xScale = d3
    .scaleBand()
    .range([0, width])
    .domain(defaultData.hours)
    .padding(0.05);
  svg
    .append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(xScale));

  // Build Y scales and axis:
  const yScale = d3
    .scaleBand()
    .range([height, 0])
    .domain(defaultData.days)
    .padding(0.01);
  svg.append("g").call(d3.axisLeft(yScale));

  // Build color scale
  const Color = d3
    .scaleSequential()
    // .interpolator(d3.interpolateInferno)
    .range(["green", "red"])
    .domain([0, 10]);

  // tooltip
  const tooltip = d3
    .select(`#${ChartId}`)
    .append("div")
    .style("position", "absolute")
    .style("display", "block")
    .style("border-style", "solid")
    .style("white-space", "nowrap")
    .style("z-index", defaultStyle.tooltip.zIndex)
    .style(
      "box-shadow",
      styles?.tooltip.tooltipContainer.boxShadow ||
      defaultStyle.tooltip.boxShadow
    )
    .style("transition", defaultStyle.tooltip.transition)
    .style(
      "background-color",
      styles?.tooltip.tooltipContainer.backgroundColor ||
      defaultStyle.tooltip.backgroundColor
    )
    .style(
      "border-width",
      styles?.tooltip.tooltipContainer.borderWidth ||
      defaultStyle.tooltip.borderWidth
    )
    .style(
      "border-radius",
      styles?.tooltip.tooltipContainer.borderRadius ||
      defaultStyle.tooltip.borderRadius
    )
    .style(
      "padding",
      styles?.tooltip.tooltipContainer.padding || defaultStyle.tooltip.padding
    )
    .style("top", defaultStyle.tooltip.top)
    .style("left", defaultStyle.tooltip.left)
    .style(
      "border-color",
      styles?.tooltip.tooltipContainer.borderColor ||
      defaultStyle.tooltip.borderColor
    )
    .style("pointer-events", defaultStyle.tooltip.pointerEvents)
    .style("visibility", "hidden")
    .style("opacity", defaultStyle.tooltip.opacity);

  // Add the squares
  svg
    .selectAll()
    .data(data, function (d) {
      return d.group + ":" + d.variable;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return xScale(d.group);
    })
    .attr("y", function (d) {
      return yScale(d.variable);
    })
    .attr("width", xScale.bandwidth())
    .attr("height", yScale.bandwidth())
    .style("fill", function (d) {
      // Check for empty values and assign white color
      return d.value === "-" ? "white" : Color(d.value);
    })
    .on("mouseover", function (event, d) {
      // Show the tooltip on mouseover
      tooltip.style("visibility", "visible").style("opacity", "1");
  
      // Position the tooltip
      tooltip.style("left", event.pageX-30 + "px").style("top", event.pageY - 60 + "px");
  
      // Set the content of the tooltip
      tooltip.html(
        `<div><span>${d.variable}</span>
        <div style="display:flex;gap:5px;flex-direction:row;padding-left:10px">
        <span><span style="position: absolute; left: 4px; bottom: 11px; transform: translateY(-50%);
         display: inline-block; width: 10px; height: 10px; background-color: ${Color(
          d.value
        )}; border-radius: 50%;">
        </span> ${d.group}</span> : <strong>${d.value}</strong> </div>
        </div>`
      );
    })
    .on("mouseout", function () {
      // Hide the tooltip on mouseout
      tooltip.style("visibility", "hidden").style("opacity", "0");
    });

  // Add Chart Title
  if (
    styles?.chartTitle?.view !== false &&
    defaultStyle?.chartTitle?.view !== false
  ) {
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", defaultStyle?.chartTitle?.marginTop)
      .style("text-anchor", "middle")
      .style("fill", styles?.chartTitle?.fill || defaultStyle?.chartTitle?.fill)
      .style(
        "font-size",
        styles?.chartTitle?.fontSize || defaultStyle?.chartTitle?.fontSize
      )
      .text(styles?.chartTitle?.text || defaultStyle?.chartTitle?.text);
  }
  // Add X-axis label
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale));

  if (
    styles?.axisLabels?.x?.view !== false &&
    defaultStyle?.axisLabels?.x?.view !== false
  ) {
    xAxis
      .append("text")
      .attr("x", width / 2)
      .attr("y", adjustedBottom / 1.5)
      .style("text-anchor", "middle")
      .style(
        "fill",
        styles?.axisLabels?.x?.fill || defaultStyle?.axisLabels?.x?.fill
      )
      .style(
        "font-size",
        styles?.axisLabels?.x?.fontSize || defaultStyle?.axisLabels?.x?.fontSize
      )
      .text(styles?.axisLabels?.x?.text || defaultStyle?.axisLabels?.x?.text);

    xAxis
      .selectAll(".tick text")
      .attr(
        "transform",
        styles?.axisLabels?.x?.tickLabelOrientation ||
        defaultStyle?.axisLabels?.x?.tickLabelOrientation
      )
      .style(
        "text-anchor",
        styles?.axisLabels?.x?.textAnchor ||
        defaultStyle?.axisLabels?.x?.textAnchor
      );
  }

  // Add Y-axis label
  const yAxis = svg.append("g").call(d3.axisLeft(yScale));

  if (
    styles?.axisLabels?.y?.view !== false &&
    defaultStyle?.axisLabels?.y?.view !== false
  ) {
    yAxis
      .append("text")
      .attr("transform", defaultStyle?.axisLabels?.y?.transform)
      .attr("y", -width / 7)
      .attr("x", -height / 2)
      .style("text-anchor", defaultStyle?.axisLabels?.y?.textAnchor)
      .style(
        "fill",
        styles?.axisLabels?.y?.fill || defaultStyle?.axisLabels?.y?.fill
      )
      .style(
        "font-size",
        styles?.axisLabels?.y?.fontSize || defaultStyle?.axisLabels?.y?.fontSize
      )
      .text(styles?.axisLabels?.y?.text || defaultStyle?.axisLabels?.y?.text);
  }
}

// Call the function with some data
DrawHeatmapChart("heatmap-chart");
