/* eslint-disable no-undef */
const defaultStyles = {
  chartContainer: {
    width: 500,
    height: 400,
  },
  radialLine: {
    stroke: getRandomColor(), 
  },
  dataPoint: {
    radius: 4,
    fill: getRandomColor(), 
  },
  label: {
    dy: 10, 
  },
  legend: {
    x: 100,
    y: 20,
    rectWidth: 18,
    rectHeight: 18,
    rectFill: getRandomColor(), 
    rectStroke: getRandomColor(), 
    textX: 24,
    textY: 9,
    textDy: ".35em",
    textAnchor: "start",
  },
  radarLine: {
    stroke: getRandomColor(), 
    strokeWidth: 3,
    strokeOpacity: 0.6,
    fillOpacity: 0.3,
  },
  tooltip: {
    fontSize: "12px",
    visibility: "visible",
    visibilityOnMouseOut: "hidden",
    pointerEvents: "none",
    opacity: 0.9,
    mouseOutDuration: 2000,
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
      fill: "#fff",
      strokeColor: "#000",
    },
  },
};

// Function to generate a random color
function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

// Main function to draw the radar chart
export function DrawRadarChart(RadarChartId, radarData, styles) {
  // Select the container element by ID
  const container = d3.select(`#${RadarChartId}`);
  const chartStyles = styles || defaultStyles || {};
  const { width, height } = chartStyles.chartContainer || {};

  // Create an SVG element within the container
  const svg = container
    .append("svg")
    .attr("width", width || defaultStyles.chartContainer.width)
    .attr("height", height || defaultStyles.chartContainer.height);

  // Calculate the maximum value for the radar chart
  const maxValue = getMaxValue(radarData);
  const radius = 150;
  const labelMargin = 30; // Margin for labels
  const center = { x: width / 2, y: height / 2 };
  const radialScale = d3.scaleLinear().domain([0, maxValue]).range([radius, 0]);

  // Customize the axis ticks
  const axis = d3
    .axisRight()
    .scale(radialScale)
    .ticks(5)
    .tickFormat(d3.format("")); // Use an empty string to remove tick labels

  // Append the axis to the SVG
  svg
    .append("g")
    .attr("transform", `translate(${center.x},${center.y - radius})`)
    .call(axis);

  // Extract radar series data or use a default if not provided
  const radarSeries = radarData.series || [radarData];

  // Loop through each radar series
  radarSeries.forEach(({ name, data, color }, index) => {
    // Initialize an empty path for the radar area
    let path = "";

    // Loop through each data point in the series
    for (let i = 0; i < (data[0]?.value || data[0]).length; i++) {
      // Calculate the polar coordinates for the data point
      const angle = (i * (2 * Math.PI)) / (data[0]?.value || data[0]).length;
      const x = center.x + radius * Math.sin(angle);
      const y = center.y + radius * -Math.cos(angle);

      // Append a line element for each radial line
      svg
        .append("line")
        .attr("x1", center.x)
        .attr("y1", center.y)
        .attr("x2", x)
        .attr("y2", y)
        .style("stroke", defaultStyles.radialLine.stroke)
        .style("fill", "none");

      const seriesData = data[0]?.value || data[0];
      // Append a circle element at each data point
      const r = radius - radialScale(data[0]?.value[i]);
      const pointX = center.x + r * Math.sin(angle);
      const pointY = center.y + r * -Math.cos(angle);

      // Append a circle element at each data point
      svg
        .append("circle")
        .attr("cx", pointX)
        .attr("cy", pointY)
        .attr("r", defaultStyles.dataPoint.radius)
        .style("fill", color)
        .style("cursor", "pointer")
        .style("opacity", 1)
        .attr("data-legend", index)
        .classed("circle-legend", true)
        .on("mouseover", function (event) {
          tooltip.transition();
          const categories = radarData.radar.indicator.map(
            (indicator) => indicator
          );
          // Handle tooltip on mouseover
          handleTooltip(event, seriesData[i], categories, i);
        })
        // .on("mousemove", function (event) {
        //     const categories =radarData.radar.indicator.map(indicator => indicator.name)
        //     // Handle tooltip on mousemove
        //     handleTooltip(event, seriesData[i],categories);
        // })
        .on("mouseout", function () {
          // Hide tooltip on mouseout
          tooltip
            .transition()
            .style("opacity", defaultStyles?.tooltip?.mouseOutOpacity)
            .style("visibility", defaultStyles?.tooltip?.visibilityOnMouseOut);
        });

      // Build the path for the radar area
      path += `${i > 0 ? "L" : "M"} ${pointX},${pointY} `;
    }

    // Close the path for the radar area
    path += "Z";

    // Append a path element for the radar area
    const line = svg
      .append("path")
      .attr("d", path)
      .style("stroke", color || defaultStyles.radarLine.stroke)
      .style("stroke-width", defaultStyles.radarLine.strokeWidth)
      .style("stroke-opacity", defaultStyles.radarLine.strokeOpacity)
      .style("fill", color || defaultStyles.radarLine.fill)
      .style("fill-opacity", defaultStyles.radarLine.fillOpacity);

    // Track visibility state
    let isVisible = true;

    // Click event listener
    line.on("click", function () {
      // Toggle the visibility of associated circles
      svg
        .selectAll(".circle-legend[data-legend='" + index + "']")
        .style("opacity", isVisible ? 0 : 1);

      // Update visibility state
      isVisible = !isVisible;
    });

    // Append a legend group for each series
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr(
        "transform",
        `translate(${width - defaultStyles.legend.x},${
          index * defaultStyles.legend.y
        })`
      )
      .style("cursor", "pointer");

    // Append a rectangle to the legend group
    legend
      .append("rect")
      .attr("width", defaultStyles.legend.rectWidth)
      .attr("height", defaultStyles.legend.rectHeight)
      .style("fill", color || defaultStyles.legend.rectFill)
      .style("stroke", color || defaultStyles.legend.rectStroke)
      .on("click", function () {
        // Toggle the visibility of the radar area on legend click
        const isHidden = line.style("opacity") === "0";
        line.style("opacity", isHidden ? 1 : 0);
        // Toggle the visibility of associated circles
        svg
          .selectAll(".circle-legend[data-legend='" + index + "']")
          .style("opacity", isHidden ? 1 : 0);
      });

    // Append text to the legend group
    legend
      .append("text")
      .attr("x", defaultStyles.legend.textX)
      .attr("y", defaultStyles.legend.textY)
      .attr("dy", defaultStyles.legend.textDy)
      .style("text-anchor", defaultStyles.legend.textAnchor)
      .text(name || `Legend ${index + 1}`);
  });

  // Draw labels for radar indicators
  const values = radarData.radar.indicator.map((indicator) => indicator.name);
  values.forEach((label, i) => {
    // Calculate the polar coordinates for the label
    const angle = (i * (2 * Math.PI)) / values.length;
    const x = center.x + (radius + labelMargin) * Math.sin(angle);
    const y = center.y + (radius + labelMargin) * -Math.cos(angle);

    // Append text elements for each label
    svg
      .append("text")
      .text(label)
      .attr("text-anchor", "middle")
      .attr("dx", 0)
      .attr("dy", defaultStyles?.label.dy)
      .attr("x", x)
      .attr("y", y);
  });

  // Adding the tooltip

  // Helper function to handle tooltip
  function handleTooltip(event, d, categories, i) {
    // Update the tooltip content and style
    tooltip
      .html(
        `<div  text-align:center; margin:0; font-size: ${defaultStyles?.tooltip?.tooltipContainer?.fontSize}; color: 'black'">
        ${categories[i].name} : ${d}
            </div>`
      )
      .style("left", `${event.pageX + 10}px`) // Add margin
      .style("top", `${event.pageY - 28}px`)
      .style("opacity", 1)
      .style("visibility", "visible")
      .style("display", "block");
  }

  const tooltip = d3
    .select(`#${RadarChartId}`)
    .append("div")
    .style("position", defaultStyles?.tooltip?.position)
    .style("display", defaultStyles?.tooltip?.display)
    .style("border-style", defaultStyles?.tooltip?.borderStyle)
    .style("white-space", defaultStyles?.tooltip?.whiteSpace)
    .style("z-index", defaultStyles?.tooltip?.zIndex)
    .style("box-shadow", defaultStyles?.tooltip?.boxShadow)
    .style("transition", defaultStyles?.tooltip?.transition)
    .style("background-color", defaultStyles?.tooltip?.tooltipContainer?.fill)
    .style(
      "border-width",
      defaultStyles?.tooltip?.tooltipContainer?.borderWidth
    )
    .style(
      "border-radius",
      defaultStyles?.tooltip?.tooltipContainer?.borderRadius
    )
    // .style("padding", defaultStyles?.tooltip?.padding)
    .style("pointer-events", defaultStyles?.tooltip?.pointerEvents)
    .style("visibility", defaultStyles?.tooltip?.visibilityOnMouseOut)
    .style("opacity", defaultStyles?.tooltip?.opacity);

  // Draw hexagonal grid lines
  for (let i = 0; i < values.length; i++) {
    const startAngle = (i * (2 * Math.PI)) / values.length;
    const startX = center.x + radius * Math.sin(startAngle);
    const startY = center.y + radius * -Math.cos(startAngle);

    for (let j = 0; j < values.length; j++) {
      if (i !== j) {
        const endAngle = (j * (2 * Math.PI)) / values.length;
        const endX = center.x + radius * Math.sin(endAngle);
        const endY = center.y + radius * -Math.cos(endAngle);

        // Append hexagonal grid lines connecting each label point
        svg
          .append("line")
          .attr("x1", startX)
          .attr("y1", startY)
          .attr("x2", endX)
          .attr("y2", endY)
          .style("stroke", "#d3d3d3")
          .style("fill", "none")
          .style("margin", "20px");
      }
    }
  }
}

// Function to get the maximum value from radarData
function getMaxValue(radarData) {
  if (radarData[0]?.values) {
    return d3.max(radarData[0].values);
  } else if (radarData.radar?.indicator) {
    return d3.max(radarData.radar.indicator.map((indicator) => indicator.max));
  }
  return 0;
}

// Example radar data
const radarData = {
  radar: {
    indicator: [
      { name: "Sales", max: 6500 },
      { name: "Administration", max: 16000 },
      { name: "Information Technology", max: 30000 },
      { name: "Customer Support", max: 38000 },
      { name: "Development", max: 52000 },
      { name: "Marketing", max: 25000 },
    ],
  },
  series: [
    {
      name: "Budget",
      data: [
        {
          value: [4200, 3000, 20000, 35000, 50000, 18000],
          name: "Budget",
        },
      ],
      color: defaultStyles.legend.rectFill,
    },
    {
      name: "Spending",
      data: [
        {
          value: [5000, 14000, 28000, 26000, 42000, 21000],
          name: "Spending",
        },
      ],
      color: getRandomColor(), 
    },
  ],
};

// Call the DrawRadarChart function with the specified ID ("radar-chart")
DrawRadarChart("radar-chart", radarData, defaultStyles);
