// import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  container: {
    width: "100%",
    backgroundColor: "#012039 !important",
    color: "#fff",
    fontFamily: "Roboto Slab",
  },
  textContainer: {
    borderBottom: "1px solid #bbb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    width: "50%",
    textAlign: "center",
  },
  link: {
    cursor: "pointer",
    textDecoration: "underline",
    color: "powderblue !important",
  },
  crearText: {
    background: "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))",
    WebkitBackgroundClip: "text",
  },
});

const FooterComponent = () => {
  const classes = useStyles();

  const handleD3LinkClick = () => {
    window.open("https://d3js.org/", "_blank");
  };

  return (
    <>
      <Grid item xs={12} className={classes.container}>
        <Grid item className={classes.textContainer}>
          <p className={classes.text}>
            All charts and data visualizations made with
            <span onClick={handleD3LinkClick} className={classes.link}> d3.js</span>, a JavaScript library for manipulating documents based on data.
          </p>
        </Grid>
        <br />
        <Grid textAlign="center">
        <p className={classes.crearText}><span style={{color:"#012010"}}> Created by</span> Suresh Technologies</p>
        </Grid>
      </Grid>
    </>
  );
};

export default FooterComponent;
