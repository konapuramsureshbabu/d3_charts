import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { FaChartLine } from "react-icons/fa6";
import { LuBarChart4 } from "react-icons/lu";
import { FaChartPie } from "react-icons/fa";
import { FaChartArea } from "react-icons/fa";
import { GiProgression } from "react-icons/gi";
import { AiOutlineHeatMap } from "react-icons/ai";
import { PiChartScatterLight } from "react-icons/pi";
import { FaRegChartBar } from "react-icons/fa";
import { AiOutlineRadarChart } from "react-icons/ai";
import { ImTree } from "react-icons/im";
import { LiaCodiepie } from "react-icons/lia";
import { TbChartSankey } from "react-icons/tb";
import { LuGauge } from "react-icons/lu";
import { BsCalendarWeekFill } from "react-icons/bs";

const chartDetails = [
  { id: 1, name: "Area", icon: FaChartArea, color: "#081642",route:"/AreaChart" },
  { id: 2, name: "Bar", icon: LuBarChart4, color: "#081642" ,route:"/BarChart"},
  { id: 3, name: "Pie", icon: FaChartPie, color: "#081642" ,route:"/AreaChart"},
  { id: 4, name: "Line", icon: FaChartLine, color: "#081642" ,route:"/AreaChart"},
  { id: 5, name: "Progressive Bar", icon: GiProgression, color: "#081642" ,route:"/AreaChart"},
  { id: 6, name: "Heat Map", icon: AiOutlineHeatMap, color: "#081642" ,route:"/AreaChart"},
  {
    id: 7,
    name: "Scattered Plot",
    icon: PiChartScatterLight,
    color: "#081642",
    route:"/AreaChart"
  },
  { id: 8, name: "Bar With Line", icon: FaRegChartBar, color: "#081642" ,route:"/AreaChart"},
  { id: 9, name: "Radar Chart", icon: AiOutlineRadarChart, color: "#081642" ,route:"/AreaChart"},
  { id: 10, name: "Tree", icon: ImTree, color: "#081642" ,route:"/AreaChart"},
  { id: 11, name: "Sunburst", icon: LiaCodiepie, color: "#081642" ,route:"/AreaChart"},
  { id: 12, name: "Sankey", icon: TbChartSankey, color: "#081642" ,route:"/AreaChart"},
  { id: 13, name: "Gauge Chart", icon: LuGauge, color: "#081642" ,route:"/AreaChart"},
  { id: 14, name: "Calender", icon: BsCalendarWeekFill, color: "#081642" ,route:"/AreaChart"},
];

const useStyles = makeStyles({
  sidebar: {
    width: "100%",
    height: "100vh",
    backgroundColor: "white",
    color: "#6e7079",
    // paddingLeft: "20px",
    position: "sticky",
    left: 0,
    top: 0,
    float: "left",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    overflowY: "auto",
    overscrollBehavior: "contain",
    margin: 0,
    scrollbarWidth: "thin",
    scrollbarColor: "transparent transparent",
    // overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "3px",
    },

    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#808080", 
      borderRadius: "5px", 
    },

    "&::-webkit-scrollbar-track": {
      backgroundColor: "transparent", 
    },
  },
  listItem: {
    listStyle: "none",
    cursor: "pointer",
    padding: "5px",
    marginBottom: "20px",
    textDecoration: "none",
    "&:hover": {
      borderRight: "5px solid #081642",
      backgroundColor: "rgba(255, 255, 255, 0.8)",
      transition: "border 0.3s",
      textDecoration: "underline",
    },
    "&.selected": {
      borderRight: "3px solid #081642",
      backgroundColor: "#081642",
      color: "white !important",
    },
  },
  listItemContent: {
    display: "flex",
    alignItems: "center",
  },
});

const SideBar: React.FC = () => {
  const classes = useStyles();
  const location=useLocation()
  console.log("location",location.pathname)
  const [selectedItem, setSelectedItem] = useState<number | null>(null);
  useEffect(() => {
    // Set the selected item based on the current location pathname
    const matchingChart = chartDetails.find((chart) => chart.route === location.pathname);
    if (matchingChart) {
      setSelectedItem(matchingChart.id);
    } else {
      setSelectedItem(null);
    }
  }, [location.pathname]);
  const handleItemClick = (itemId: number) => {
    setSelectedItem(itemId === selectedItem ? null : itemId);
  };

  return (
    <div className={classes.sidebar}>
    <ul style={{ padding: 0 }}>
      {chartDetails.map(({ id, name, icon: ChartIcon, color, route }) => (
        <li
          key={id}
          className={`${classes.listItem} ${
            selectedItem === id  ? "selected" : ""
          }`}
          onClick={() => handleItemClick(id)}
        >
          <div className={classes.listItemContent}>
            <Link
              to={route}
              style={{ textDecoration: 'none', color: selectedItem === id ? "white" : color }}
            >
              <ChartIcon
                style={{
                  marginLeft: "10px",
                  marginRight: "10px",
                }}
              />
              <span>{name}</span>
            </Link>
          </div>
        </li>
      ))}
    </ul>
  </div>
  );
};

export default SideBar;
