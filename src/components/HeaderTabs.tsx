/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import { AppBar, Tab, Tabs, Typography, Grid } from "@mui/material";
// import { LuBarChart4 } from "react-icons/lu";
// import { FaChartPie } from "react-icons/fa";
// import { FaChartLine } from "react-icons/fa";
import ChartList from "./ChartListComponent";
import DataComponent from "./DataComponent";
import CustomStyles from "./CustomStylesComponent";
import { makeStyles } from "@mui/styles";
import AreaChartData from "../charts/AreaChart/data.json";
import ColumnChartData from "../charts/ColumnChart/data.json";
import AreaChartStyles from "../charts/AreaChart/styles.json";
import ColumnChartStyles from "../charts/ColumnChart/styles.json";
import ScatterPlotData from "../charts/ScatteredPlot/data.json";
import ScatterPlotStyles from "../charts/ScatteredPlot/styles.json";
import PieChartData from "../charts/PieChart/data.json";
import PieChartStyles from "../charts/PieChart/styles.json";
import MultiLineChartData from "../charts/MultiLineChart/data.json";
import MultiLineChartStyles from "../charts/MultiLineChart/styles.json";
import CalendarChartData from "../charts/CalendarChart/data.json";
import CalendarChartStyles from "../charts/CalendarChart/styles.json";
// import RadarChartData from "../charts/RadarChart/data.json";
// import RadarChartStyles from "../charts/RadarChart/styles.json";
import { useParams } from "react-router-dom";
import headersChartsImg from ".././assets/images/headers-chart-icon.png";
import headersDataImg from ".././assets/images/headers-data-icon.png";
import headersStylesImg from ".././assets/images/headers-styles-icon.png";

const useStyles = makeStyles({
  root: {
    backgroundColor: "#fff",
    ZIndex: `${10} !important`,
    // boxShadow: "rgba(0, 0, 0, 0.2) 1px 2px 10px",
  },
  appBar: {
    height: "46px",
    marginBottom: "0 !important",
    fontFamily: "Helvetica",
    justifyContent: "space-evenly",
  },
  tabIcon: {
    marginRight: "5px",
  },
  tabLabel: {
    fontFamily: "'Crimson Text', serif",
    fontSize: "12px !important",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      // color: "#9c27b0",
      transition: "border 0.3s",
    },
  },
  selectedTab: {
    // color: "#9c27b0",
    color: "#1795D2 !important",
    fontWeight: "bold",
  },
});

const HeaderTabs: React.FC = () => {
  const classes = useStyles();
  const params = useParams();
  const [selectedTab, setSelectedTab] = useState(0);

  useEffect(() => {
    // Check if there is a stored tab index
    const storedTabIndex = localStorage.getItem("selectedTabIndex");

    if (storedTabIndex !== null) {
      setSelectedTab(parseInt(storedTabIndex, 10));
    }
  }, []); // Run only once on component mount

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
    localStorage.setItem("selectedTabIndex", newValue.toString());
  };

  const sendDataToDataComponent = () => {
    if (params.id === "area-chart") {
      return AreaChartData;
    } else if (params.id === "column-chart") {
      return ColumnChartData;
    } else if (params.id === "scatter-plot") {
      return ScatterPlotData;
    } else if (params.id === "pie-chart") {
      return PieChartData;
    } else if (params.id === "multi-line-chart") {
      return MultiLineChartData;
    } else if (params.id === "calendar-chart") {
      return CalendarChartData;
    } 
    // else if (params.id === "radar-chart") {
    //   return RadarChartData;
    // }
  };

  const sendStylesToCustomStylesComponent = () => {
    if (params.id === "area-chart") {
      return AreaChartStyles;
    } else if (params.id === "column-chart") {
      return ColumnChartStyles;
    } else if (params.id === "scatter-plot") {
      return ScatterPlotStyles;
    } else if (params.id === "pie-chart") {
      return PieChartStyles;
    } else if (params.id === "multi-line-chart") {
      return MultiLineChartStyles;
    } else if (params.id === "calendar-chart") {
      return CalendarChartStyles;
    } 
    // else if (params.id === "radar-chart") {
    //   return RadarChartStyles;
    // }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item sx={{ width: "100%" }}>
        <AppBar
          position="sticky"
          className={classes.appBar}
          sx={{
            bgcolor: "#ffffff",
            zIndex: 1,
          }}
        >
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            sx={{
              "& .MuiTabs-indicator": {
                backgroundColor: "#1795D2",
              },
            }}
          >
            <Tab
              sx={{ width: "33%" }}
              label={
                <Typography
                  className={`${classes.tabLabel} ${
                    selectedTab === 0 ? classes.selectedTab : ""
                  }`}
                  style={{ textTransform: "none" }}
                >
                  {/* <LuBarChart4 className={classes.tabIcon} /> */}
                  <img
                    src={headersChartsImg}
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "5px",
                    }}
                    alt="headers"
                  />
                  Charts
                </Typography>
              }
            />
            <Tab
              sx={{ width: "34%" }}
              label={
                <Typography
                  className={`${classes.tabLabel} ${
                    selectedTab === 1 ? classes.selectedTab : ""
                  }`}
                  style={{ textTransform: "none" }}
                >
                  {/* <FaChartPie className={classes.tabIcon} /> */}
                  <img
                    src={headersDataImg}
                    style={{
                      width: "15px",
                      height: "13px",
                      marginRight: "5px",
                    }}
                    alt="headers"
                  />
                  Data
                </Typography>
              }
            />
            <Tab
              sx={{ width: "33%" }}
              label={
                <Typography
                  className={`${classes.tabLabel} ${
                    selectedTab === 2 ? classes.selectedTab : ""
                  }`}
                  style={{ textTransform: "none" }}
                >
                  {/* <FaChartLine className={classes.tabIcon} />  */}
                  <img
                    src={headersStylesImg}
                    style={{
                      width: "15px",
                      height: "15px",
                      marginRight: "5px",
                    }}
                    alt="headers"
                  />
                  Customize
                </Typography>
              }
            />
          </Tabs>
        </AppBar>
      </Grid>
      <Grid item xs={12}>
        {selectedTab === 0 && <ChartList />}
        {selectedTab === 1 && (
          <DataComponent data={sendDataToDataComponent()} />
        )}
        {selectedTab === 2 && (
          <CustomStyles
            data={sendDataToDataComponent()}
            styles={sendStylesToCustomStylesComponent()}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default HeaderTabs;
