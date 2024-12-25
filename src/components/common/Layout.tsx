/* eslint-disable @typescript-eslint/no-explicit-any */
import { Grid } from "@mui/material";
import { makeStyles } from "@mui/styles";
import HeaderTabs from "../HeaderTabs";
import { Outlet } from "react-router-dom";

const useStyles = makeStyles({
  bgContainer: {
    backgroundColor: "#ffffff",
    // height: "50vh",
    // overflow: "hidden",
  },
});

const Layout = () => {
  const classes = useStyles();
  return (
    <Grid container className={classes.bgContainer}>
      <Grid item xs={12} sm={9} md={9}>
        <Outlet />
      </Grid>
      <Grid item xs={12} sm={3} md={3}>
        <HeaderTabs />
      </Grid>
    </Grid>
  );
};

export default Layout;
