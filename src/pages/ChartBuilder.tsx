/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef, useState } from "react";
import { DrawAreaChart } from "../charts/AreaChart/index.js";
import { drawColumnChart } from "../charts/ColumnChart/index.js";
import { useParams } from "react-router-dom";
import { Grid, Menu, MenuItem, IconButton, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
// import { DrawScatterPlot } from "../charts/ScatteredPlot/index.js";
// import { DrawPieChart } from "../charts/PieChart/index.js";
import { DrawMultiLineChart } from "../charts/MultiLineChart/index.js";
import { DrawCalendarChart } from "../charts/CalendarChart/index.js";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import ShareButtonImage from "../assets/images/ShareButtonImage.png";
import DownloadButtonImage from "../assets/images/DownloadButtonImage.png";
import EditableTable from "../components/EditableTable.js";
// import { removeCodeFromDB } from "../db.js";

const useStyles = makeStyles({
  mainContainer: {
    flex: "1",
    transition: "margin-left 0.3s",
    maxHeight: "120vh",
    overflowY: "auto",

    // overscrollBehavior: "contain",
    margin: 0,
    padding:0,
    scrollbarWidth: "thin",
    cursor:"pointer",
    scrollbarColor: "#808080",
    "&::-webkit-scrollbar": {
      width: "5px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#808080",
      borderRadius: "5px",
    },
    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent",
    },
  },
  chartContainer: {
    textAlign: "center",
    backgroundColor: "#ffffff",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    border: "20px solid #f1f1f1",
    overflowX: "auto",
  },
  header: {
    backgroundColor: "#ffffff",
    boxShadow:
      "0 0 0 1px rgba(16,22,26,.1), 0 0 0 transparent, 0 1px 1px rgba(16,22,26,.2)",
    position: "sticky",
    top: 0,
    zIndex: 10,
    borderBottom: "1px solid gray",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "46px",
  },
  headerText: {
    marginTop: "10px",
    fontSize: "20px",
    marginLeft: "20px",
  },
  sourceStyles: {
    marginTop: "20px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    backgroundColor: "#ffffff",
    overflowY: "auto",
    overflowX: "auto",
  },
  zoomConatainer: {
    border: "1px solid #D1D1D1",
    width: "70px",
    height: "25px",
    backgroundColor: "transparent",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#888",
    fontFamily: "Roboto Slab",
    fontSize: "14px",
    cursor: "pointer",
  },
  shareImg: {
    width: "18px",
    height: "15px",
  },
  shareContainer: {
    cursor: "pointer",
    marginLeft: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

const ChartBuilder = () => {
  const classes = useStyles();
  const params = useParams();
  const chartRef = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (params.id === "area-chart") {
        const options = {
          id: params.id,
          dimensions: [],
          measures: [],
        };
        DrawAreaChart(options);
      } else if (params.id === "column-chart") {
        const options = {
          id: params.id,
          dimensions: [],
          measures: [],
        };
        drawColumnChart(options);
      } 
      // else if (params.id === "scatter-plot") {
      //   const options = {
      //     id: params.id,
      //     dimensions: [],
      //     measures: [],
      //   };
      //   DrawScatterPlot(options);
      // } 
      // else if (params.id === "pie-chart") {
      //   const options = {
      //     id: params.id,
      //     dimensions: [],
      //     measures: [],
      //   };
      //   DrawPieChart(options);
      // } 
      else if (params.id === "multi-line-chart") {
        const options = {
          id: params.id,
          dimensions: [],
          measures: [],
        };
        DrawMultiLineChart(options);
      } else if (params.id === "calendar-chart") {
        DrawCalendarChart(params.id);
      }
    }, 0);
    return () => clearTimeout(timeoutId);
  }, [params.id]);

  const handleDownload = async (type: any) => {
    setAnchorEl(null);

    if (!chartRef.current) {
      console.error("Chart reference not found.");
      return;
    }

    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");

    if (type === "png") {
      // Download as PNG
      const link = document.createElement("a");
      link.href = imgData;
      link.download = "chart_download.png";
      link.click();
    } else if (type === "pdf") {
      // Download as PDF
      const pdf = new jsPDF();
      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdf.internal.pageSize.width,
        pdf.internal.pageSize.height
      );
      pdf.save("chart_download.pdf");
    } else if (type === "excel") {
      // Download as Excel
      const worksheet = XLSX.utils.table_to_sheet(chartRef.current);

      // Create a WorkBook and add the WorkSheet to it
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

      // Write the WorkBook to array buffer
      const excelBuffer = XLSX.write(workbook, {
        bookType: "xlsx",
        type: "array",
      });

      const data = new Blob([excelBuffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(data);
      link.download = "chart_download.xlsx";
      link.click();
    }
  };

  const openMenu = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => {
    setAnchorEl(null);
  };

  return (
    <Grid className={classes.mainContainer}>
      <Grid item xs={12} className={classes.chartContainer}>
        <Grid
          container
          justifyContent="end"
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <Grid
            item
            className={classes.headerText}
            display="flex"
            flexDirection="row"
          >
            {/* <div className={classes.zoomConatainer}>
                <span style={{ marginRight: "5px" }}>-</span>
                <span style={{ marginRight: "5px" }}>100</span>
                <span>+</span>
              </div> */}
            <div className={classes.shareContainer}>
              <img src={ShareButtonImage} height={35} />
            </div>
            <Grid container gap={1} sx={{ alignItems: "center" }}>
              <Box className={classes.shareContainer}>
                <IconButton onClick={openMenu}>
                  <img src={DownloadButtonImage} height={35} />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={closeMenu}
                >
                  <MenuItem
                    onClick={() => handleDownload("png")}
                    style={{ fontSize: "12px" }}
                  >
                    <FileDownloadIcon
                      style={{ marginRight: "5px", fontSize: "12px" }}
                    />{" "}
                    Download as &nbsp;<b>PNG</b>
                  </MenuItem>
                  <MenuItem
                    onClick={() => handleDownload("pdf")}
                    style={{ fontSize: "12px" }}
                  >
                    <FileDownloadIcon
                      style={{ marginRight: "5px", fontSize: "12px" }}
                    />{" "}
                    Download as &nbsp;<b>PDF</b>
                  </MenuItem>
                </Menu>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid item id={params.id} ref={chartRef} sx={{ width: "100%" }}></Grid>
      </Grid>
      <Grid item xs={12} className={classes.sourceStyles}>
        <EditableTable />
      </Grid>
    </Grid>
  );
};

export default ChartBuilder;
