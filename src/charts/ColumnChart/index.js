/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-undef */
import defaultData from "./data.json";

const defaultStyle = {
  chartContainer: { width: 500, height: 400 },
  margin: { top: 50, right: 120, bottom: 80, left: 120 },
  chartColor: { backgroundColor: "#fff", fill: "steelblue" },
  delay: 100,
  duration: 500,
  backgroundImage: {
    url: "",
  },
  tooltip: {
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
    textAlign: "left",
    tooltipContainer: {
      margin: "2px",
      borderWidth: "1px",
      borderColor: "#000000",
      borderRadius: "4px",
      fontSize: "14px",
      fontFamily: "Arial",
      fill: "#ffffff",
      strokeColor: "#000000",
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
      placement: "middle",
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
    text: "column Chart Label",
    fontFamily: "Arial",
    color: "#333",
    fontSize: "16",
    fontWeight: "bold",
    marginTop: -9,
  },
  gridLine: {
    view: true,
    color: "#c7d2da",
    opacity: 0.7,
  },
  legend: {
    placement: "right",
    fontFamily: "Arial",
    color: "#333",
  },
};

export function drawColumnChart(options, propsData, styles) {
  const { width, height } = {
    width:
      styles?.chartContainer?.width?.value || defaultStyle.chartContainer.width,
    height:
      styles?.chartContainer?.height?.value ||
      defaultStyle.chartContainer.height,
  };
  // key for x and y axis
  const xKey =
    (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      Object.keys(propsData[0])[0]) ||
    "genre";
  const yKeys = (Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0]).slice(1)) || ["na_sales"];

  // calaculation for margin top, bottom, left and right for chart title, x and y axis title
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

  // data formating to draw chart
  const transformedData =
    Array.isArray(propsData) && propsData.length > 0
      ? propsData
      : defaultData.data.map((item) => ({
          genre: item.genre,
          na_sales: item.na_sales,
        }));

  // filter data according to disbale legends and legend enable keys for bar
  let disabledLegends = [];
  const filteredData = transformedData.map((item) => {
    return Object.keys(item).reduce((acc, key) => {
      if (!disabledLegends.includes(key)) {
        acc[key] = item[key];
      }
      return acc;
    }, {});
  });

  // x and y scale declaration
  const x = d3
    .scaleBand()
    .domain(
      (Array.isArray(propsData) &&
        propsData?.length > 0 &&
        propsData.some((item) => item[xKey] !== undefined) &&
        propsData.map((item) => item[xKey])) ||
        defaultData?.data?.map((e) => e?.genre)
    )
    .range([0, width])
    .padding(0.2);
  let y = d3
    .scaleLinear()
    .range([height, 0])
    .domain([
      Math.min(
        ...(
          (Array.isArray(propsData) &&
            propsData?.length > 0 &&
            yKeys?.map((yKey) => {
              return (
                Array.isArray(propsData) &&
                propsData?.length > 0 &&
                propsData.map((item) => item[yKey])
              );
            })) || [
            defaultData?.data?.map((e) => e?.na_sales),
            defaultData.data?.map((e) => e?.na_sales),
          ]
        )
          .flat()
          .map((d) => +d),
        0
      ),
      Math.max(
        ...(
          (Array.isArray(propsData) &&
            propsData?.length > 0 &&
            yKeys?.map((yKey) => {
              return (
                Array.isArray(propsData) &&
                propsData?.length > 0 &&
                propsData.map((item) => item[yKey])
              );
            })) || [defaultData?.data?.map((e) => e?.na_sales)]
        )
          .flat()
          .map((d) => +d),
        0
      ),
    ]);
  // color scale for bar
  const colors = [
    "#fa5102",
    "#4300FF",
    "#C745FF",
    "#01C5FF",
    "#00FFBD",
    "#E5F306",
    "#FED700",
    "#FF082B",
    "#00FF28",
  ];
  const colorScale = d3
    .scaleOrdinal()
    .range(colors.concat(d3.schemeCategory10));

  // legend keys
  let legendKeysSet = new Set(
    Array.isArray(yKeys) && yKeys?.length > 0
      ? yKeys
      : defaultData?.data
          ?.filter((series) => "na_sales" in series)
          .map(() => "na_sales")
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
  d3.select(`#${options.id}`).select("#multicolumntooltip").remove();
  // svg container
  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("width", width + adjustedLeft + defaultStyle.margin.right)
    .attr("height", height + adjustedTop + adjustedBottom)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor.value ||
        defaultStyle.chartColor.backgroundColor || ""
    )
     .style(
      "background-image",
      `url(${
        styles?.chartContainer?.backgroundImage?.value?.url ||
        defaultStyle?.backgroundImage?.url
      })`
    )
    .style("background-size", "cover")
    .style("background-position", "center")
    .style("background-repeat", "no-repeat")
    .append("g")
    .attr("transform", `translate(${adjustedLeft},${adjustedTop})`);

  //function for responsive chart
  function chart() {
    // function for grid lines
    function addGridLines(svg, y, width) {
      if (
        styles?.gridLine?.view?.value !== false &&
        defaultStyle?.gridLine?.view !== false
      ) {
        svg
          .append("g")
          .attr("class", "grid")
          .call(d3.axisLeft(y).tickSize(-width).tickFormat(""))
          .selectAll("line")
          .style(
            "stroke",
            styles?.gridLine?.color?.value || defaultStyle?.gridLine?.color
          )
          .style(
            "stroke-opacity",
            styles?.gridLine?.opacity?.value || defaultStyle?.gridLine?.opacity
          )
          .style("shape-rendering", "crispEdges");
      }
      svg.selectAll("path").style("stroke-width", 0);
    }
    addGridLines(svg, y, width);

    // adding tooltip
    const tooltip = d3
      .select(`#${options.id}`)
      .append("div")
      .attr("id", "multicolumntooltip")
      .style("position", defaultStyle?.tooltip?.position)
      .style("display", defaultStyle?.tooltip?.display)
      .style("text-align", defaultStyle.tooltip.textAlign)
      .style("border-style", defaultStyle?.tooltip?.borderStyle)
      .style("white-space", defaultStyle?.tooltip?.whiteSpace)
      .style("z-index", defaultStyle.tooltip.zIndex)
      .style("box-shadow", defaultStyle.tooltip.boxShadow)
      .style("transition", defaultStyle.tooltip.transition)
      .style(
        "background-color",
        styles?.tooltip.bgColor?.value ||
          defaultStyle?.tooltip?.tooltipContainer?.fill
      )
      .style(
        "border-width",
        styles?.tooltip.borderWidth?.value ||
          defaultStyle?.tooltip?.tooltipContainer?.borderWidth
      )
      .style(
        "border-color",
        styles?.tooltip.borderColor?.value ||
          defaultStyle?.tooltip?.tooltipContainer?.borderColor
      )
      .style(
        "border-radius",
        styles?.tooltip.borderRadius?.value ||
          defaultStyle?.tooltip?.tooltipContainer?.borderRadius
      )
      .style(
        "padding",
        styles?.tooltip.padding?.value || defaultStyle?.tooltip?.padding
      )
      .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
      .style("visibility", defaultStyle?.tooltip?.visibilityOnMouseOut)
      .style("opacity", defaultStyle?.tooltip?.mouseOutOpacity);

    // filtered data according to disbale legends and legend enable keys for bar position and width
    const filteredData = transformedData.map((item) => {
      return Object.keys(item).reduce((acc, key) => {
        if (!disabledLegends.includes(key)) {
          acc[key] = item[key];
        }
        return acc;
      }, {});
    });

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
      .attr("transform", (d) => `translate(${x(d[xKey]) || 0}, 0)`);

    const barWidth = x.bandwidth() / enabledLegendKeys.length;

    enabledLegendKeys.forEach((yKey, setIndex) => {
      const set =
        filteredData && Array.isArray(filteredData) && filteredData.length > 0
          ? filteredData.map((item) => item[yKey])
          : defaultData?.data?.map((e) => e?.na_sales);
      const visibleBars = svg
        .selectAll(`.bar-set-${setIndex}`)
        .data(set)
        .enter()
        .append("rect")
        .attr("class", `bar-set-${setIndex}`)
        .attr("x", (d, i) =>
          x(filteredData[i][xKey])
            ? x(filteredData[i][xKey]) + setIndex * barWidth
            : 0
        )
        .attr("width", barWidth)
        .attr("y", (d) => (y(d) ? (y(d) > y(0) ? y(d) : y(0)) : 0))
        .attr("height", (d) => (y(d) ? Math.abs(y(d) - y(0)) : 0))
        .style("fill", (d) => getColor(legendKeys.indexOf(yKey)));
      const invisibleBars = svg
        .selectAll(`.invisible-bar-${setIndex}`)
        .data(set)
        .enter()
        .append("rect")
        .attr("class", `invisible-bar-${setIndex}`)
        // .attr("x", (d, i) => x(filteredData[i][xKey]) + setIndex * barWidth)
        .attr("x", (d, i) =>
          x(filteredData[i][xKey])
            ? x(filteredData[i][xKey]) + setIndex * barWidth
            : 0
        )
        .attr("width", barWidth)
        .attr("y", 0)
        .attr("height", height)
        .style("pointer-events", "all")
        .style("fill", "none")
        .style("cursor", "pointer")
        .attr("data-index", (_, i) => i)
        .on("mouseover", function (event, d) {
          tooltip
            .transition()
            .style("opacity", defaultStyle?.tooltip?.opacity)
            .style("visibility", defaultStyle?.tooltip?.visibility);
        })
        .on("mousemove", function (event, d) {
          const currentIndex = d3.select(this).attr("data-index");
          const currentXValue = filteredData[currentIndex][xKey];
          const currentData = filteredData.filter(
            (item) => item[xKey] === currentXValue
          );
          // Get the data for the current x value
          const currentXData = currentData.filter(
            (data) => data[xKey] === currentXValue
          );

          // Generate the HTML for the tooltip
          let htmlString = `<div style="margin: ${
            defaultStyle.tooltip.tooltipContainer?.margin
          };"><div style="font-size: ${
            styles?.tooltip.fontSize?.value ||
            defaultStyle?.tooltip?.tooltipContainer?.fontSize
          }; color: ${
            styles?.tooltip.textColor?.value ||
            defaultStyle?.tooltip?.tooltipContainer?.strokeColor
          }; font-family :${
            styles?.tooltip.fontFamily?.value ||
            defaultStyle?.tooltip?.tooltipContainer?.fontFamily
          } "><strong>${currentXValue}</strong><br>`;

          currentXData.forEach((data) => {
            enabledLegendKeys.forEach((yKey) => {
              const color = getColor(legendKeys.indexOf(yKey));
              htmlString += `<span style="color: ${color}; font-size: ${
                styles?.tooltip.fontSize?.value ||
                defaultStyle?.tooltip?.tooltipContainer?.fontSize
              }; display: inline-block; width: 0.625em; height: 0.625em; border-radius: 50%; background-color: ${color}; margin-right: 0.3125em;"></span>`;
              htmlString += `${yKey} : ${data[yKey]}<br>`;
            });
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
            .style("opacity", defaultStyle?.tooltip?.mouseOutOpacity)
            .style("visibility", defaultStyle?.tooltip?.visibilityOnMouseOut);
        });

      // bar animation
      visibleBars
        .attr("y", (d) => y(0))
        .attr("height", 0)
        .transition()
        .delay((_, i) => i * defaultStyle.delay)
        .duration(defaultStyle.duration)
        .attr("y", (d) => y(Math.max(0, d)))
        // .attr("height", (d) => Math.abs(y(d) - y(0)));
        .attr("height", (d) => (d ? Math.abs(y(d) - y(0)) : 0));
    });
  }
  // function for chart update
  function updateChart(styles) {
    updateScales();
    svg.selectAll("*").remove();
    d3.select(`#${options.id}`).select("#multicolumntooltip").remove();
    if (legendKeys.length > 1) {
      legends();
    }
    chart();
    addAxes(svg, x, y, height, styles, defaultStyle);
  }
  // function for chart scale update
  function updateScales(styles) {
    const filteredData = transformedData.map((item) => {
      return Object.keys(item).reduce((acc, key) => {
        if (!disabledLegends.includes(key)) {
          acc[key] = item[key];
        }
        return acc;
      }, {});
    });
    const values = filteredData.flatMap((item) =>
      Object.values(item)
        .filter((value) => !isNaN(value))
        .map(Number)
    );
    const minValue = Math.min(...values, 0);
    const maxValue = Math.max(...values);

    y.domain([minValue, maxValue]);
    addAxes(svg, x, y, height, styles, defaultStyle);
  }

  // function for legends adding and chart update
  function legends() {
    const legendRectSize = Math.min(
      defaultStyle.chartContainer.width * 0.04,
      defaultStyle.chartContainer.height * 0.04,
      width * 0.04,
      height * 0.04
    );
    // const legendRectSize = Math.min(Math.min(defaultStyle.chartContainer.width,defaultStyle.chartContainer.height)*0.04,(width, height) * 0.04);
    const legendSpacing = legendRectSize * 0.5;
    const legendPosition = styles?.legend?.placement?.value || defaultStyle.legend.placement;
    let legendXPosition;
        legendXPosition = legendPosition === "left" ? (-defaultStyle?.margin.left): width ;
    const legend = svg
      .append("g")
      .attr("class", "legend")
    .attr("transform", `translate(${legendXPosition})`);
    legend
      .selectAll("rect")
      .data(legendKeys)
      .enter()
      .append("rect")
      .attr("x", 0)
      .attr("y", (_, i) => i * (legendRectSize + legendSpacing))
      .attr("width", legendRectSize)
      .attr("height", legendRectSize)
      .style("fill", (d, i) => getColor(i))
      .attr("data-legend", (d) => d)
      .on("click", toggleLegend);

    legend
      .selectAll("text")
      .data(legendKeys)
      .enter()
      .append("text")
      .attr("x", legendRectSize + legendSpacing)
      .attr(
        "y",
        (_, i) => i * (legendRectSize + legendSpacing) + legendRectSize / 2
      )
      .attr("dy", ".35em")
      .style("text-anchor", "start")
      // .text((d) => d)
      .text((d) => (d.length > 10 ? d.substring(0, 8) + "..." : d))
      .attr("data-legend", (d) => d)
      .style("fill", (d) =>
        disabledLegends.includes(d)
          ? "gray"
          : styles?.legend?.textColor?.value || defaultStyle.legend.color
      )
      .style(
        "font-family",
        styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily
      )
      .style("font-size", `${legendRectSize}px`)
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
    legends();
  }
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
          styles?.yAxis?.tickLabel?.fontSize.value ||
          defaultStyle?.yAxis?.tickLabel?.fontSize  || 0
        ).replace("px", "")
      ) *
        heightMultiplier +
      "px";
    const xaxisTickFontSize =
      parseFloat(
        (
          styles?.xAxis?.tickLabel?.fontSize.value ||
          defaultStyle?.xAxis?.tickLabel?.fontSize || 0
        ).replace("px", "")
      ) *
        widthMultiplier +
      "px";
    // Add X-axis
    const xAxis = svg
      .append("g")
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
        styles?.xAxis?.tickLabel?.fontFamily.value ||
          defaultStyle?.xAxis?.tickLabel?.fontFamily
      )
      .style("font-size", `${xaxisTickFontSize}`)
      .attr(
        "transform",
        `rotate (${
          styles?.xAxis?.tickLabel?.rotation?.value ||
          defaultStyle?.xAxis?.tickLable?.rotation ||
          0
        })`
      )
      .style(
        "text-anchor",
        styles?.xAxis?.tickLabel?.textAnchor?.value ||
          defaultStyle?.xAxis?.tickLabel?.placement
      )
      .text((d) => {
        const maxLabelLength = 5;
        if (d?.length > maxLabelLength) {
          return d?.substring(0, maxLabelLength) + "...";
        }
        return d;
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
    const numericValues = filteredData.flatMap((item) =>
      Object.values(item)
        .filter((value) => !isNaN(value))
        .map(Number)
    );
    const minValue = Math.min(...numericValues);

    if (minValue < 0) {
      svg
        .append("line")
        .attr("x1", 0)
        .attr("y1", y(0))
        .attr("x2", width)
        .attr("y2", y(0))
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
          styles?.xAxis?.title?.color.value || defaultStyle?.xAxis?.title?.color
        )
        .style(
          "font-size",
          styles?.xAxis?.title?.fontSize.value ||
            defaultStyle?.xAxis?.title?.fontSize
        )
        .style(
          "font-family",
          styles?.xAxis?.title?.fontFamily.value ||
            defaultStyle?.xAxis?.title?.fontFamily
        )
        .text(
          styles?.xAxis?.title?.value.value || defaultStyle?.xAxis?.title?.value
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
    const yAxis = svg.append("g").call(d3.axisLeft(y));
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
        styles?.yAxis?.tickLabel?.color.value ||
          defaultStyle?.yAxis?.tickLabel?.color
      )
      .style(
        "font-family",
        styles?.yAxis?.tickLabel?.fontFamily.value ||
          defaultStyle?.yAxis?.tickLabel?.fontFamily
      )
      .style("font-size", `${yaxistickFontSize}`)
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
    yAxis
      .select(".domain")
      .style(
        "stroke",
        styles?.yAxis?.axisLine?.color.value ||
          defaultStyle?.yAxis?.axisLine?.color
      );
    if (
      styles?.yAxis?.title?.view.value !== false &&
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
          styles?.yAxis?.title?.color.value || defaultStyle?.yAxis?.title?.color
        )
        .style(
          "font-size",
          styles?.yAxis?.title?.fontSize.value ||
            defaultStyle?.yAxis?.title?.fontSize
        )
        .style(
          "font-family",
          styles?.yAxis?.title?.fontFamily.value ||
            defaultStyle?.yAxis?.title?.fontFamily
        )
        .text(
          styles?.yAxis?.title?.value.value || defaultStyle?.yAxis?.title?.value
        )
        .call(
          d3
            .drag()
            .on("start", dragstarted)
            .on("drag", draggedy)
            .on("end", dragended)
        );
    }
    // Add Chart Title
    if (
      styles?.chartTitle?.view.value !== false &&
      defaultStyle?.chartTitle?.view !== false
    ) {
      const text = svg
        .append("text")
        .attr("x", width / 2)
        .attr("y", defaultStyle?.chartTitle?.marginTop)
        .style("text-anchor", "middle")
        .style(
          "fill",
          styles?.chartTitle?.color.value || defaultStyle?.chartTitle?.color
        )
        .style(
          "font-size",
          styles?.chartTitle?.fontSize.value ||
            defaultStyle?.chartTitle?.fontSize
        )
        .style(
          "font-weight",
          styles?.chartTitle?.fontWeight.value ||
            defaultStyle?.chartTitle?.fontWeight
        )
        .style(
          "font-family",
          styles?.chartTitle?.fontFamily.value ||
            defaultStyle?.chartTitle?.fontFamily
        )
        .text(styles?.chartTitle?.value.value || defaultStyle?.chartTitle?.text)
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
  id: "multi-line-chart",
};
drawColumnChart(options);
