/* eslint-disable @typescript-eslint/no-explicit-any */
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  thumbnailContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "200px",
    transition: "box-shadow 0.3s ease",
    "&:hover": {
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.5)",
    },
  },
  thumbnail: {
    paddingInline: "10px",
    textDecoration: "none",
    color: "inherit",
    cursor: "pointer",
    textAlign: "center",
  },
  thumbnailImage: {
    width: "70px",
    height: "70px",
  },
});

interface IChartThumbnail {
  heading: string;
  imagePath: string;
}

const ChartThumbnail = ({ heading, imagePath }: IChartThumbnail) => {
  const classes = useStyles();
  // const navigate=useNavigate()
  // const isLocalEnvironment = import.meta.env.MODE === "development";
  // const baseUrl = isLocalEnvironment
  //   ? import.meta.env.VITE_API_URL_Local
  //   : import.meta.env.VITE_API_URL_Prod;
  // console.log("isLocalEnvironment", isLocalEnvironment);
  return (
    <>
      <div className={classes.thumbnailContainer}>
        <div className={classes.thumbnail}>
          <img
            src={imagePath}
            alt={heading}
            className={classes.thumbnailImage}
          />
          <p style={{ color: "#000", textAlign: "center" }}>{heading}</p>
        </div>
      </div>
    </>
  );
};

export default ChartThumbnail;
