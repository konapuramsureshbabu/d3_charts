import React from "react";
import { Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  descriptionContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#000",
    fontFamily: "Roboto Slab",
    width: "100%",
  },
  descriptionContent: {
    maxWidth: "80%",
    textOverflow: "ellipsis",
    margin: "0 auto",
    marginTop: "20px",
    padding: "20px",
  },
  pColor: {
    color: "#888888",
  },
});

const DescriptionComponent: React.FC = () => {
  const classes = useStyles();

  return (
    <Grid item container xs={12} className={classes.descriptionContainer}>
      <Grid item className={classes.descriptionContent}>
        <Typography
          variant="h6"
          component="h6"
          textAlign="center"
          mb={2}
          color="#888888"
        >
          AHEX Tech. | d3.js
        </Typography>
        <p className={classes.pColor}>
          AHEX Tech leverages the power of D3.js in its projects to create
          dynamic and interactive data visualizations. Through the seamless
          integration of D3.js, AHEX Tech ensures that data comes to life,
          offering a compelling visual narrative to users. This implementation
          enhances the user experience by presenting complex information in an
          intuitive and engaging manner, making AHEX Tech's projects both
          informative and visually impactful.
        </p>
      </Grid>
    </Grid>
  );
};

export default DescriptionComponent;
