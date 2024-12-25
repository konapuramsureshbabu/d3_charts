/* eslint-disable no-undef */
import defaultData from "./data.json";

const defaultStyle = {
  chartContainer: {
    width: 500,
    height: 400,
  },
  backgroundImage: {
    url: "",
  },
  axisLabels: {
    x: {
      view: true,
      text: "X Axis Label",
      fill: "#333",
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
      text: "Y Axis Label",
      fill: "#333",
      fontSize: "14px",
      transform: "rotate(-90)",
      textAnchor: "middle",
    },
  },
  chartTitle: {
    view: true,
    text: "Scatter Plot Title",
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
    left: 100,
  },
  chartColor: {
    fill: "#fa5102",
    radius: 10,
    backgroundColor: "#ffffff",
  },
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
};

// Check if data is numeric
function isNumericData(data) {
  return data.every((value) => !isNaN(value));
}

const colors=["#fa5102","#4300FF","#C745FF","#01C5FF","#00FFBD","#E5F306","#FED700","#FF082B","#00FF28"]
// Function to draw scatter plot
export function DrawScatterPlot(
  options,
  propsData,
  styles,
) {
const xKey = (propsData !==undefined && Array.isArray(propsData) && propsData?.length > 0 && Object.keys(propsData[0])[0]) ;
  const yKeys = (propsData !==undefined && Array.isArray(propsData)  && propsData?.length > 0 && Object.keys(propsData[0]).slice(1)) ;
  // Use provided data or default data
  // let categoryArray;
  // const filteredData = options?.filterValues?.filter(item => {
  //   const operator = options.filters[0];
  //   const threshold = options.filters[1];
  
  //   switch (operator) {
  //     case '>=':
  //       return item >= threshold;
  //     case '>':
  //       return item > threshold;
  //     case '<=':
  //       return item <= threshold;
  //     case '<':
  //       return   item < threshold;
  //     case '=':
  //       return item = threshold;
  //     case 'in':
  //       return  Array.isArray(item) ? item.includes(threshold) : (typeof item === 'string' && item.includes(threshold));
  //     default:
  //       return false;
  //   }
  // });

  // const uniqueFilteredData = [...new Set(filteredData)];
  //     const filterCategory =    Array.isArray(uniqueFilteredData) && uniqueFilteredData?.length > 0 &&
  //     uniqueFilteredData.some((item) => item !== undefined) && uniqueFilteredData
   

  //     const filteredValue =
  //   Array.isArray(uniqueFilteredData) && uniqueFilteredData.length > 0
  //     && uniqueFilteredData?.map((item) => Math.ceil(item))
    
  //   let filteredDataValue 
  //   let filteredCategory
  //   function isNumerics(value) {
  //     return !isNaN(parseFloat(value)) && isFinite(value);
  //   }

  
  //   if(filteredData?.length > 0 ){
  //   const allItemsNumeric = uniqueFilteredData.every((eachItem) => isNumerics(eachItem)
  //   );
  //   if(allItemsNumeric){
  //     filteredDataValue = filteredValue
  //     filteredCategory = categories
  //   }else{
  //     filteredDataValue = dataValues
  //     filteredCategory = filterCategory
  //   }
  //  }else{
  //     filteredDataValue = dataValues
  //     filteredCategory = categories
  //   }

  // Extract chart dimensions and margins from styles or use default values
  const width =
    styles?.chartContainer?.width?.value || defaultStyle?.chartContainer?.width;
  const height =
    styles?.chartContainer?.height?.value ||
    defaultStyle?.chartContainer?.height;
  const { top, right, bottom, left } = defaultStyle.margin;

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
      ? parseFloat(fontSizeX) * 1.5
      : parseFloat(fontSizeX); // Additional margin for X-axis label

  const extraMarginLeft =
    styles?.yAxis?.title?.view?.value !== false && fontSizeYChanged
      ? parseFloat(fontSizeY) * 1.5
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
      (propsData !==undefined && Array.isArray(propsData) &&
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
          ( propsData !==undefined && Array.isArray(propsData) &&
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
          .map((d) => +d),0
      ),
      Math.max(
        ...(
          (propsData !==undefined && Array.isArray(propsData) &&
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
          .map((d) => +d),0
      ),
    ])
    .range([height, 0]);

  // Remove existing SVG elements
  d3.select(`#${options.id}`).selectAll("svg").remove();

  // Create SVG container
  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("width", width + adjustedLeft + right)
    .attr("height", height + adjustedTop + adjustedBottom)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor?.value ||
        defaultStyle.chartColor.backgroundColor
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

  // Adding the grid lines
  function addGridLines(svg, yScale, width) {
    if (
      styles?.gridLine?.view?.value !== false &&
      defaultStyle?.gridLine?.view !== false
    ) {
      svg
        .append("g")
        .call(d3.axisLeft(yScale).tickSize(-width).tickFormat(""))
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

  (propsData !==undefined && Array.isArray(propsData) &&
  propsData?.length > 0 &&
  yKeys?.map((yKey, setIndex) => {
    const set = Array.isArray(propsData) &&
      propsData?.length > 0 &&
      propsData.some((item) => item[xKey] !== undefined) &&
      propsData.map((item) => item[yKey]);

    svg
      .selectAll(`.circle-set-scatter-${setIndex}`)
      .data(set)
      .enter()
      .append("circle")
      .attr("class", `circle-set-scatter-${setIndex}`)
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
      .attr("r", 5)
      .attr("data-index-scatter", (d, i) => i)
      .style("cursor", "pointer")
      .style("fill", colorScale(setIndex)) 
      .style("stroke", colorScale(setIndex))
      .style("stroke-width", 1)
      .on("mouseover", function () {
        tooltip
          .transition()
          .style("opacity", defaultStyle?.tooltip?.opacity)
          .style("visibility", defaultStyle?.tooltip?.visibility);
      })
      .on("mousemove", function (event, d) {
        const currentIdex = d3.select(this).attr("data-index-scatter");
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
            (propsData !==undefined && Array.isArray(propsData) &&
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
  }));



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
    (propsData !==undefined && Array.isArray(propsData) &&
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
      .selectAll(`.circle-set-scatter-${setIndex}`)
      .data(set)
      .enter()
      .append("circle")
      .attr("class", `circle-set-scatter-${setIndex}`)
      .attr(
        "cx",
        (d, i) =>
          xScale(
            (propsData !==undefined && Array.isArray(propsData) &&
              propsData?.length > 0 &&
              propsData.some((item) => item[xKey] !== undefined) &&
              propsData.map((item) => item[xKey])[i]) ||
              defaultData?.data?.map((e) => e?.genre)[i]
          ) +
          xScale.bandwidth() / 2
      )
      .attr("cy", (d) => yScale(d))
      .attr("r", 5)
      .attr("data-index-scatter", (d, i) => i)
      .style("fill", colorScale(setIndex)) 
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
        const currentIdex = d3.select(this).attr("data-index-scatter");
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
            (propsData !==undefined && Array.isArray(propsData) &&
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

    function zoomed(event) {

      const new_xScale = isNumericData((propsData !==undefined && Array.isArray(propsData)  && propsData?.length > 0 &&  propsData.some((item)=>item[xKey]!==undefined)&& propsData.map((item) => item[xKey])[i]) || defaultData?.data?.map((e) => e?.genre))
      ? event.transform.rescaleX(xScale)
      : d3.scaleBand().domain(( propsData !==undefined &&Array.isArray(propsData)  && propsData?.length > 0 &&  propsData.some((item)=>item[xKey]!==undefined)&& propsData.map((item) => item[xKey])[i]) || defaultData?.data?.map((e) => e?.genre)).range([event.transform.applyX(0), event.transform.applyX(width)]);
      const new_yScale = event.transform.rescaleY(yScale);
    // console.log('xSca', new_xScale)
    const yMax = d3.max(((propsData !==undefined && Array.isArray(propsData)  && propsData?.length > 0 && yKeys?.map((yKey) => {
      return (propsData !==undefined && Array.isArray(propsData)  && propsData?.length > 0 &&  propsData.some((item)=>item[xKey]!==undefined) && propsData.map((item) => item[yKey]));
    })) ||  [defaultData?.data?.map((e) => e?.na_sales)]).flat().map((d) => +d));
    const yMin = 0; // Assuming the baseline is at zero
    
    // Define or update the y-axis scale domain
    new_yScale.domain([yMin, yMax]);
      xAxis.call(d3.axisBottom(new_xScale));
      yAxis.call(d3.axisLeft(new_yScale));  
      svg.selectAll("circle")
          .attr("cx", (d, i) => {
              const cx = new_xScale((propsData !==undefined && Array.isArray(propsData)  && propsData?.length > 0 &&  propsData.some((item)=>item[xKey]!==undefined)&& propsData.map((item) => item[xKey])[i]) || defaultData?.data?.map((e) => e?.genre)[i]) + new_xScale.bandwidth() / 2;
              return cx >= 0 && cx <= width ? cx : -1000; // Move circles off-screen if outside visible bounds
          })
          .attr("cy", (d) => yScale(d));
   
  
   // Update brush position:
   const brushSelection = new_xScale.range().map(event.transform.invertX, event.transform);
   brush.move(d3.select(".brush").transition().duration(50), brushSelection);
    }
    
  
      const zoom = d3.zoom()
    .scaleExtent([1, Infinity])
    .translateExtent([[0, 0], [width, height + adjustedBottom]])
    .extent([[0, 0], [width, height + adjustedBottom]])
    .on("zoom", zoomed);
  
   
   function brushended(event) {
    const selection = event.selection;
    if (event.sourceEvent && selection) {
      const x0 = selection[0];
      const x1 = selection[1];
  
      // Update the xScale domain based on pixel values
      xScale.domain([xScale.invert(x0), xScale.invert(x1)]);
  
      // Update the x-axis
      xAxis.call(d3.axisBottom(xScale));
  
      // Zoom to the selected range
      svg.call(zoom.transform, d3.zoomIdentity.scale(width / (x1 - x0)).translate(-x0, 0));
      // d3.select(".brush").call(brush.move, [x0, x1]);
    }
  }

    const brush = d3.brushX()
    .extent([[0, 0], [width, 50]])
    .on("end", brushended);

  // X-axis label
  const xAxis = svg
    .append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(xScale))
    .call(brush)
    .call(zoom);

  // Check if X-axis labels should be displayed
  if (
    styles?.xAxis?.title?.view?.value !== false &&
    defaultStyle?.axisLabels?.x?.view !== false
  ) {
    // Add X-axis label text
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

    // Add color to the tick text
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

  // Y-axis label
  const yAxis = svg.append("g").call(d3.axisLeft(yScale));

  // Check if Y-axis labels should be displayed
  if (
    styles?.yAxis?.title?.view?.value !== false &&
    defaultStyle?.axisLabels?.y?.view !== false
  ) {
    // Add Y-axis label text
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

  // Chart Title
  if (
    styles?.chartTitle?.view?.value !== false &&
    defaultStyle?.chartTitle?.view !== false
  ) {
    // Add chart title text
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


   //const yKey = event.currentTarget.textContent;
   function handleLegendClick(d) {
    // Toggle visibility of the corresponding y-value when legend is clicked
    const visibility = d3.select(this).classed("hidden") ? "visible" : "hidden";
    d3.select(this).classed("hidden", !d3.select(this).classed("hidden"));
    toggleYValueVisibility(d, visibility);
  }

  // Create legends based on yKeys
  if(yKeys.length>1){
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
  
  }
  function toggleYValueVisibility(event, visibility) {
    const yKey = event.currentTarget.textContent;
    const index = yKeys.indexOf(yKey);

    if (index !== -1) {
      const areaSelector = `.area-set-${index}`;
      const circleSelector = `.circle-set-scatter-${index}`;
      const legendTextSelector = `.legend-text-${index}`;
      const legendRectSelector = `.legend-rect-${index}`;
      const legendTextElement = svg.select(legendTextSelector);
      const legendRectElement = svg.select(legendRectSelector);

      // Check if the legend is currently visible or hidden
      const isVisible = legendTextElement.style("opacity") === "1";
      const isRectVissible=legendRectElement.style("opacity") === "1";
      legendTextElement.style("opacity", isVisible ? 0.5 : 1);
      legendRectElement.style("opacity",isRectVissible ? 0.5 :1)
      svg
        .selectAll(areaSelector)
        .style("display", visibility === "visible" ? "block" : "none");
      svg
        .selectAll(circleSelector)
        .style("display", visibility === "visible" ? "block" : "none");
    }
  } 
}

// Call the function to draw the scatter plot
// DrawScatterPlot("scatter-plot");
