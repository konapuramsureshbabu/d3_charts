import React, { useState } from //{ useState }
"react";
import { Routes, Route, HashRouter as Router } from "react-router-dom";
import Layout from "../components/common/Layout";
import ChartBuilder from "../pages/ChartBuilder";
import HeaderComponent from "../components/HeaderComponent";
import AIImage from "../assets/images/Ai.png";
import AiChatPopup from "../components/AiChatPopup";
import { makeStyles } from "@mui/styles";
import ChartPage from "../pages/ChartPage";
import HomePage from "../pages/HomePage";
import AiChartPage from "../pages/AiChatPage";
import Login from "../components/Login";
import ProtectedRoute from "./ProtectedRoute";

interface AppRoutesProps {}

const useStyles=makeStyles({
  aiIconStyles:{
    position: "fixed",
    bottom: 100,
    right: 40,
    cursor: "pointer",
    boxShadow: "0px 4px 54px 0px #00000040",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "white",
  },
  aiImg:{
    width: "50%",
     height: "60%"
  }
})

const AppRoutes: React.FC<AppRoutesProps> = () => {
  const classes=useStyles();
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleAiImageClick = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <Router>
      <HeaderComponent sticky />
      <Routes>
      <Route element={<Login />} path="/login" />

        <Route element={<ProtectedRoute />} path="/">
        <Route element={<HomePage />} path="/" />
        <Route element={<ChartPage />} path="/charts" />
        <Route element={<AiChartPage />} path="/AI" />
        <Route path="/" element={<Layout />}>
          <Route path="chart-builder/:id" element={<ChartBuilder />} />
        </Route>
        </Route>
      </Routes>
      <div
        onClick={handleAiImageClick}
        className={classes.aiIconStyles}
      >
        <img
          src={AIImage}
          alt="AI Image"
          id="ai-image"
          className={classes.aiImg}
        />
      </div>
      <AiChatPopup isOpen={isPopupVisible} onClose={handleClosePopup} /> 
    </Router>
  );
};

export default AppRoutes;
