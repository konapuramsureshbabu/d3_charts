/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import { Grid, Menu, MenuItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChartDetailsLogo from "../assets/images/d3_png.png";
import AvatarImage from "../assets/images/avatarImage.png";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import SourceDialog from "./SourceDialog";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  headerContainer: {
    // position: "sticky",
    top: 0,
    zIndex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    height: "56px",
    // padding: "0 20px",
    color: "#fff",
    backgroundColor: "#ffffff",
    // borderBottom: "1px solid #cdcdcd",
  },
  logo: {
    height: "30px",
    // marginLeft: "30px",
  },
  linksContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
  hoverStyles: {
    textDecoration: "none",
    fontSize: "14px",
    textAlign: "center",
    marginRight: "20px",
    cursor: "pointer",
    display: "inline-block",
  },
  welcomeText: {
    marginRight: "30px",
  },
  selectedStyles: {
    borderBottom: "2px solid #52C7FF !important",
    color: "#52C7FF !important",
    fontWeight: "bold",
    transition: "border 0.3s",
  },
  profileMenu: {
    position: "absolute",
    top: "40px",
    right: 0,
  },
  logoutButton: {
    background: "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)",
    color: "#ffffff",
    // borderColor:"#52C7FF",
    fontFamily: "'Roboto', sans-serif",
    fontSize: "14px",
    padding: "8px 16px",
    borderRadius: "4px",
    cursor: "pointer",
    border: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  loginButton: {
    color: "#0D8DCB !important",
    border: "2px solid #0D8DCB !important",
    fontFamily: "Calibri",
    fontSize: "16px",
    padding: "6px 16px",
    borderRadius: "6px",
    backgroundColor: "#ffffff",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
});

interface HeaderComponentProps {
  bgcolor?: string;
  sticky?: boolean;
}

const HeaderComponent: React.FC<HeaderComponentProps> = ({ sticky = true }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Initial state as null
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<HTMLElement | null>(null);

  const handleMobileMenuToggle = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMenuOpen(event.currentTarget as HTMLElement); // Explicitly cast to HTMLElement
  };

  const handleMobileMenuClose = () => {
    setMobileMenuOpen(null);
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Open menu when profile icon is clicked
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // Close the menu
    setAnchorEl(null);
  };

  const handleLoginButtonClick = () => {
    navigate("/login");
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <Grid
      item
      xs={12}
      sx={{
        backgroundColor: "#ffffff",
        color: "#888888",
        ...(sticky && {
          position: "sticky",
          top: 0,
          zIndex: 10,
        }),
      }}
    >
      <Grid className={classes.headerContainer} mx={{ xs: 0.5, md: 2 }}>
        <a href="/">
          <img src={ChartDetailsLogo} alt="Logo" className={classes.logo} />
        </a>
        <Grid
          item
          className={classes.linksContainer}
          sx={{ display: { xs: "none", md: "flex" } }}
        >
          {/* Navigation links */}
          <NavLink
            to="/"
            style={{ color: "#888888" }}
            className={`${classes.hoverStyles} ${
              location.pathname === "/" ? classes.selectedStyles : ""
            }`}
          >
            Home
          </NavLink>
          <NavLink
            to="/charts"
            style={{ color: "#888888" }}
            className={`${classes.hoverStyles} ${
              location.pathname === "/charts" ? classes.selectedStyles : ""
            }`}
          >
            Charts
          </NavLink>
          <NavLink
            to="/chart-builder/area-chart"
            style={{ color: "#888888" }}
            className={`${classes.hoverStyles} ${
              location.pathname.includes("/chart-builder/")
                ? classes.selectedStyles
                : ""
            }`}
          >
            Chart Editor
          </NavLink>
          <NavLink
            to="/AI"
            style={{ color: "#888888" }}
            className={`${classes.hoverStyles} ${
              location.pathname === "/AI" ? classes.selectedStyles : ""
            }`}
          >
            AI
          </NavLink>
        </Grid>

        <Grid item sx={{ display: { xs: "none", md: "flex" } }}>
          {localStorage.getItem("isAuth") !== "true" ? (
            <button
              className={classes.loginButton}
              onClick={handleLoginButtonClick}
            >
              Login
            </button>
          ) : (
            <div style={{ display: "flex", alignItems: "center" }}>
              <span style={{ color: "#888888" }}>Welcome Suresh</span>
              <div
                onClick={handleClick} // Opens menu on click
                style={{ cursor: "pointer", marginLeft: "5px" }}
              >
                <img
                  src={AvatarImage}
                  alt="Profile"
                  style={{
                    color: "black",
                    border: "1px solid #999999",
                    borderRadius: "50%",
                    padding: 5,
                    width: "20px",
                    height: "20px",
                  }}
                />
              </div>
              <Menu
                id="profile-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)} // Menu only opens when anchorEl is not null
                onClose={handleClose}
                className={classes.profileMenu}
                slotProps={{
                  paper: {
                    style: {
                      width: "150px",
                      boxShadow: "0px 4px 34px 0px #00000024",
                      fontFamily: "'Roboto Slab', sans-serif",
                      color: "#000",
                      fontSize: "16px",
                    },
                  },
                }}
              >
                <MenuItem>Profile</MenuItem>
                <MenuItem onClick={handleOpenDialog}>Source</MenuItem>
                <MenuItem onClick={handleOpenDialog}>Export</MenuItem>
                <MenuItem onClick={logOut}>
                  <button className={classes.logoutButton}>
                    Logout{" "}
                    <span>
                      <LogoutIcon
                        style={{
                          width: "15px",
                          height: "12px",
                          marginLeft: "3px",
                        }}
                      />
                    </span>
                  </button>
                </MenuItem>
              </Menu>
              <SourceDialog
                isOpen={isDialogOpen}
                setAnchorEl={setAnchorEl}
                onClose={handleCloseDialog}
              />
            </div>
          )}
        </Grid>

        <Grid
          item
          mr={2}
          sx={{
            display: { xs: "flex", md: "none" },
          }}
        >
          <IconButton aria-label="menu" onClick={handleMobileMenuToggle}>
            <MenuIcon />
          </IconButton>
          {mobileMenuOpen && (
            <Menu
              anchorEl={mobileMenuOpen}
              open={Boolean(mobileMenuOpen)}
              onClose={handleMobileMenuClose}
            >
              <MenuItem component={Link} to="/" onClick={handleMobileMenuClose}>
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/charts"
                onClick={handleMobileMenuClose}
              >
                Charts
              </MenuItem>
              <MenuItem
                component={Link}
                to="/chart-builder/area-chart"
                onClick={handleMobileMenuClose}
              >
                Chart Editor
              </MenuItem>
              <MenuItem
                component={Link}
                to="/AI"
                onClick={handleMobileMenuClose}
              >
                AI
              </MenuItem>
              <MenuItem
                component={Link}
                to="/login"
                onClick={handleMobileMenuClose}
              >
                Login
              </MenuItem>
            </Menu>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default HeaderComponent;
