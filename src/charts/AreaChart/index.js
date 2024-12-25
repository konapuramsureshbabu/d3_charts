/* eslint-disable no-unsafe-optional-chaining */
/* eslint-disable no-undef */
import defaultData from "./data.json";

const defaultStyle = {
  chartContainer: {
    width: 500,
    height: 500,
  },
  backgroundImage: {
    url: "",
  },
  axisLabels: {
    x: {
      view: true,
      text: "X-Axis-Label",
      fill: "#333333",
      fontSize: "14px",
      tickLabelOrientation: "rotate(0)",
      textAnchor: "middle",
      fontFamily: "Arial",
      tickLabelFontSize: "12px",
      tickLabelFontFamily: "Arial",
      tickLabelColor: "#000000",
      axisLineColor: "#333333",
      axisTickColor: "#000000",
    },
    y: {
      view: true,
      text: "Y-Axis-Label",
      fill: "#333333",
      fontSize: "14px",
      transform: "rotate(-90)",
      textAnchor: "middle",
      fontFamily: "Arial",
      tickLabelColor: "#000000",
      tickLabelFontSize: "12px",
      tickLabelFontFamily: "Arial",
      axisLineColor: "#333333",
      axisTickColor: "#000000",
    },
  },
  chartTitle: {
    view: true,
    text: "Area Chart title",
    fill: "#333333",
    fontSize: "16px",
    marginTop: -30,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  margin: {
    top: 50,
    right: 100,
    bottom: 60,
    left: 120,
  },
  chartColor: {
    area: { fill: "#fa5102" },
    backgroundColor: "#ffffff",
    line: { fill: "#ffc926", strokeColor: "#fa5102", strokeWidth: "2px" },
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
      borderColor: "#000000",
      borderRadius: "4px",
      fontSize: "14px",
      fontFamily: "Arial",
      fill: "#ffffff",
      strokeColor: "#000000",
    },
  },
  gridLine: {
    view: true,
    color: "#c7d2da",
    opacity: 0.7,
    strokeWidth: 0,
  },
  legend: {
    position: "right",
    fontFamily: "Arial",
    color: "#333",
    fontWeight: "normal",
  },
  brush: {
    fill: "#666",
    fillOpacity: 0.8,
    stroke: "#000",
    strokeWidth: 1,
    cursor: "ew-resize",
  },

};

// Check if data is numeric

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

// Function to draw an area chart
export function DrawAreaChart(options, propsData, styles) {
  const xKey =
    Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0])[0];
  const yKeys =
    Array.isArray(propsData) &&
    propsData?.length > 0 &&
    Object.keys(propsData[0]).slice(1);
  // Extract chart dimensions and margins from styles or use default values
  const width =
    styles?.chartContainer?.width?.value || defaultStyle?.chartContainer?.width;
  const height =
    styles?.chartContainer?.height?.value ||
    defaultStyle?.chartContainer?.height;
  const { top, right, bottom, left } = defaultStyle?.margin;

  // Calculate additional margin based on font sizes
  const fontSizeX =
    styles?.xAxis?.title?.fontSize?.value ||
    defaultStyle?.axisLabels?.x?.fontSize;
  const fontSizeY =
    styles?.yAxis?.title?.fontSize?.value ||
    defaultStyle?.axisLabels?.y?.fontSize;
  const fontSizeTitle =
    styles?.chartTitle?.fontSize?.value || defaultStyle?.chartTitle?.fontSize;

  // Check if font sizes have changed
  const fontSizeXChanged = fontSizeX !== defaultStyle?.axisLabels?.x?.fontSize;
  const fontSizeYChanged = fontSizeY !== defaultStyle?.axisLabels?.y?.fontSize;
  const fontSizeTitleChanged =
    fontSizeTitle !== defaultStyle?.chartTitle?.fontSize;

  // Calculate additional margin based on font sizes
  const extraMarginTop =
    styles?.chartTitle?.view?.value !== false && fontSizeTitleChanged
      ? parseFloat(fontSizeTitle) * 1.5
      : parseFloat(fontSizeTitle); // Additional margin for chart title

  const extraMarginBottom =
    styles?.xAxis?.title?.view?.value !== false && fontSizeXChanged
      ? parseFloat(fontSizeX) * 2.5
      : parseFloat(fontSizeX); // Additional margin for X-axis label

  const extraMarginLeft =
    styles?.yAxis?.title?.view?.value !== false && fontSizeYChanged
      ? parseFloat(fontSizeY) * 0.5
      : parseFloat(fontSizeY); // Additional margin for Y-axis label

  // Update margins based on extra margins
  const adjustedTop = top + extraMarginTop;
  const adjustedBottom = bottom + extraMarginBottom;
  const adjustedLeft = left + extraMarginLeft;

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

  const xScale = d3
    .scaleBand()
    .domain(
      (Array.isArray(propsData) &&
        propsData?.length > 0 &&
        propsData.some((item) => item[xKey] !== undefined) &&
        propsData.map((item) => item[xKey])) ||
        defaultData?.data?.map((e) => e?.genre)
    )
    .range([0, width])
    .padding(0.1);

  xScale.range([0, width - xScale.bandwidth()]);

  const yScale = d3
    .scaleLinear()
    .domain([
      Math.min(
        ...(
          (Array.isArray(propsData) &&
            propsData?.length > 0 &&
            yKeys?.map((yKey) => {
              return (
                Array.isArray(propsData) &&
                propsData?.length > 0 &&
                propsData.some((item) => item[xKey] !== undefined) &&
                propsData.map((item) => item[yKey])
              );
            })) || [defaultData?.data?.map((e) => e?.na_sales)]
        )
          .flat()
          .map((d) => +d),
        0
      ),
      Math.max(
        ...(
          (Array.isArray(propsData) &&
            propsData?.length > 0 &&
            propsData.some((item) => item[xKey] !== undefined) &&
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
    ])
    .range([height, 0]);

  const area = d3
    .area()
    .x(
      (d, i) =>
        xScale(
          (Array.isArray(propsData) &&
            propsData?.length > 0 &&
            propsData.some((item) => item[xKey] !== undefined) &&
            propsData.map((item) => item[xKey])[i]) ||
            defaultData?.data?.map((e) => e?.genre)[i]
        ) +
        xScale.bandwidth() / 2
    )
    .y0(height)
    .y1((d) => yScale(d));

  d3.select(`#${options.id}`).selectAll("svg").remove();

  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("width", width + adjustedLeft + right)
    .attr("height", 628)
    // .attr("height", height + adjustedTop + adjustedBottom)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor?.value ||
        defaultStyle.chartColor.backgroundColor ||
        ""
    )
    .style(
      "background-image",
      `url(${
        styles?.chartContainer?.backgroundImage?.value?.url ||
        defaultStyle?.backgroundImage?.url
      })`
    )
    // .style("background-image", `url("src/charts/ColumnChart/Public/images/ColumnChartImage.png")`)
    .style("background-size", "cover")
    .style("background-position", "center")
    .style("background-repeat", "no-repeat")
    .append("g")
    .attr("transform", `translate(${adjustedLeft},${adjustedTop})`);

  // Adding the grid lines
  function addGridLines(svg, yScale, width) {
    if (
      styles?.gridLine?.view?.value !== false &&
      defaultStyle?.gridLine?.view !== false
    ) {
      svg
        .append("g")
        .call(
          d3
            .axisLeft(yScale)
            .tickSize(-(width - xScale?.bandwidth()))
            .tickFormat("")
        )
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
    svg
      .selectAll("path")
      .style("stroke-width", defaultStyle.gridLine.strokeWidth);
  }
  addGridLines(svg, yScale, width);

  const colorScale = d3.scaleOrdinal(colors);
  (
    (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      yKeys?.map((yKey) => {
        return (
          Array.isArray(propsData) &&
          propsData?.length > 0 &&
          propsData.some((item) => item[xKey] !== undefined) &&
          propsData.map((item) => item[yKey])
        );
      })) || [defaultData?.data?.map((e) => e?.na_sales)]
  ).forEach((set, setIndex) => {
    svg
      .append("path")
      .attr("class", `area area-set-${setIndex}`)
      .attr("d", area(set))
      .attr("fill", colorScale(setIndex));
  });

  // Adding the tooltip
  const tooltip = d3
    .select(`#${options.id}`)
    .append("div")
    .style("position", defaultStyle?.tooltip?.position)
    .style("display", defaultStyle?.tooltip?.display)
    .style("border-style", defaultStyle?.tooltip?.borderStyle)
    .style("white-space", defaultStyle?.tooltip?.whiteSpace)
    .style("z-index", defaultStyle?.tooltip?.zIndex)
    .style("box-shadow", defaultStyle?.tooltip?.boxShadow)
    .style("transition", defaultStyle?.tooltip?.transition)
    .style(
      "background-color",
      styles?.tooltip.bgColor?.value ||
        defaultStyle?.tooltip?.tooltipContainer?.fill
    )
    .style(
      "border-width",
      styles?.tooltip?.borderWidth?.value ||
        defaultStyle?.tooltip?.tooltipContainer?.borderWidth
    )
    .style(
      "border-color",
      styles?.tooltip?.borderColor?.value ||
        defaultStyle?.tooltip?.tooltipContainer?.borderColor
    )
    .style(
      "font-family",
      styles?.tooltip?.fontFamily?.value ||
        defaultStyle?.tooltip?.tooltipContainer?.fontFamily
    )
    .style(
      "border-radius",
      styles?.tooltip?.borderRadius?.value ||
        defaultStyle?.tooltip?.tooltipContainer?.borderRadius
    )
    .style(
      "padding",
      styles?.tooltip?.padding?.value || defaultStyle?.tooltip?.padding
    )
    .style("pointer-events", defaultStyle?.tooltip?.pointerEvents)
    .style("visibility", defaultStyle?.tooltip?.visibilityOnMouseOut)
    .style("opacity", defaultStyle?.tooltip?.opacity);

  (
    (Array.isArray(propsData) &&
      propsData?.length > 0 &&
      yKeys?.map((yKey) => {
        return (
          Array.isArray(propsData) &&
          propsData?.length > 0 &&
          propsData.some((item) => item[xKey] !== undefined) &&
          propsData.map((item) => item[yKey])
        );
      })) || [defaultData?.data?.map((e) => e?.na_sales)]
  ).forEach((set, setIndex) => {
    svg
      .selectAll(`.circle-set-${setIndex}`)
      .data(set)
      .enter()
      .append("circle")
      .attr("class", `circle-set-${setIndex}`)
      .attr(
        "cx",
        (d, i) =>
          xScale(
            (Array.isArray(propsData) &&
              propsData?.length > 0 &&
              propsData.some((item) => item[xKey] !== undefined) &&
              propsData.map((item) => item[xKey])[i]) ||
              defaultData?.data?.map((e) => e?.genre)[i]
          ) +
          xScale.bandwidth() / 2
      )
      .attr("cy", (d) => yScale(d))
      .attr("r", 3)
      .attr("data-index", (d, i) => i)
      .style("fill", "white")
      .style("cursor", "pointer")
      .style(
        "stroke",
        styles?.chartColor?.fill?.value || defaultStyle?.chartColor?.area?.fill
      )
      .style("stroke-width", 1)
      .on("mouseover", function () {
        tooltip
          .transition()
          .style("opacity", defaultStyle?.tooltip?.opacity)
          .style("visibility", defaultStyle?.tooltip?.visibility);
      })
      .on("mousemove", function (event, d) {
        const currentIdex = d3.select(this).attr("data-index");
        tooltip
          .html(
            `<div>
          <div style="font-size: ${
            styles?.tooltip?.fontSize?.value ||
            defaultStyle?.tooltip?.tooltipContainer?.fontSize
          };
          color: ${
            styles?.tooltip.textColor?.value ||
            defaultStyle?.tooltip?.tooltipContainer?.strokeColor
          }; ">
          ${
            (Array.isArray(propsData) &&
              propsData?.length > 0 &&
              propsData.some((item) => item[xKey] !== undefined) &&
              propsData.map((item) => item[xKey])[currentIdex]) ||
            defaultData?.data?.map((e) => e?.genre)[currentIdex]
          } : ${d}
          </div>
        </div>`
          )
          .style("left", event.pageX + "px")
          .style("top", event.pageY - 28 + "px");
      })
      .on("mouseout", function () {
        tooltip
          .transition()
          .style("opacity", defaultStyle?.tooltip?.mouseOutOpacity)
          .style("visibility", defaultStyle?.tooltip?.visibilityOnMouseOut);
      });
  });
  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  // Add X-axis label
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    // .attr("class", "brush")
    // .call(brush)
    .attr("clip-path", "url(#clip)");
  // .call(zoom);

  if (
    styles?.xAxis?.title?.view?.value !== false &&
    defaultStyle?.xAxis?.title?.view !== false
  ) {
    xAxis
      .append("text")
      .attr("x", width / 2)
      .attr("y", adjustedBottom / 1.5)
      .style("text-anchor", "middle")
      .style(
        "fill",
        styles?.xAxis?.title?.color?.value || defaultStyle?.axisLabels?.x?.fill
      )
      .style(
        "font-size",
        styles?.xAxis?.title?.fontSize?.value ||
          defaultStyle?.axisLabels?.x?.fontSize
      )
      .style(
        "font-family",
        styles?.xAxis?.title?.fontFamily?.value ||
          defaultStyle?.axisLabels?.x?.fontFamily
      )

      .text(
        styles?.xAxis?.title?.value?.value || defaultStyle?.axisLabels?.x?.text
      )
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );

    // Add color to the axis line
    xAxis
      .selectAll("path")
      .style(
        "stroke",
        styles?.xAxis?.axisLine?.color?.value ||
          defaultStyle?.axisLabels?.x?.axisLineColor
      );

    // Add color to the ticks
    xAxis
      .selectAll(".tick line")
      .style(
        "stroke",
        styles?.xAxis?.axisTick?.color?.value ||
          defaultStyle?.axisLabels?.x?.axisTickColor
      );

    xAxis
      .selectAll(".tick text")
      .style(
        "fill",
        styles?.xAxis?.tickLabel?.color?.value ||
          defaultStyle?.axisLabels?.x?.tickLabelColor
      )
      .attr(
        "transform",
        `rotate (${
          styles?.xAxis?.tickLabel?.rotation?.value ||
          defaultStyle?.xAxis?.tickLable?.rotation ||
          0
        })`
      )
      .style(
        "font-size",
        styles?.xAxis?.tickLabel?.fontSize?.value ||
          defaultStyle?.axisLabels?.x?.tickLabelFontSize
      )
      .style(
        "font-family",
        styles?.xAxis?.tickLabel?.fontFamily?.value ||
          defaultStyle?.axisLabels?.x?.tickLabelFontFamily
      )
      .style(
        "text-anchor",
        styles?.xAxis?.tickLabel?.textAnchor?.value ||
          defaultStyle?.axisLabels?.x?.textAnchor
      );
  }

  // Add Y-axis label
  const yAxis = svg.append("g").call(d3.axisLeft(yScale));

  if (
    styles?.yAxis?.title?.view?.value !== false &&
    defaultStyle?.axisLabels?.y?.view !== false
  ) {
    yAxis
      .append("text")
      .attr("transform", defaultStyle?.axisLabels?.y?.transform)
      .attr("y", -width / 10)
      .attr("x", -height / 2)
      .style("text-anchor", defaultStyle?.axisLabels?.y?.textAnchor)
      .style(
        "fill",
        styles?.yAxis?.title?.color?.value || defaultStyle?.axisLabels?.y?.fill
      )
      .style(
        "font-size",
        styles?.yAxis?.title?.fontSize?.value ||
          defaultStyle?.axisLabels?.y?.fontSize
      )
      .style(
        "font-family",
        styles?.yAxis?.title?.fontFamily?.value ||
          defaultStyle?.axisLabels?.y?.fontFamily
      )
      .text(
        styles?.yAxis?.title?.value?.value || defaultStyle?.axisLabels?.y?.text
      )
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", draggedy)
          .on("end", dragended)
      );
    // Add color to the axis line
    yAxis
      .selectAll("path")
      .style(
        "stroke",
        styles?.yAxis?.axisLine?.color?.value ||
          defaultStyle?.axisLabels?.y?.axisLineColor
      );

    // Add color to the ticks
    yAxis
      .selectAll(".tick line")
      .style(
        "stroke",
        styles?.yAxis?.axisTick?.color?.value ||
          defaultStyle?.axisLabels?.y?.axisTickColor
      );

    // Add color to the tick text
    yAxis
      .selectAll(".tick text")
      .attr("dx", "-1em")
      .style(
        "fill",
        styles?.yAxis?.tickLabel?.color?.value ||
          defaultStyle?.axisLabels?.y?.tickLabelColor
      )
      .style(
        "font-size",
        styles?.yAxis?.tickLabel?.fontSize?.value ||
          defaultStyle?.axisLabels?.y?.tickLabelFontSize
      )
      .style(
        "font-family",
        styles?.yAxis?.tickLabel?.fontFamily?.value ||
          defaultStyle?.axisLabels?.y?.tickLabelFontFamily
      )
      .style(
        "text-anchor",
        styles?.yAxis?.tickLabel?.textAnchor?.value ||
          defaultStyle?.axisLabels?.y?.textAnchor
      );
  }

  // Add Chart title
  if (
    styles?.chartTitle?.view?.value !== false &&
    defaultStyle?.chartTitle?.view !== false
  ) {
    svg
      .append("text")
      .attr("x", width / 2)
      .attr("y", defaultStyle?.chartTitle?.marginTop)
      .style("text-anchor", "middle")
      .style(
        "fill",
        styles?.chartTitle?.color?.value || defaultStyle?.chartTitle?.fill
      )
      .style(
        "font-size",
        styles?.chartTitle?.fontSize?.value ||
          defaultStyle?.chartTitle?.fontSize
      )
      .style(
        "font-weight",
        styles?.chartTitle?.fontWeight?.value ||
          defaultStyle?.chartTitle?.fontWeight
      )
      .style(
        "font-family",
        styles?.chartTitle?.fontFamily?.value ||
          defaultStyle?.chartTitle?.fontFamily
      )
      .text(styles?.chartTitle?.value?.value || defaultStyle?.chartTitle?.text)
      .call(
        d3
          .drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended)
      );
  }

  function areaGenerator(data, xdata, new_xScale) {
    const area = d3
      .area()
      .x((d, i) => new_xScale(xdata[i]) + new_xScale.bandwidth() / 2) // Assuming x property in data
      .y0(yScale(0))
      .y1((d) => yScale(d)); // Assuming y property in data

    return area(data);
  }

  svg
    .append("defs")
    .append("clipPath")
    .attr("id", "clip")
    .append("rect")
    .attr("width", width)
    .attr("height", height);

  const brush = d3
    .brushX()
    .extent([
      [0, 0],
      [width, 50],
    ])
    .on("start brush end", brushed)
    .on("end.snap", brushended);

  const barGroup = svg.append("g").attr("transform", `translate(0, 520)`);
  const barHeight = 50;

  // const zoom = d3.zoom()
  // .scaleExtent([1, 8])
  // .on("zoom", zoomed);

  // function zoomed(event) {
  //   const new_xScale = event.transform.rescaleX(xScale);
  //   xAxis.call(d3.axisBottom(new_xScale));

  //   // Update areas
  //   yKeys.forEach((yKey, setIndex) => {
  //     const areaData = dataRange.map(item => item[yKey]);

  //     svg.select(`.area-set-${setIndex}`)
  //       .attr("d", areaGenerator(areaData, xValues, new_xScale))
  //       .attr("clip-path", "url(#clip)");
  //   });

  //   // Update circles
  //   updateCircles(dataRange, xValues, new_xScale);

  //   // Update visible bars
  //   const visibleBars = bar.data(new_xScale.domain());
  //   visibleBars
  //     .attr("x", d => new_xScale(d) - new_xScale.step() / 2)
  //     .attr("width", new_xScale.step());
  // }

  const brushG = svg.append("g").call(brush);
  const bar = barGroup
    .append("g")
    .attr("fill", "#FFF8C5")
    .selectAll("rect")
    .data(xScale.domain())
    .join("rect")
    .attr("x", (d) => xScale(d) - xScale.step() / 2)
    .attr("y", 0)
    .attr("height", xScale.bandwidth())
    .attr("width", xScale.step());

  svg
    .append("g")

    .attr("font-family", "var(--sans-serif)")
    .attr("transform", `translate(-15,${height + barHeight / 2})`)
    .selectAll("text")

    .data(xScale.domain())
    .join("text")
    .attr("x", (d) => xScale(d))
    .attr("dy", "7.3em")

    .text((d) => d);

  brushG.attr("transform", `translate(0, ${520})`);

  brushG.select(".selection").style("display", "initial");

  // svg.call(zoom);

  brush.extent([
    [0, 0],
    [width, 50],
  ]);
  brush(brushG);

  function updateCircles(dataRange, xValues, new_xScale) {
    // Remove existing circles
    svg.selectAll("circle").remove();

    // Add circles for each yKey
    yKeys.forEach((yKey, setIndex) => {
      const areaData = dataRange.map((item) => item[yKey]);

      svg
        .selectAll(`.circle-set-${setIndex}`)
        .data(areaData)
        .enter()
        .append("circle")
        .attr("class", `circle-set-${setIndex}`)
        .attr(
          "cx",
          (d, i) => new_xScale(xValues[i]) + new_xScale.bandwidth() / 2
        )
        .attr("cy", (d) => yScale(d))
        .attr("r", 3)
        .style("fill", "white")
        .style(
          "stroke",
          styles?.chartColor?.fill?.value ||
            defaultStyle?.chartColor?.area?.fill
        )
        .style("stroke-width", 1)
        .attr("data-index", (d, i) => i)
        .on("mouseover", function (event, d) {
          const currentIdex = d3.select(this).attr("data-index");
          const currentXValue = xValues[currentIdex];

          tooltip
            .transition()
            .style("opacity", defaultStyle?.tooltip?.opacity)
            .style("visibility", defaultStyle?.tooltip?.visibility);

          tooltip
            .html(
              `<div>
              <div style="font-size: ${
                styles?.tooltip?.fontSize?.value ||
                defaultStyle?.tooltip?.tooltipContainer?.fontSize
              };
                          color: ${
                            styles?.tooltip.textColor?.value ||
                            defaultStyle?.tooltip?.tooltipContainer?.strokeColor
                          }; ">
                ${currentXValue}: ${d}
              </div>
            </div>`
            )
            .style("left", event.pageX + "px")
            .style("top", event.pageY - 28 + "px");
        })
        .on("mouseout", function () {
          tooltip
            .transition()
            .style("opacity", defaultStyle?.tooltip?.mouseOutOpacity)
            .style("visibility", defaultStyle?.tooltip?.visibilityOnMouseOut);
        });
    });
  }

  function updateZoom(dataRange) {
    const xValues = dataRange.map((item) => item[xKey]);
    const new_xScale = d3
      .scaleBand()
      .domain(xValues)
      .range([0, width])
      .padding(0.1);
    xAxis.call(d3.axisBottom(new_xScale));

    // Update areas
    yKeys.forEach((yKey, setIndex) => {
      const areaData = dataRange.map((item) => item[yKey]);

      svg
        .select(`.area-set-${setIndex}`)
        .attr("d", areaGenerator(areaData, xValues, new_xScale))
        .attr("clip-path", "url(#clip)");
    });

    // Update circles
    updateCircles(dataRange, xValues, new_xScale);
  }

  function brushed({ selection }) {
    if (selection) {
      const range = xScale.domain().map(xScale);
      const i0 = d3.bisectRight(range, selection[0]);
      const i1 = d3.bisectRight(range, selection[1]);
      bar.attr("fill", (d, i) => (i0 <= i && i < i1 ? "orange" : null));
      const textSelection = xScale.domain().slice(i0, i1);
      const dataRange = propsData.filter((d) =>
        textSelection.includes(d[xKey])
      );
      // Update the zoom based on the data range
      updateZoom(dataRange);
      // svg.property("value", xScale.domain().slice(i0, i1)).dispatch("input");
    } else {
      bar.attr("fill", null);
      svg.property("value", []).dispatch("input");
    }
  }

  function brushended({ selection, sourceEvent }) {
    if (!sourceEvent || !selection) return;
    const range = xScale.domain().map(xScale),
      dx = xScale.step() / 2;
    const x0 = range[d3.bisectRight(range, selection[0])] - dx;
    const x1 = range[d3.bisectRight(range, selection[1]) - 1] + dx;
    d3.select(this)
      .transition()
      .call(brush.move, x1 > x0 ? [x0, x1] : null);
    // xScale.domain(xScale.domain().slice(d3.bisectRight(range, selection[0]), d3.bisectRight(range, selection[1])));

    const textSelection = xScale
      .domain()
      .slice(
        d3.bisectRight(range, selection[0]),
        d3.bisectRight(range, selection[1])
      );
    const dataRange = propsData.filter((d) => textSelection.includes(d[xKey]));

    updateZoom(dataRange);
  }

  //const yKey = event.currentTarget.textContent;
  function handleLegendClick(d) {
    // Toggle visibility of the corresponding y-value when legend is clicked
    const visibility = d3.select(this).classed("hidden") ? "visible" : "hidden";
    d3.select(this).classed("hidden", !d3.select(this).classed("hidden"));
    toggleYValueVisibility(d, visibility);
  }

  // Create legends based on yKeys
  if (yKeys.length > 1) {
    const legendPosition = styles?.legend?.placement?.value || defaultStyle.legend.position;
    let legendXPosition;
        legendXPosition = legendPosition === "left" ? -100 :width ;
        const legend = svg
        .selectAll(".legend")
        .data(yKeys)
        .enter()
        .append("g")
        .attr("class", "legend")
        .attr("transform", `translate(${legendXPosition})`)
        .attr("transform", (_, i) => `translate(0,${i * 20})`)
        .style("cursor", "pointer")
        // .attr("transform", `translate(${legendXPosition})`)
        .on("click", handleLegendClick);

      legend
        .append("rect")
        .attr("x", legendXPosition-20)
        .attr("width", 18)
        .attr("height", 18)
        .attr("class", (_, i) => `legend-rect-${i}`)
        .style("fill", (_, i) => colorScale(i));
      
      legend
        .append("text")
        .attr("class", (_, i) => `legend-text legend-text-${i}`)
        .style(
          "font-family",
          styles?.legend?.fontFamily?.value || defaultStyle.legend.fontFamily
        )
        .style(
          "fill",
          styles?.legend?.textColor?.value || defaultStyle.legend.color
        )
        .attr("x", legendXPosition + 5)
        .attr("y", 9)
        .attr("dy", ".35em")
        .style("text-anchor", styles?.legend?.placement?.value || defaultStyle.legend.position)
        .text((d) => d);

    // Function to toggle visibility of y-values
  }
  function toggleYValueVisibility(event, visibility) {
    const yKey = event.currentTarget.textContent;
    const index = yKeys.indexOf(yKey);

    if (index !== -1) {
      const areaSelector = `.area-set-${index}`;
      const circleSelector = `.circle-set-${index}`;
      const legendTextSelector = `.legend-text-${index}`;
      const legendRectSelector = `.legend-rect-${index}`;
      const legendTextElement = svg.select(legendTextSelector);
      const legendRectElement = svg.select(legendRectSelector);

      // Check if the legend is currently visible or hidden
      const isVisible = legendTextElement.style("opacity") === "1";
      const isRectVissible = legendRectElement.style("opacity") === "1";
      legendTextElement.style("opacity", isVisible ? 0.5 : 1);
      legendRectElement.style("opacity", isRectVissible ? 0.5 : 1);
      svg
        .selectAll(areaSelector)
        .style("display", visibility === "visible" ? "block" : "none");
      svg
        .selectAll(circleSelector)
        .style("display", visibility === "visible" ? "block" : "none");
    }
  }
}
