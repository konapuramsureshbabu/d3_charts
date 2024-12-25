// import React from "react";
import { Grid } from "@mui/material";
import ChartThumbnail from "./ChartThumbnail";
import { makeStyles } from "@mui/styles";
import {chartsData} from "../charts/charts";

const useStyles = makeStyles({
  container: {
    marginTop: "-10%",
    display: "flex",
    marginBottom: "16px",
    backgroundColor: "#fff",
    cursor: "pointer",
    boxShadow: "0px 4px 94px 0px #0000001A",
    borderRadius: "5px",
    width: "80% !important",
    marginLeft: "10%",
    zIndex: 10,
  },
  thumbnailContent: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    margin: "0 auto",
  },
  thumbnailItem: {
    // position: "relative",
    borderRight: "2px solid #ccc",
    borderBottom: "2px solid #ccc",
    "&:nth-child(3n)": {
      borderRight: "none",
    },
    "&:nth-last-child(-n+3)": {
      borderBottom: "none",
    },
  },
});

const ThumbnailGallery = () => {
  const classes = useStyles();
  const handleChartView = (Id: string) => {
    window.open(`#/chart-builder/${Id}`, "_blank");
  };
  console.log("chartsData", chartsData);

  return (
    <Grid container className={classes.container}>
      <Grid item className={classes.thumbnailContent} container spacing={0}>
        {chartsData.map((chart, index) => (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={4}
            className={classes.thumbnailItem}
            onClick={() => handleChartView(chart.id)}
          >
            <ChartThumbnail
              heading={chart.heading}
              imagePath={chart.imagePath}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default ThumbnailGallery;
