// import React from 'react';
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../assets/images/Color BG.png";

const useStyles = makeStyles({
  container: {
    display: "grid",
    flexDirection: "row",
    overflow: "auto",
    margin: 0,
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    scrollbarWidth: "thin",
    scrollbarColorY: "#808080 transparent",
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
  mainContainer: {
    height: "calc(50vh - 28px)",
    textAlign: "center",
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
  },
  tryNowButton: {
    color: "#FFFFFF",
    background: "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)",
    border: "0",
    paddingInline: "35px",
    paddingBlock: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    fontSize: "17px",
    fontFamily: "Calibri",
  },
  headingWrapper: {
    background:
      "linear-gradient(0deg, #464646, #464646), linear-gradient(99.16deg, #52C7FF 35.49%, #0D8DCB 83.89%)",
    WebkitBackgroundClip: "text",
    color: "transparent",
  },
  heading: {
    color: "#464646",
    display: "inline-block",
    margin: "0px",
    fontSize: "46px",
    fontFamily: "Calibri",
  },
  blueHead: {
    color: "#52C7FF !important",
    fontFamily: "Calibri",
    textDecoration: "underline",
  },
  pColor: {
    marginBlock: "30px",
    color: "#464646",
    fontFamily: "Calibri",
  },
  footerContainer: {
    backgroundColor: "#111827",
    height: "calc(50vh - 28px)",
    textAlign: "center",
    alignItems: "center"
  },
  paragraph: {
    color: "#fff",
    maxWidth: "80%",
    margin: "0 auto",
    fontFamily: "Calibri",
  },
  hrLine: {
    border: "none",
    height: "1px",
    color: "#ffffff",
    backgroundColor: "#D1D1D133",
    margin: "0",
    width: "100%",
    marginLeft: "5%",
    marginRight: "5%",
  },
  createdText: {
    background:
      "linear-gradient(0deg, #FFFFFF, #FFFFFF), linear-gradient(0deg, rgba(255, 255, 255, 0.4), rgba(255, 255, 255, 0.4))",
    WebkitBackgroundClip: "text",
  },
  chartsGrid: {
    marginLeft: "15px",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },

  createdByGrid: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    marginRight: "15px",
  },
});

const HomePage = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  const handleTryNowClick = () => {
    navigate("/AI");
  };

  return (
    <Grid item xs={12} className={classes.container}>
      <Grid item xs={12} className={classes.mainContainer} textAlign="center">
        <Grid item sx={{ py: { xs: 1 } }}>
          <div className={classes.headingWrapper}>
            <h1 className={classes.heading}>
              Transform{" "}
              <span className={classes.blueHead}>data into charts</span>
            </h1>
          </div>
          <h1 className={classes.heading}>with natural language</h1>
          <p className={classes.pColor}>
            Got a CSV file? Simply chat with our tool and create a range of
            charts
          </p>
          <Grid item textAlign="center">
            <button
              className={classes.tryNowButton}
              onClick={handleTryNowClick}
            >
              Try now for free
            </button>
          </Grid>
        </Grid>
      </Grid>
      <Grid container className={classes.footerContainer}>
        <Grid item xs={12} mt={{ xs: 1, md: 5 }}>
          <h1 className={classes.paragraph}>
            Your new personal data analyst. Connect to a data and start asking
            questions.
          </h1>
        </Grid>
        <hr className={classes.hrLine} />
        <Grid
          container
          color="#ffffff"
          justifyContent="space-between"
          fontFamily="Calibri"
        >
          <Grid item ml={{ xs: 0.5, md: 10 }}>
            <span style={{ marginRight: "25px" }}>Charts</span>
            <span style={{ marginRight: "25px" }}>Chart Editor</span>
            <span style={{ marginRight: "25px" }}>AI</span>
          </Grid>
          <Grid item mr={{ xs: 0.5, md: 10 }}>
            <span className={classes.createdText}>
              <span style={{ color: "#012010" }}> Created by</span> Ahex
              Technologies
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HomePage;
