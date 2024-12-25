import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  activeLink: {
    textDecoration: 'underline',
  },
  link: {
    fontFamily: "Calibri",
    fontSize: '20px',
    fontWeight: 300,
    color: '#bbb',
    textAlign: 'center',
    margin: '0 auto',
    '&:hover': {
      color: '#fff', 
    },
  },
});

const LinksBar: React.FC = () => {
  const classes = useStyles();
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div">
              <NavLink
                to="/"
                className={`${pathname === '/' && classes.activeLink} ${classes.link}`}
              >
                Home
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div">
              <NavLink
                to="/portfolio"
                className={`${pathname === '/portfolio' && classes.activeLink} ${classes.link}`}
              >
                Portfolio
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div">
              <NavLink
                to="/works"
                className={`${pathname === '/works' && classes.activeLink} ${classes.link}`}
              >
                Demos
              </NavLink>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" component="div">
              <NavLink
                to="/demos"
                className={` ${pathname === '/demos' && classes.activeLink} ${classes.link}`}
              >
                About me
              </NavLink>
            </Typography>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default LinksBar;
