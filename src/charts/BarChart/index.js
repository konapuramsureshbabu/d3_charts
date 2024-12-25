/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */

// const defaultData = {
//   data: [
//     {
//       xAxis: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//       yAxis: [
//         { Forest: [320, 332, 301, 334, 390, -50, 70] },
//         { Steppe: [220, 182, 191, 234, 290, -10, 11] },
//         { Desert: [150, 232, 201, 154, 190, 56, 26] },
//         { vasude: [5, 15, 85, 25, 65, 75, 57] },
//         { put: [30, 20, 35, 38, 26, 85, 37] },
//         { sfbvjsbhvushbvu: [0, 20, 35, 38, 26, 85, 37] },
//         { jhjjvu: [0, 20, 35, 38, 26, 850, 37] },
//       ],
//     },
//   ],
// };
const defaultData = {
  data: [
    {category:"Mon",dimension:"Forest",value:320},
    {category:"Tue",dimension:"Forest",value:332},
    {category:"Wed",dimension:"Forest",value:301},
    {category:"Thu",dimension:"Forest",value:334},
    {category:"Fri",dimension:"Forest",value:390},
    {category:"Sat",dimension:"Forest",value:-50},
    {category:"Sun",dimension:"Forest",value:70},
    {category:"Mon",dimension:"Steppe",value:220},
    {category:"Tue",dimension:"Steppe",value:182},
    {category:"Wed",dimension:"Steppe",value:191},
    {category:"Thu",dimension:"Steppe",value:234},
    {category:"Fri",dimension:"Steppe",value:290},
    {category:"Sat",dimension:"Steppe",value:-10},
    {category:"Sun",dimension:"Steppe",value:11},
    {category:"Mon",dimension:"Desert",value:150},
    {category:"Tue",dimension:"Desert",value:232},
    {category:"Wed",dimension:"Desert",value:201},
    {category:"Thu",dimension:"Desert",value:154},
    {category:"Fri",dimension:"Desert",value:190},
    {category:"Sat",dimension:"Desert",value:56},
    {category:"Sun",dimension:"Desert",value:26},
    {category:"Mon",dimension:"vasude",value:5},
    {category:"Tue",dimension:"vasude",value:15},
    {category:"Wed",dimension:"vasude",value:85},
    {category:"Thu",dimension:"vasude",value:25},
    {category:"Fri",dimension:"vasude",value:65},
    {category:"Sat",dimension:"vasude",value:75},
    {category:"Sun",dimension:"vasude",value:57},
  ],
};
const defaultStyle = {
  chartContainer: { width: 500, height: 500 },
  margin: { top: 50, right: 100, bottom: 80, left: 100 },
  chartColor: { backgroundColor: "#fff", fill: "steelblue" },
  delay: 100,
  duration: 500,
  opacity: { tooltip: 0.9, hidden: 0 },
  tooltip: {
    zIndex: "999",
    boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
    transition:
      "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
    backgroundColor: "#ffffff",
    borderWidth: "1px",
    borderRadius: "4px",
    color: "rgb(102, 102, 102)",
    font: "14px",
    padding: "10px",
    top: "0px",
    left: "0px",
    borderColor: "#ffffff",
    pointerEvents: "none",
    visibility: "hidden",
    opacity: "0",
    fontFamily: "Arial",
    textAlign: "left",
    tooltipContainer: { margin: "2px" },
    tooltiplabel: {
      fontSize: "18px",
      color: "rgb(102, 102, 102)",
      fontWeight: "400",
    },
  },
  xAxis: {
    title: {
      view: true,
      value: "X Axis Label",
      fontFamily: "Arial",
      color: "#333",
      fontSize: "16px",
      placement: "start",
    },
    axisLine: {
      color: "#333",
    },
    axisTick: {
      color: "#000",
    },
    tickLabel: {
      rotation: 0,
      fontSize: "16px",
      fontFamily: "Arial",
      color: "#000",
      view: "auto",
    },
  },
  yAxis: {
    title: {
      view: true,
      value: "Y Axis Label",
      fontFamily: "Arial",
      color: "#333",
      fontSize: "16px",
      placement: "middle",
      transform: "rotate(-90)",
    },
    axisLine: {
      color: "#333",
    },
    axisTick: {
      color: "#000",
    },
    tickLabel: {
      fontSize: "16px",
      fontFamily: "Arial",
      color: "#333",
      view: "auto",
    },
  },
  chartTitle: {
    view: true,
    text: "Bar Chart Label",
    fontFamily: "Arial",
    color: "#333",
    fontSize: "16",
    marginTop: -9,
  },
  gridLine: {
    view: true,
    color: "#c7d2da",
    opacity: 0.7,
  },
};


export function drawBarChart(options, propsData, styles) {
  const { width, height } = {
    width:
      styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width,
    height:
      styles?.chartContainer?.height?.value ||
      defaultStyle.chartContainer.height,
  };

  // x Axis data for chart using props data || default data || options.dimension
  const categories =
    Array.isArray(options?.dimension) &&
    options?.dimension.length > 0 &&
    options?.dimension.some((item) => item !== undefined)
      ? options?.dimension
      : propsData?.xAxis && propsData.xAxis.length > 0
      ? propsData?.data?.map(item => item.category)
      : defaultData?.data?.map(item => item.category);
      // [0]?.xAxis;
 
   const dataValues =
  Array.isArray(options?.measures) && options?.measures?.length > 0
  ? options?.measures?.map((item) => {
      const valuesArray = Object.values(item)[0];
      return Array.isArray(valuesArray)
        ? valuesArray.map((value) => parseFloat(value) || 0) // Parse as float or fallback to 0
        : [];
    }):[]
      // : propsData && propsData.yAxis && propsData.xAxis
      // ? propsData.yAxis.map((categoryObj) =>
      //     Object.values(categoryObj).map((values) => values)
      //   )
      // : defaultData.data[0].yAxis.map((item) =>
      //     Object.values(item)[0].map((value) => +value)
      //   );

  const fontSizeX =
    styles?.xAxis?.title?.fontSize?.value ||
    defaultStyle?.xAxis?.title?.fontSize;
  const fontSizeY =
    styles?.yAxis?.title?.fontSize?.value ||
    defaultStyle?.yAxis?.title?.fontSize;
  const fontSizeTitle =
    styles?.chartTitle?.fontSize?.value || defaultStyle?.chartTitle?.fontSize;

  const fontSizeXChanged = fontSizeX !== defaultStyle?.xAxis?.title?.fontSize;
  const fontSizeYChanged = fontSizeY !== defaultStyle?.yAxis?.title?.fontSize;
  const fontSizeTitleChanged =
    fontSizeTitle !== defaultStyle?.chartTitle?.fontSize;

  const extraMarginTop =
    styles?.chartTitle?.view?.value !== false && fontSizeTitleChanged
      ? parseFloat(fontSizeTitle) * 1.5
      : 0;

  const extraMarginBottom =
    styles?.xAxis?.title?.view?.value !== false && fontSizeXChanged
      ? parseFloat(fontSizeX) * 2.5
      : 0;

  const extraMarginLeft =
    styles?.yAxis?.title?.view?.value !== false && fontSizeYChanged
      ? parseFloat(fontSizeY) * 0.5
      : 0;

  const adjustedTop = defaultStyle.margin.top + extraMarginTop;
  const adjustedBottom = defaultStyle.margin.bottom + extraMarginBottom;
  const adjustedLeft = defaultStyle.margin.left + extraMarginLeft;
  const transformedData = [];
  if (options?.measures?.length > 0) {
    dataValues.forEach((values, index) => {
      const categoryObj = options?.measures[index];
      if (categoryObj && typeof categoryObj === "object") {
        const category = Object.keys(categoryObj)[0];
        if (Array.isArray(values)) {
          values.forEach((value, i) => {
            transformedData.push({
              category: categories[i],
              dimension: category,
              value: value,
            });
          });
        }
      }
    });
  } else {
    if (propsData && propsData.data.length > 0) {
     transformedData.push(...propsData.data);
    } else {
      transformedData.push(...defaultData.data);
  }
  }
  let disabledLegends = [];
  const filteredData = transformedData.filter(
    (d) => !disabledLegends.includes(d.dimension)
  );
  const filteredValues = filteredData.map((d) => d.value);
  const maxPositiveValue = Math.max(
    Math.ceil(d3.max(filteredValues) / 10) * 10,
    10
  );
  const minNegativeValue = Math.min(
    Math.floor(d3.min(filteredValues) / 10) * 10,
    0
  );
  // x and y scale declaration
  let x = d3
    .scaleLinear()
    .range([0, height])
    .domain([minNegativeValue, maxPositiveValue]);
  const y = d3.scaleBand().domain(categories).range([width, 0]).padding(0.2);
  // color scale for bar
  const colorScale = d3.scaleOrdinal().range(d3.schemeCategory10);
  // legend keys for color scale
  let legendKeysSet = new Set(
    (options?.measures &&
      Array.isArray(options?.measures) &&
      options?.measures.length > 0 &&
      options?.measures.map((series) => Object.keys(series)[0])) ||
    (propsData?.data && propsData.data.map((series) => series.dimension)) ||
    (defaultData?.data && defaultData.data.map((series) => series.dimension)) ||
    []
  );
  
  let legendKeys = Array.from(legendKeysSet);
  // function to get color for each legend and bar
  function getColor(index) {
    return disabledLegends.includes(legendKeys[index])
      ? "gray"
      : colorScale(index);
  }
  // remove existing svg and tooltip before drawing chart
  d3.select(`#${options.id}`).selectAll("svg").remove();
  d3.select(`#${options.id}`).select("#tooltip").remove();
  // svg container

  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("width", width + adjustedLeft + defaultStyle.margin.right)
    .attr("height", height + adjustedTop + adjustedBottom)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor?.value ||
        defaultStyle.chartColor.backgroundColor
    )

    .append("g")
    .attr("transform", `translate(${adjustedLeft},${adjustedTop})`);

  //function for responsive chart
  function chart() {
    // function for grid lines
    function addGridLines(svg, x, y, width, height) {
      if (
        styles?.gridLine?.view?.value !== false &&
        defaultStyle?.gridLine?.view !== false
      ) {
        svg
          .append("g")
          .attr("class", "grid")
          .call(d3.axisBottom(x).tickSize(height).tickFormat(""))
          .selectAll("line")
          .style(
            "stroke",
            styles?.gridLine?.color?.value || defaultStyle.gridLine.color
          )
          .style(
            "stroke-opacity",
            styles?.gridLine?.opacity?.value || defaultStyle.gridLine.opacity
          )
          .style("shape-rendering", "crispEdges");
      }
      svg.selectAll("path").style("stroke-width", 0);
    }
    addGridLines(svg, x, y, width, height);

    // adding tooltip
    const tooltip = d3
      .select(`#${options.id}`)
      .append("div")
      .attr("id", "tooltip")
      .style("position", "absolute")
      .style("text-align", defaultStyle.tooltip.textAlign)
      .style("border-style", "solid")
      .style("white-space", "nowrap")
      .style("z-index", defaultStyle.tooltip.zIndex)
      .style("box-shadow", defaultStyle.tooltip.boxShadow)
      .style("transition", defaultStyle.tooltip.transition)
      .style(
        "background-color",
        styles?.tooltip.bgColor?.value || defaultStyle.tooltip.backgroundColor
      )
      .style(
        "border-width",
        styles?.tooltip.borderWidth?.value || defaultStyle.tooltip.borderWidth
      )
      .style(
        "border-radius",
        styles?.tooltip.borderRadius?.value || defaultStyle.tooltip.borderRadius
      )
      .style(
        "padding",
        styles?.tooltip.padding?.value || defaultStyle.tooltip.padding
      )
      .style("top", defaultStyle.tooltip.top)
      .style("left", defaultStyle.tooltip.left)
      .style(
        "border-color",
        styles?.tooltip.borderColor?.value || defaultStyle.tooltip.borderColor
      )
      .style("pointer-events", defaultStyle.tooltip.pointerEvents)
      .style("visibility", "visible")
      .style("opacity", defaultStyle.tooltip.opacity);
    // filtered data according to disbale legends and legend enable keys for bar position and width
    const filteredData = transformedData.filter(
      (d) => !disabledLegends.includes(d.dimension)
    );
    const enabledLegendKeys = legendKeys.filter(
      (key) => !disabledLegends.includes(key)
    );
    svg.selectAll(".barGroup").remove();
    // bars plotiing
    const bars = svg
      .selectAll(".barGroup")
      .data(filteredData)
      .enter()
      .append("g")
      .attr("class", "barGroup")
      .attr("transform", (d) => `translate(0, ${y(d.category)})`); 

    bars
      .append("rect")
      .attr(
        "y",
        (d) =>
          (y.bandwidth() / enabledLegendKeys.length) *
          enabledLegendKeys.indexOf(d.dimension)
      )
      .attr("height", y.bandwidth() / enabledLegendKeys.length)
      .attr("x", (d) => (d.value >= 0 ? x(0) : x(d.value)))
      .attr("width", (d) => Math.abs(x(d.value) - x(0))) 
      .style("fill", (d) => getColor(legendKeys.indexOf(d.dimension)));
    bars
      .selectAll(".invisible")
      .data((d) => [d])
      .enter()
      .append("rect")
      .attr(
        "y",
        (d) =>
          (y.bandwidth() / enabledLegendKeys.length) *
          enabledLegendKeys.indexOf(d.dimension)
      )
      .attr("height", y.bandwidth() / enabledLegendKeys.length)
      .attr("x", 0)
      .attr("width", width)
      .style("pointer-events", "all")
      .style("fill", "none")
      .on("mouseover", function (event, d) {
        tooltip
          .transition()
          .duration(200)
          .style("opacity", 1)
          .style("visibility", "visible");
      })
      .on("mousemove", function (event, d) {
        let htmlString = `<div style="margin: ${
          defaultStyle.tooltip.tooltipContainer
        };"><div style="font-size: ${
          styles?.tooltip.fontSize?.value ||
          defaultStyle.tooltip.tooltiplabel.fontSize
        }; color: ${
          styles?.tooltip.textColor?.value ||
          defaultStyle.tooltip.tooltiplabel.color
        }; font-family :${
          styles?.tooltip.fontFamily?.value || defaultStyle.tooltip.fontFamily
        } "><strong>${d.category}</strong><br>`;

        const matchingData = filteredData.filter((data) => data.category === d.category);

        matchingData.forEach((data) => {
          const color = getColor(legendKeys.indexOf(data.dimension));
          htmlString += `<span style="color: ${color}; font-size: ${
            styles?.tooltip.fontSize ||
            defaultStyle.tooltip.tooltiplabel.fontSize
          }; display: inline-block; width: 0.625em; height: 0.625em; border-radius: 50%; background-color: ${color}; margin-right: 0.3125em;"></span>
      ${data.dimension} : ${data.value}<br>`;
        });

        htmlString += "</div></div>";

        tooltip
          .html(htmlString)
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip
          .transition()
          .duration(defaultStyle.duration)
          .style("opacity", 0)
          .style("visibility", "hidden");
      });

    // bar animation
    bars
      .transition()
      .delay((_, i) => i * defaultStyle.delay)
      .duration(defaultStyle.duration)
      .attr("y", (d) => y(Math.max(0, d.value)))
      .attr("height", (d) => Math.abs(y(d.value) - y(0)));
  }
  // function for chart update
  function updateChart(styles) {
    updateScales();
    svg.selectAll("*").remove();
    d3.select(`#${options.id}`).select("#tooltip").remove();
    if (legendKeys.length > 1) {
    legends();}
    chart();
    addAxes(svg, x, y, height, styles, defaultStyle);
  }
  // function for chart scale update
  function updateScales(styles) {
    const filteredData = transformedData.filter(
      (d) => !disabledLegends.includes(d.dimension)
    );
    const filteredValues = filteredData.map((d) => d.value);
    const maxPositiveValue = Math.max(d3.max(filteredValues), 10);
    const minNegativeValue = Math.min(d3.min(filteredValues), 0);

    x.domain([minNegativeValue, maxPositiveValue]);
    addAxes(svg, x, y, height, styles, defaultStyle);
  }

  // function for legends adding and chart update
  function legends() {
    const legend = svg
      .append("g")
      .attr("class", "legend")
      .attr("transform", `translate(${width + 10}, 20)`);

    legend
      .selectAll("rect")
      .data(legendKeys)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (_, i) => i * 20)
      .attr("width", 18)
      .attr("height", 18)
      .style("fill", (d, i) => getColor(i))
      .attr("data-legend", (d) => d)
      .on("click", toggleLegend);

    legend
      .selectAll("text")
      .data(legendKeys)
      .enter()
      .append("text")
      .attr("x", 25)
      .attr("y", (_, i) => i * 20 + 9)
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      .text((d) => d)
      .attr("data-legend", (d) => d)
      // .style("fill", "black")
      .style("fill", (d) => (disabledLegends.includes(d) ? "gray" : "black"))
      .on("click", toggleLegend);

    // function for legend on click
    function toggleLegend(event) {
      const legendKey =
        d3.select(this).attr("data-legend") ||
        d3.select(this.parentNode).attr("data-legend");

      if (legendKey) {
        const index = disabledLegends.indexOf(legendKey);

        if (index === -1) {
          disabledLegends.push(legendKey);
        } else {
          disabledLegends.splice(index, 1);
        }
        updateChart();
        legend.selectAll("rect").style("fill", (d, i) => getColor(i));
      }
    }
  }

  //function calling
  if (legendKeys.length > 1) {
  legends();}
  chart();
  addAxes(svg, x, y, height, styles, defaultStyle);

  // Add Dragged Chart Title
  function dragstarted() {
    d3.select(this).raise().classed("active", true);
  }

  function dragged(event) {
    d3.select(this).attr("x", event.x).attr("y", event.y);
  }

  function draggedy(event) {
    d3.select(this).attr("y", event.x).attr("x", -event.y);
  }
  function dragended() {
    d3.select(this).classed("active", false);
  }

  // function for adding axes
  function addAxes(svg, x, y, height, styles, defaultStyle) {
    // calculate width and height multiplier for responsive chart axis font size
    const widthMultiplier = Math.min(
      width / defaultStyle.chartContainer.width,
      1
    );
    const heightMultiplier = Math.min(
      height / defaultStyle.chartContainer.height,
      1
    );
    // calculate font size for responsive chart axis font size
    const yaxistickFontSize =
      parseFloat(
        (
          styles?.yAxis?.tickLabel?.fontSize?.value ||
          defaultStyle?.yAxis?.tickLabel?.fontSize
        ).replace("px", "")
      ) *
        heightMultiplier +
      "px";
    const xaxisTickFontSize =
      parseFloat(
        (
          styles?.xAxis?.tickLabel?.fontSize?.value ||
          defaultStyle?.xAxis?.tickLabel?.fontSize
        ).replace("px", "")
      ) *
        widthMultiplier +
      "px";
    // Add X-axis
    const xAxis = svg
      .append("g")
      .attr("class", "x-axis")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x));
    // Style the tick lines
    xAxis
      .selectAll(".tick line")
      .style(
        "stroke",
        styles?.xAxis?.axisTick?.color?.value ||
          defaultStyle?.xAxis?.axisTick?.color
      );

    // Style the tick labels (values)
    xAxis
      .selectAll(".tick text")
      .style(
        "fill",
        styles?.xAxis?.tickLabel?.color?.value ||
          defaultStyle?.xAxis?.tickLabel?.color
      )
      .style(
        "font-family",
        styles?.xAxis?.tickLabel?.fontFamily?.value ||
          defaultStyle?.xAxis?.tickLabel?.fontFamily
      )
      .style("font-size", `${xaxisTickFontSize}`)
      .attr(
        "transform",
        `rotate(${styles?.xAxis?.tickLabel?.rotation?.value})` ||
          defaultStyle?.axisLabels?.x?.tickLabelOrientation
      )
      .style(
        "text-anchor",
        styles?.xAxis?.tickLabel?.textAnchor?.value ||
          defaultStyle?.axisLabels?.x?.textAnchor
      )
      .text((d) => {
        if (d >= 1e9) {
          return (d / 1e9).toFixed(1) + "B";
        } else if (d >= 1e6) {
          return (d / 1e6).toFixed(1) + "M";
        } else if (d >= 1e3) {
          return (d / 1e3).toFixed(1) + "K";
        } else {
          return d;
        }
      });
    // Style the axis line
    xAxis
      .select(".domain")
      .style(
        "stroke",
        styles?.xAxis?.axisLine?.color?.value ||
          defaultStyle?.xAxis?.axisLine?.color
      );

    // Add horizontal line at 0 value if minNegativeValue is less than 0
    if (minNegativeValue < 0) {
      svg
        .append("line")
        .attr("class", "zero-line")
        .attr("x1", x(0))
        .attr("y1", 0)
        .attr("x2", x(0))
        .attr("y2", height)
        .style("stroke", "#000")
        .style("stroke-width", 1);
    }
    // Add X-axis label
    if (
      styles?.xAxis?.title?.view?.value !== false &&
      defaultStyle?.xAxis?.title?.view !== false
    ) {
      const text = xAxis
        .append("text")
        .attr("x", width / 2)
        .attr("y", adjustedBottom / 1.5)
        .style("text-anchor", "middle")
        .style(
          "fill",
          styles?.xAxis?.title?.color?.value ||
            defaultStyle?.xAxis?.title?.color
        )
        .style(
          "font-size",
          styles?.xAxis?.title?.fontSize?.value ||
            defaultStyle?.xAxis?.title?.fontSize
        )
        .style(
          "font-family",
          styles?.xAxis?.title?.fontFamily?.value ||
            defaultStyle?.xAxis?.title?.fontFamily
        )
        .text(
          styles?.xAxis?.title?.value?.value ||
            defaultStyle?.xAxis?.title?.value
        )
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
    }
    // Add Y-axis label
    const yAxis = svg.append("g").attr("class", "y-axis").call(
      d3.axisLeft(y)
    );
    yAxis
      .selectAll(".tick line")
      .style(
        "stroke",
        styles?.yAxis?.axisTick?.color?.value ||
          defaultStyle?.yAxis?.axisTick?.color
      );

    // Style the tick labels (values)
    yAxis
      .selectAll(".tick text")
      .style(
        "fill",
        styles?.yAxis?.tickLabel?.color?.value ||
          defaultStyle?.yAxis?.tickLabel?.color
      )
      .style(
        "font-family",
        styles?.yAxis?.tickLabel?.fontFamily?.value ||
          defaultStyle?.yAxis?.tickLabel?.fontFamily
      )
      .style("font-size", `${yaxistickFontSize}`)
      .text((d) => {
        const maxLabelLength = 5;
        if (d?.length > maxLabelLength) {
          return d?.substring(0, maxLabelLength) + "...";
        }
        return d;
      });
    // Style the axis line
    yAxis
      .select(".domain")
      .style(
        "stroke",
        styles?.yAxis?.axisLine?.color?.value ||
          defaultStyle?.yAxis?.axisLine?.color
      );
    if (
      styles?.yAxis?.title?.view?.value !== false &&
      defaultStyle?.yAxis?.title?.view !== false
    ) {
      const text = yAxis
        .append("text")
        .attr("transform", defaultStyle?.yAxis?.title?.transform)
        .attr("y", -width / 6)
        .attr("x", -height / 2)
        .style("text-anchor", "end")
        .style(
          "fill",
          styles?.yAxis?.title?.color?.value ||
            defaultStyle?.yAxis?.title?.color
        )
        .style(
          "font-size",
          styles?.yAxis?.title?.fontSize?.value ||
            defaultStyle?.yAxis?.title?.fontSize
        )
        .style(
          "font-family",
          styles?.yAxis?.title?.fontFamily?.value ||
            defaultStyle?.yAxis?.title?.fontFamily
        )
        .text(
          styles?.yAxis?.title?.value?.value ||
            defaultStyle?.yAxis?.title?.value
        )
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", draggedy)
            .on("end", dragended)
        );
    }
    //dragged chart title
    if (
      styles?.chartTitle?.view !== false &&
      defaultStyle?.chartTitle?.view !== false
    ) {
      const text = svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", defaultStyle?.chartTitle?.marginTop)
        .style("text-anchor", "middle")
        .style(
          "fill",
          styles?.chartTitle?.color?.value || defaultStyle?.chartTitle?.color
        )
        .style(
          "font-size",
          styles?.chartTitle?.fontSize?.value ||
            defaultStyle?.chartTitle?.fontSize
        )
        .style(
          "font-weight",
          styles?.chartTitle?.fontWeight.value ||
            defaultStyle?.chartTitle?.fontWeight
        )
        .style(
          "font-family",
          styles?.chartTitle?.fontFamily?.value ||
            defaultStyle?.chartTitle?.fontFamily
        )
        .text(
          styles?.chartTitle?.value?.value || defaultStyle?.chartTitle?.text
        )
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended)
        );
    }
  }
}

const options = {
  id: "Bar-chart",
};
drawBarChart(options);
