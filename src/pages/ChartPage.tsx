import React from "react";
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import DescriptionComponent from "../components/DiscriptionComponent";
import FooterComponent from "../components/FooterComponent";
import ThumbnailGallery from "../components/ThumbnailGallery";
import backgroundImage from "../assets/images/Color BG.png";

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    // height: "100%",
    
  },
  topSection: {
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    height: "calc(50vh - 28px)",
  },
  bottomSection: {
    backgroundColor: "#012039 !important",
    height: "calc(50vh)",
  },
});

const ChartPage: React.FC = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.container}>
      <Grid item xs={12} className={classes.topSection}>
        <DescriptionComponent />
      </Grid>
      <Grid item xs={12} className={classes.bottomSection}>
        <ThumbnailGallery />
        <FooterComponent />
      </Grid>
    </Grid>
  );
};

export default ChartPage;
