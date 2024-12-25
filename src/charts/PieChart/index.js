/* eslint-disable no-undef */
import defaultData from "./data.json";

export function DrawPieChart(
  // PieChartId,
  options,
  propsData,
  styles
  // pieChartDimensions,
  // pieChartMeasures
) {
  // console.log(options.dimension, options.measures, "options");
  // console.log('pichartt',pieChartDimensions,pieChartMeasures);
  // console.log("pieChartDimensionsss", propsData);
  // const isValidData = propsData?.data?.every(item => {
  //     return typeof item.name === 'string' && typeof item.value === 'string';
  // });
  // if (isValidData == false) {
  //     alert("Please give valid data.");
  //     return;
  // }
  const defaultValues = {
    chartContainer: {
      width: 1050,
      height: 450,
    },
    margin: {
      top: 40,
      right: 50,
      bottom: 60,
      left: 70,
    },
    charts: { opacity: 0.9, visibility: "visible" },
    line: { fill: "none" },
    tooltip: {
      zIndex: "999",
      transition:
        "opacity 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s, visibility 0.2s cubic-bezier(0.23, 1, 0.32, 1) 0s",
      fontFamily: "Arial",
      fontSize: "14px",
      fill: "gray",
      textColor: "#ffffff",
      bgColor: "#000000",
      borderRadius: "5px",
      borderColor: "#000000",
      borderWidth: "1px",
      padding: "10px",
      pointerEvents: "none",
      visibility: "hidden",
      opacity: "0",
      top: "0px",
      left: "0px",
    },
    legend: { fontFamily: "Arial", fontSize: "14px", placement: "left" },
    pieLabel: {
      fontFamily: "Arial",
      fontSize: "14px",
      color: "#000000",
      rotation: 0,
    },
    container: { opacity: 0.8, visibility: "hidden" },
    rect: {
      fontFamily: "Arial",
      color: "#A9A9A9",
      fontSize: "14px",
      rectSize: 18,
    },
    text: { textAnchor: "middle", color: "#A9A9A9", rectSpace: 6 },
    chartColor: { backgroundColor: "#ffffff" },
    chartTitle: {
      view: true,
      value: "Pie Chart Title",
      color: "#333333",
      fontSize: "20px",
      marginTop: 3,
      fontFamily: "Arial",
      fontWeight: "bold",
    },
    color: {
      schemas: {
        schema1: ["#5470c6", "#91cc75", "#fac858", "#ee6666", "#73c0de"],
        schema2: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff"],
        schema3: ["#c6e48b", "#7bc96f", "#249a3c", "#196127", "#003820"],
      },
      theme: "schema1",
    },
    chart: {
      type: "pie",
    },
  };

  const arcsData =
    Array.isArray(options.dimension) &&
    options.dimension.length > 0 &&
    options.dimension.some(
      (item) => item !== undefined && item.name !== undefined
    )
      ? options.dimension?.filter((item) => !item.hidden)?.map((e) => e?.name)
      : Array.isArray(propsData?.data) && propsData?.data.length > 0
      ? propsData?.data.filter((item) => !item.hidden)?.map((e) => e?.genre)
      : defaultData?.data?.map((e) => e?.genre);
  console.log("options", options);
  const dataValues =
    Array.isArray(options.dimension) &&
    options.dimension.length > 0 &&
    options.dimension.some(
      (item) => item !== undefined && item.name !== undefined
    )
      ? options.dimension
      : Array.isArray(propsData?.data) && propsData?.data.length > 0
      ? propsData?.data
          .filter((e) => e?.genre !== undefined)
          .map((e) => ({
            name: e.genre,
            hidden: e.hidden !== undefined ? e.hidden : false,
          }))
      : Array.isArray(defaultData?.data)
      ? defaultData?.data
          .filter((e) => e?.genre !== undefined)
          .map((e) => ({
            name: e.genre,
            hidden: e.hidden !== undefined ? e.hidden : false,
          }))
      : [];

  // console.log("filter",pieChartDimensions)
  // console.log("dataValuesss",dataValues)
  // console.log("options",options)
  // console.log("dimension",options.dimension)

  const categories =
    Array.isArray(options.measures) && options.measures.length > 0
      ? options.measures.map((item) => Math.ceil(item)) ||
        options.measures.map((item) => Math.ceil(item.value))
      : Array.isArray(propsData?.data) && propsData?.data.length > 0
      ? propsData?.data.map((e) => e?.na_sales)
      : defaultData?.data?.map((e) => e?.na_sales);
  // console.log("pieChartMeasured", categories);

  // const filteredDataValues = dataValues.filter((_, index) => index !== 5);
  // console.log("filteredDataValues", filteredDataValues);
  // Create uniqueDataValues based on the "name" property
  const uniqueDataValues = Array.from(
    new Set(dataValues?.map((item) => item.name)),
    (itemNew) => dataValues?.find((item) => item.name === itemNew)
  );
  console.log(uniqueDataValues, "unique");
  // console.log(filteredDataValues, "filter");
  //svg container
  const width =
    styles?.chartContainer?.width?.value ||
    defaultValues?.chartContainer?.width;
  const height =
    styles?.chartContainer?.height?.value ||
    defaultValues?.chartContainer?.height;
  const { top, right, bottom, left } = defaultValues.margin;
  const radius = Math.min(width, height) / 2;
  d3.select(`#${options.id}`).selectAll("svg").remove();
  const svg = d3
    .select(`#${options.id}`)
    .append("svg")
    .attr("width", width)
    .attr("height", height + 30)
    .style(
      "background-color",
      styles?.chartColor?.backgroundColor?.value || defaultValues?.chartColor
    )
    .append("g")
    .style("over-flow", defaultValues.charts.visibility)
    .attr(
      "transform",
      "translate(" + width / 2 + "," + (height / 2 + 50) + ")"
    );
  // const colorSchemes = styles?.color?.schemas || defaultValues.color.schemas;
  // const initialColorSchema =
  //   styles?.color?.theme || defaultValues.color.theme;
  // const color = d3.scaleOrdinal()
  //     .domain(dataValues)
  //     .range(colorSchemes[initialColorSchema]);
  const color = d3
    .scaleOrdinal()
    .domain(dataValues.map((item) => item.name))
    .range(d3.schemeCategory10);

  const fontSizeTitle =
    styles?.chartTitle?.fontSize?.value || defaultValues?.chartTitle?.fontSize;
  const fontSizeTitleChanged =
    fontSizeTitle !== defaultValues?.chartTitle?.fontSize;
  const extraMarginTop =
    styles?.chartTitle?.view?.value !== false && fontSizeTitleChanged
      ? parseFloat(fontSizeTitle) * 1.5
      : 0;
  function dragStarted() {
    d3.select(this).raise().classed("active", true);
  }
  function dragged(event, d) {
    d3.select(this).attr("x", event.x).attr("y", event.y);
  }
  function dragEnded() {
    d3.select(this).classed("active", false);
  }

  const pie = d3.pie().value(function (d) {
    // console.log("d", d);
    return d.value;
  });
  const chartType = styles?.chart?.type?.value || defaultValues?.chart?.type;
  let innerRadius, outerRadius;
  const chartWidth = 500;
  const chartHeight = 400;
  if (chartType == "donut") {
    innerRadius = 28 * 6;
    outerRadius = radius - 110;
  } else {
    innerRadius = 0;
    outerRadius = radius - 60;
  }
  const arc = d3.arc().innerRadius(innerRadius).outerRadius(outerRadius);
  let tooltip = d3
    .select("body")
    .append("div")
    .style("position", "absolute")
    .style("display", "block")
    .style("border-style", "solid")
    .style("white-space", "nowrap")
    .style("z-index", defaultValues.tooltip.zIndex)
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
      styles?.tooltip?.borderRadius?.value ||
        defaultValues?.tooltip?.borderRadius
    )
    .style(
      "color",
      styles?.tooltip?.textColor?.value || defaultValues?.tooltip?.textColor
    )
    .style(
      "padding",
      styles?.tooltip?.padding?.value || defaultValues?.tooltip?.padding
    )
    .style("top", defaultValues?.tooltip?.top)
    .style("left", defaultValues?.tooltip?.left)
    .style(
      "border-color",
      styles?.tooltip?.borderColor?.value || defaultValues?.tooltip?.borderColor
    )
    .style("pointer-events", defaultValues?.tooltip?.pointerEvents)
    .style("visibility", "hidden")
    .style("opacity", defaultValues?.tooltip?.opacity)
    // .attr("class", "tooltip")
    .style(
      "font-family",
      styles?.tooltip?.fontFamily?.value || defaultValues?.tooltip?.fontFamily
    )
    .style(
      "font-size",
      styles?.tooltip?.fontSize?.value || defaultValues?.tooltip?.fontSize
    )
    .style("fill", defaultValues?.tooltip?.fill);
  //pie arcs data
  const arcs = svg
    .selectAll("arc")
    .data(
      pie(
        arcsData?.map((value, index) => ({
          name: value,
          value: categories[index],
        }))
      )
    )
    .enter()
    .append("g")
    .attr("class", "arc")
    .on("mouseover", function (event, d) {
      tooltip
        .transition()
        .duration(200)
        .style("opacity", defaultValues?.charts?.opacity)
        .style("visibility", defaultValues?.charts?.visibility);
      tooltip
        .html(
          `
         <div ><span>
         ${d.data.name}</span> : <strong>${d.data.value}</strong> </div> `
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
  arcs
    .append("path")
    .attr("d", arc)
    .attr("fill", function (d) {
      return color(d.data.name);
    })
    .on("mouseover", function (event, d) {
      d3.select(this)
        .style("filter", "drop-shadow(6px 6px 6px rgba(0, 0, 0, 0.3))")
        .style("transform", "translate3d(-2px, -1px, 0px)")
        .transition()
        .duration(200)
        .attr("fill", d3.rgb(color(d.data.name)).brighter(0.5));
    })
    .on("mouseout", function (event, d) {
      d3.select(this)
        .style("filter", "drop-shadow(0px 0px 0px rgba(0, 0, 0, 0.3))")
        .style("transform", "translate3d(0px, 0px, 0px)")
        .transition()
        .duration(200)
        .attr("fill", color(d.data.name));
      svg.select(".category-label").remove();
    })
    .transition()
    .ease(d3.easeLinear)
    .duration(1000)
    .attrTween("d", function (d) {
      const interpolate = d3.interpolate({ startAngle: 0, endAngle: 0 }, d);
      return function (t) {
        return arc(interpolate(t));
      };
    });
  arcs
    .append("path")
    .attr("stroke", function (d) {
      return color(d.data.name);
    })
    .attr("fill", defaultValues?.line?.fill)
    .attr("d", function (d) {
      const pos = arc.centroid(d);
      const midangle = Math.atan2(pos[1], pos[0]);
      const startX = Math.cos(midangle) * (radius - 60);
      const startY = Math.sin(midangle) * (radius - 60);
      const turnX = Math.cos(midangle) * (radius - 60);
      const turnY = Math.sin(midangle) * (radius - 40);
      const endX = Math.cos(midangle) * (radius - 40);
      const endY = Math.sin(midangle) * (radius - 40);
      return `M${startX},${startY} L${turnX},${turnY} L${endX},${endY}`;
    });
  arcs
    .append("text")
    .attr("transform", function (d) {
      const pos = arc.centroid(d);
      const midangle = Math.atan2(pos[1], pos[0]);
      const x = Math.cos(midangle) * (radius - 30);
      const y = Math.sin(midangle) * (radius - 30);
      const rotateAngle =
        (midangle * styles?.pieLabel?.rotation?.value ||
          defaultValues?.pieLabel?.rotation) / Math.PI;
      return "translate(" + x + "," + y + ") rotate(" + rotateAngle + ")";
    })
    .attr("dy", "0.35em")
    .style(
      "font-family",
      styles?.pieLabel?.fontFamily?.value || defaultValues?.pieLabel?.fontFamily
    )
    .style(
      "font-size",
      styles?.pieLabel?.fontSize?.value || defaultValues?.pieLabel?.fontSize
    )
    .style(
      "fill",
      styles?.pieLabel?.color?.value || defaultValues?.pieLabel?.color
    )
    .style("text-anchor", function (d) {
      const pos = arc.centroid(d);
      return Math.abs(Math.atan2(pos[1], pos[0])) > Math.PI / 2
        ? "end"
        : "start";
    })
    .text(function (d) {
      return d.data.name;
    });
  const legendX = 100;
  const legendY = 50;
  const marginLeftTop = -290;
  const legend = svg.append("g").attr("class", "legend");
  function setLegendPosition(position) {
    let translateX = 0;
    let translateY = 0;
    switch (position) {
      case "top":
        translateY = -height / 2 + 20;
        translateX = marginLeftTop;
        break;
      case "right":
        translateX = width / 2 - 310;
        translateY = -230;
        break;
      case "bottom":
        translateY = height / 2 - 10;
        break;
      case "left":
        translateX = -width / 2 + 10;
        translateY = -199;
        break;
      default:
        break;
    }
    // Update legend position
    legend.attr("transform", `translate(${translateX},${translateY})`);
  }
  function renderLegendItems(items) {
    // console.log("items", items);
    const legendRectSize =
      styles?.legend?.rectSize?.value || defaultValues?.rect?.rectSize;
    const legendSpacing = defaultValues?.text?.rectSpace;
    const legendItems = legend
      .selectAll(".legend-item")
      .data(
        pie(
          dataValues.map((value, index) => ({
            name: value.name,
            value: categories[index],
            index: index,
          }))
        )
      )
      .enter()
      .append("g")
      .attr("opacity", function (d) {
        const correspondingData = dataValues?.find(
          (item) => item.name === d.data.name
        );
        return correspondingData && correspondingData.hidden ? 0.5 : 1;
      })
      .attr("class", "legend-item")
      .attr("transform", (d, i) => "translate(" + i * 50 + ", 0)");
    legendItems
      .append("rect")
      .attr("x", -232)
      .attr("y", -10)
      .attr("width", 10)
      .attr("height", 10)
      .attr("fill", function (d, i) {
        // console.log("d3", d);
        return color(d);
      })
      .on("click", function (event, d) {
        toggleLegend(d);
      });
    legendItems
      .append("text")
      .style("margin", "5px")
      .attr("x", -221)
      .attr("y", 1)
      .style(
        "font-family",
        styles?.legend?.fontFamily?.value || defaultValues?.legend?.fontFamily
      )
      .attr("font-size", "13px")
      .text(function (d) {
        return d.data.name;
      })
      .on("click", function (event, d) {
        toggleLegend(d);
      });
  }
  // Example usage
  setLegendPosition(
    styles?.legend?.placement?.value || defaultValues?.legend?.placement
  );
  if (styles?.legend?.placement?.value === "top") {
    renderLegendItems(dataValues.map((item) => item.name));
  }
  const legendRectSize =
    styles?.legend?.rectSize?.value || defaultValues?.rect?.rectSize;
  const legendSpacing = defaultValues?.text?.rectSpace;
  console.log("datavalues", dataValues);
  const legendItems = legend
    .selectAll(".legend-item")
    .data(
      pie(
        uniqueDataValues?.map((item, index) => ({
          name: item.name,
          value: categories[index],
          index: index,
        }))
      )
    )
    .enter()
    .append("g")
    .attr("opacity", function (d) {
      console.log("d", d);
      const correspondingData = dataValues?.find(
        (item) => item?.name === d.data.name
      );
      // console.log("dtaa", correspondingData);
      return correspondingData && correspondingData.hidden ? 0.5 : 1;
    })
    .attr("class", "legend-item")
    .attr("transform", function (d, i) {
      const totalLegends = uniqueDataValues.length;
      const numberOfColumns = calculateNumberOfColumns(totalLegends);

      if (uniqueDataValues.length < 35) {
        // If there are less than 35 legends, apply this transform
        const w = 55; // width of each entry (so you can position the next row)
        const h = 20; // height of each entry
        const tx = 10; // tx/ty are essentially margin values
        const ty = 10;
        const marginLeft = 60; // Set your desired left margin value
        const x = (i % numberOfColumns) * w + tx + marginLeft;
        const y = Math.floor(i / numberOfColumns) * h + ty;
        return "translate(" + x + "," + y + ")";
      } else {
        // If there are 35 or more legends, apply the position function
        return position(d, i, numberOfColumns);
      }
    });

  function position(d, i, numberOfColumns) {
    const h = 20; // height of each entry
    const w = 55; // width of each entry (so you can position the next row)
    const tx = 10; // tx/ty are essentially margin values
    const ty = 10;
    const marginLeft = -22; // Set your desired left margin value
    const x = (i % numberOfColumns) * w + tx + marginLeft;
    const y = Math.floor(i / numberOfColumns) * h + ty;
    return "translate(" + x + "," + y + ")";
  }

  function calculateNumberOfColumns(totalLegends) {
    const legendRectSize =
      styles?.legend?.rectSize?.value || defaultValues?.rect?.rectSize;
    const legendSpacing = defaultValues?.text?.rectSpace;
    const availableWidth =
      styles?.chartContainer?.width?.value ||
      defaultValues?.chartContainer?.width; // Use your chart's available width

    // Calculate the number of columns based on the total number of legends
    return Math.max(
      1,
      Math.ceil(
        totalLegends / Math.floor(availableWidth / (55 + legendSpacing))
      )
    );
  }

  //   .attr("transform", function (d, i) {
  //     const numberOfColumns = calculateNumberOfColumns();
  //     const w = calculateLegendWidth(numberOfColumns);
  //     const legendHeight = calculateLegendHeight();
  //     const tx = 10; // tx/ty are essentially margin values
  //     const ty = 10;
  //     const marginLeft = 20; // Set your desired left margin value
  //     const x = Math.floor(i / numberOfColumns) * w + tx + marginLeft;
  //     const y = (i % numberOfColumns) * legendHeight + ty;
  //     return "translate(" + x + "," + y + ")";
  //   });

  //   function calculateLegendHeight() {
  //     const legendRectSize = styles?.legend?.rectSize || defaultValues.rect.rectSize;
  //     const legendSpacing = defaultValues.text.rectSpace;
  //     return legendRectSize + legendSpacing;  // Total height of each legend item
  //   }

  // function calculateNumberOfColumns() {
  //   const legendRectSize =
  //     styles?.legend?.rectSize || defaultValues.rect.rectSize;
  //   const legendSpacing = defaultValues.text.rectSpace;
  //   const availableWidth = styles?.chartContainer?.width||defaultValues?.chartContainer?.width // Use your chart's available width
  //   return Math.floor(availableWidth / (legendRectSize + legendSpacing));
  // }

  // function calculateLegendWidth(numberOfColumns) {
  //   const availableWidth = styles?.chartContainer?.width||defaultValues?.chartContainer?.width // Use your chart's available width
  //   const legendSpacing = defaultValues.text.rectSpace;
  //   return (availableWidth - (numberOfColumns - 1) * legendSpacing) / numberOfColumns;
  // }
  // .attr("transform", function (d, i) {
  //   if (uniqueDataValues.length < 25) {
  //     // If there are less than 15 legends, apply this transform
  //     return "translate(0," + i * (legendRectSize + legendSpacing) + ")";
  //   } else {
  //     // If there are 15 or more legends, apply the position function
  //     return position(d, i);
  //   }
  // });

  legendItems
    .append("rect")
    .attr("width", legendRectSize)
    .attr("height", legendRectSize)
    .attr("fill", function (d, i) {
      return color(d.data.name);
    })
    .on("click", function (event, d) {
      toggleLegend(d);
    });
  legendItems
    .append("text")
    .attr("x", legendRectSize + legendSpacing)
    .attr("y", legendRectSize - legendSpacing)
    .style(
      "font-family",
      styles?.legend?.fontFamily?.value || defaultValues?.legend?.fontFamily
    )
    .attr(
      "font-size",
      styles?.legend?.fontSize?.value || defaultValues?.legend?.fontSize
    )
    .text(function (d) {
      return d.data.name;
    })
    .on("click", function (event, d) {
      toggleLegend(d);
    });
  // function position(d,i) {
  //   var c = 5;   // number of columns
  //   var h = 20;  // height of each entry
  //   var w = 55; // width of each entry (so you can position the next column)
  //   var tx = 10; // tx/ty are essentially margin values
  //   var ty = 10;
  //   var marginLeft = -10; // Set your desired left margin value
  //   var x = i % c * w + tx + marginLeft;
  //   var y = Math.floor(i / c) * h + ty;
  //   return "translate(" + x + "," + y + ")";
  // }
  function toggleLegend(d) {
    // Get the current visibility state of the selected arc
    const selectedArc = svg.select(`.arc path[fill="${color(d.data.name)}"]`);
    if (!selectedArc.empty()) {
      const isHidden = selectedArc.attr("opacity") === "0";
      // console.log(isHidden, "ishidden");
      // Toggle visibility of the selected arc
      selectedArc
        .transition()
        .duration(500)
        .attr("opacity", isHidden ? 1 : 0);

      const newData = (dataValues || []).map((item) => ({
        ...item,
        hidden: item.name === d.data.name ? !item.hidden : item.hidden,
      }));

      // console.log(newData, "neww");
      // console.log("datavalues1111111", dataValues);
      // Remove the existing SVG
      d3.select(`#${options.id}`).selectAll("svg").remove();
      // Redraw the chart with the updated data only if propsData is not undefined
      if (dataValues || newData || options.dimension) {
        const newOptions = {
          id: options.id,
          dimension: newData,
          measures: options.measures,
        };
        DrawPieChart(
          // PieChartId,
          newOptions,
          propsData,
          styles,
          newData
          //  pieChartMeasures
        );
      }
    } else {
      const newData = (dataValues || []).map((item) => ({
        ...item,
        hidden: item.name === d.data.name ? !item.hidden : item.hidden,
      }));

      // Remove the existing SVG
      // console.log("newData", newData);
      d3.select(`#${options.id}`).selectAll("svg").remove();
      // Redraw the chart with the updated data only if propsData is not undefined
      if (dataValues || newData || options.dimension) {
        const newOptions = {
          id: options.id,
          dimension: newData,
          measures: options.measures,
        };
        DrawPieChart(
          // PieChartId,
          newOptions,
          propsData,
          styles,
          newData
          //  pieChartMeasures
        );
      }
    }
  }
  if (
    styles?.chartTitle?.view?.value !== false &&
    defaultValues?.chartTitle?.view
  ) {
    // Create a drag behavior
    svg
      .append("text")
      .attr("x", width / 100)
      .attr("y", defaultValues?.chartTitle?.marginTop)
      .attr("dy", "-14rem")
      .attr("text-anchor", "middle")
      .style(
        "view",
        styles?.chartTitle?.view?.value || defaultValues?.chartTitle?.view
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
      .style(
        "fill",
        styles?.chartTitle?.color?.value || defaultValues?.chartTitle?.color
      )
      .style(
        "font-weight",
        styles?.chartTitle?.fontWeight?.value ||
          defaultValues?.chartTitle?.fontWeight
      )
      .text(
        styles?.chartTitle?.value?.value || defaultValues?.chartTitle?.value
      )
      .call(
        d3
          .drag()
          .on("start", dragStarted)
          .on("drag", dragged)
          .on("end", dragEnded)
      );
  }
}

// DrawPieChart("chart-container");
