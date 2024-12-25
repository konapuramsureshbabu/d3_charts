
import React, { 
  //useEffect,
   useState } from "react";
import { Grid, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate, useParams } from "react-router-dom";
// import { removeCodeFromDB } from "../db";
import {chartsData} from "../charts/charts";

const useStyles = makeStyles({
  root: {
    // height: "calc(100vh - 102px)",
    flex: "1",
    transition: "margin-left 0.3s",
    maxHeight: "auto",
    overflowY: "auto",
    overscrollBehavior: "contain",
    margin: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "#808080 transparent",
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
    backgroundColor: "#fff",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
  },
  listItem: {
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
    padding: 14,
    color: "#000",
    fontSize: "12px",
    fontFamily: "Arial",
    border: "1px solid #cdcdcd",
    // borderRadius: "8px",
    "&:hover": {
      // border: "1px solid gray",
      // boxShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
      boxShadow: "2px 4px 0px 0px #4682B4",
      border: "1px solid #1795D2",
    },
  },
  listItemSelected: {
    // background: "#F5F5F5",
    cursor: "pointer",
    display: "block",
    textAlign: "center",
    flexDirection: "column",
    fontSize: "12px",
    alignItems: "center",
    fontFamily: "Arial",
    width: "100%",
    padding: 14,
    color: "#000",
    // border: "1px solid #000",
    // borderRadius: "8px",
    // boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
    boxShadow: "2px 4px 0px 0px #4682B4",
    border: "2px solid #1795D2",
  },
  listItemImage: {
    height: "40px",
    marginBottom: "8px",
  },
  searchField: {
    width: "100%",
    backgroundColor: "#F8F8F8",
    "& input::placeholder": {
      textAlign: "center",
      // padding:"0 0 0 -25px"
    },
  },
});

const ChartList: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const params = useParams();

  // const isLocalEnvironment = import.meta.env.MODE === "development";
  // const baseUrl = isLocalEnvironment
  //   ? import.meta.env.VITE_API_URL_Local
  //   : import.meta.env.VITE_API_URL_Prod;

  const [searchTerm, setSearchTerm] = useState("");
  // const [hoveredChart, setHoveredChart] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredChartArray = chartsData.filter((chart) =>
    chart.heading.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleChartView = (chartId: string) => {
    navigate(`chart-builder/${chartId}`);
  };

  
  // useEffect(()=>{
  //   removeCodeFromDB("selected-XAxis")
  // .then(() => {
  //   console.log(`Data with id selected-XAxis removed successfully`);
  // })
  // .catch((error) => {
  //   console.error(`Error removing data: ${error}`);
  // });
  // removeCodeFromDB("selected-YAxis")
  // .then(() => {
  //   console.log(`Data with id selected-XAxis removed successfully`);
  // })
  // .catch((error) => {
  //   console.error(`Error removing data: ${error}`);
  // });
  // removeCodeFromDB("selectedXColumn")
  // .then(() => {
  //   console.log(`Data with id selected-XAxis removed successfully`);
  // })
  // .catch((error) => {
  //   console.error(`Error removing data: ${error}`);
  // });
  // removeCodeFromDB("selectedYColumn")
  // .then(() => {
  //   console.log(`Data with id selected-XAxis removed successfully`);
  // })
  // .catch((error) => {
  //   console.error(`Error removing data: ${error}`);
  // });
  // },[params.id])

  return (
    <Grid className={classes.root}>
      <Grid item>
        <TextField
          className={classes.searchField}
          variant="standard"
          size="small"
          onChange={handleSearchChange}
          InputProps={{
            // startAdornment: (
            //   <InputAdornment position="start">
            //     <IconButton size="small" edge="start">
            //       <AiOutlineSearch />
            //     </IconButton>
            //   </InputAdornment>
            // ),
            disableUnderline: true,
            style: { padding: "10px" },
          }}
          placeholder="Search"
        />
      </Grid>

      <Grid
        container
        gap={1}
        sx={{ justifyContent: "center", margin: "10px 0 0 0" }}
      >
        {filteredChartArray?.length > 0 ? (
          filteredChartArray.map((chart, index) => (
            <Grid
              xs={3.5}
              item
              key={index}
              className={
                params.id === chart.id
                  ? classes.listItemSelected
                  : classes.listItem
              }
              // onMouseOver={() => setHoveredChart(chart.Id)}
              // onMouseOut={() => setHoveredChart(null)}
              // style={{
              //   boxShadow: hoveredChart === chart.Id ? '2px 4px 0px 0px #4682B4' : 'none',
              //   border: `1px solid ${hoveredChart === chart.Id ? '#1795D2' : 'transparent'}`,
              // }}
              onClick={() => handleChartView(chart.id)}
            >
              <img
                src={chart.imagePath}
                alt={chart.heading}
                className={classes.listItemImage}
              />
              <br />
              {chart.heading}
            </Grid>
          ))
        ) : (
          <Grid item xs={12} className={classes.listItem}>
            No charts found.
          </Grid>
        )}
      </Grid>
    </Grid>
  );
};

export default ChartList;
