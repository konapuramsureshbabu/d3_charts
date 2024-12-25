/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from "react";
import { Grid, InputBase, Menu, MenuItem, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import TextSnippetIcon from "@mui/icons-material/TextSnippet";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import HistoryIcon from "@mui/icons-material/History";
import { FaUserCircle } from "react-icons/fa";
import backgroundImage from "../assets/images/Color BG.png";

const useStyles = makeStyles({
  body: {
    margin: "0 !important",
    overflowX: "hidden",
  },
  bgContainer: {
    overflow: "hidden",
    minHeight: "calc(100vh - 56px)",
    backgroundImage: `url('${backgroundImage}')`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    flexDirection: "column",
  },
  sourcebgConatiner: {
    flex: 1,
    backgroundColor: "#ffffff",
    borderRadius: "5px",
    overflowY: "auto",
    boxShadow: "0px 0px 6px #cdcdcd",
  },
  uploadContainer: {
    border: "2px dashed #1E77CC",
    borderRadius: "10px",
    minHeight: "200px",
  },
  textFieldContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    borderRadius: "5px",
    display: "flex",
    alignItems: "end",
  },
  userUploadCsv: {
    color: "#242634",
    background: "#f5f5f5",
    border: "1px solid #D2D2D2",
    padding: "10px",
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
  },
  uploadedFileName: {
    color: "#242634",
    background: "#F8F8F8",
    padding: "10px",

    borderRadius: "5px",
    display: "flex",
    alignItems: "center",
  },
  cardContainer: {
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#fff",
    marginTop: "5px",
  },
  reversedContainer: {
    // display: "grid",
    alignItems: "flex-start",
    width: "fit-content",
  },
  senderMessage: {
    color: "#464646",
    marginLeft: "auto",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #D1D1D1",
    backgroundColor: "#F5F5F5",
    margin: "10px 25px 0 0",
    width: "fit-content",
  },
  receiverMessage: {
    color: "#464646",

    marginRight: "auto",
    padding: "10px",
    borderRadius: "5px",
    backgroundColor: "#ffffff",
    marginTop: "10px",
    width: "fit-content",
  },
  userMessageContainer: {
    display: "flex",
    alignItems: "center",
    // position: "relative",
  },
});

const AiChatPage = () => {
  const classes = useStyles();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    { text: React.ReactNode; sender: string }[]
  >([
    {
      text: 'The data I have is from a CSV file called "ford_escort.csv". It contains information about the year, mileage (in thousands), and price of Ford Escort cars. This data can be used for various purposes, such as data visualization, analysis, and making data-driven decisions.',
      sender: "receiver",
    },
    {
      // text: "Is there any correlation between the year of the car and its price?",
      text: (
        <div style={{ display: "flex" }}>
          <div className={classes.userMessageContainer}>
            Is there any correlation between the year of the car and its price?
          </div>
          <div
            style={{
              position: "absolute",
              right: "0px",
              marginRight: "15px",
            }}
          >
            <FaUserCircle
              style={{
                color: "black",
                width: "20px",
                height: "20px",
                marginLeft: "5px",
              }}
            />
          </div>
        </div>
      ),
      sender: "user",
    },
  ]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string | null>(null);

  const handleMenuOpen = (
    event: React.MouseEvent<SVGSVGElement | HTMLDivElement, MouseEvent>
  ) => {
    const currentTarget = event.currentTarget as HTMLDivElement;
    setAnchorEl(currentTarget);
  };

  const handleEditView = () => {
    handleMenuClose();
  };

  const handleRename = () => {
    handleMenuClose();
  };

  const handleRemove = () => {
    setUploadedFileName(null);
    setSelectedFile(null);
    handleMenuClose();
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && !selectedFile) {
      setUploadedFileName(file.name);
      setSelectedFile(file.name);
    }

    // Clear the input value to allow re-selecting the same file
    event.target.value = "";
  };

  const handleUploadIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleMessageSend = () => {
    if (message.length !== 0) {
      const userMessageWithIcon = (
        <div style={{ display: "flex" }}>
          <div className={classes.userMessageContainer}>{message}</div>
          <div
            style={{
              position: "absolute",
              right: "0px",
              marginRight: "15px",
            }}
          >
            <FaUserCircle
              style={{
                color: "black",
                width: "20px",
                height: "20px",
                marginLeft: "5px",
              }}
            />
          </div>
        </div>
      );

      setMessages((prevMessages) => [
        {
          text: userMessageWithIcon,
          sender: "user",
        },
        ...prevMessages,
      ]);
      setMessage("");
    } else {
      alert("Please Type a Message");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" && message.length !== 0) {
      handleMessageSend();
    }
  };

  return (
    <Grid container className={classes.bgContainer}>
      <Grid container m={1}>
        <Grid item xs={2.5} className={classes.sourcebgConatiner} p={2}>
          <Grid
            item
            className={classes.uploadContainer}
            m={1}
            display="grid"
            alignItems="center"
            justifyContent="center"
          >
            <Grid item textAlign="center">
              <CloudUploadIcon
                style={{
                  width: "50px",
                  height: "50px",
                  color: "#999999",
                  cursor: "pointer",
                }}
                onClick={handleUploadIconClick}
              />
            </Grid>
            <Grid
              item
              style={{
                margin: "auto",
                color: "#999999",

                width: "80%",
                textAlign: "center",
              }}
              mb={2}
            >
              <span>Click to browse or drag and drop your CSV file</span>
            </Grid>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }}
              onChange={handleFileUpload}
            />
            <div
              style={{
                border: "1px solid #cdcdcd",
                width: "60%",
                marginInline: "auto",
              }}
            ></div>
            <Grid item className={classes.textFieldContainer} mb={1}>
              <TextField
                size="small"
                placeholder="Paste Link..."
                InputProps={{
                  style: { fontSize: "12px" },
                  endAdornment: (
                    <ArrowRightAltIcon
                      style={{
                        background:
                          "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)",
                        color: "#ffffff",
                        borderRadius: "5px",
                      }}
                    />
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid item m={2}>
            {uploadedFileName && (
              <>
                <Grid display="flex" alignItems="center" mb={2}>
                  <TextSnippetIcon
                    style={{
                      color: "#464646",
                      marginRight: "5px",
                    }}
                  />
                  <span style={{ color: "#464646" }}>Current Source</span>
                </Grid>
                <div className={classes.userUploadCsv}>
                  {uploadedFileName.length > 20
                    ? uploadedFileName.substring(0, 20)
                    : uploadedFileName}
                  <MoreVertIcon
                    style={{
                      color: "#888888",
                      marginLeft: "auto",
                      fontSize: "small",
                      cursor: "pointer",
                    }}
                    onClick={handleMenuOpen}
                  />
                </div>
              </>
            )}
          </Grid>

          <Grid item m={2} display="flex" alignItems="center">
            <HistoryIcon style={{ color: "#464646", marginRight: "5px" }} />
            <span style={{ color: "#464646" }}>Recent Sources</span>
          </Grid>
          <Grid item m={2}>
            <div className={classes.uploadedFileName}>
              <span>annual-enterprise-surv</span>
              <MoreVertIcon
                style={{
                  color: "#888888",
                  marginLeft: "auto",
                  fontSize: "small",
                }}
                // onClick={handleMenuOpen}
              />
            </div>
          </Grid>
          <Grid item m={2}>
            <div className={classes.uploadedFileName}>
              <span>industry.csv</span>
              <MoreVertIcon
                style={{
                  color: "#888888",
                  marginLeft: "auto",
                  fontSize: "small",
                }}
                // onClick={handleMenuOpen}
              />
            </div>
          </Grid>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleEditView} sx={{ fontSize: "13px" }}>
              Edit/View
            </MenuItem>
            <MenuItem onClick={handleRename} sx={{ fontSize: "13px" }}>
              Rename
            </MenuItem>
            <MenuItem onClick={handleRemove} sx={{ fontSize: "13px" }}>
              Remove
            </MenuItem>
          </Menu>
          <Grid item m={2}>
            <div className={classes.uploadedFileName}>
              <span>machine-readable-bus</span>
              <MoreVertIcon
                style={{
                  color: "#888888",
                  marginLeft: "auto",
                  fontSize: "small",
                }}
                // onClick={handleMenuOpen}
              />
            </div>
          </Grid>
        </Grid>
        <Grid item pl={2} pr={1} xs={9.5} container>
          <Grid className={classes.reversedContainer}>
            {messages
              .slice(0)
              .reverse()
              .map((msg, index) => (
                <div
                  key={index}
                  className={`${classes.cardContainer} ${
                    msg.sender === "user"
                      ? classes.senderMessage
                      : classes.receiverMessage
                  }`}
                >
                  {msg.text}
                </div>
              ))}
          </Grid>
          <Grid item xs={12} className={classes.inputContainer}>
            <Grid
              item
              style={{
                backgroundColor: "#ffffff",
                width: "100%",
                display: "flex",
                alignItems: "center",
                borderRadius: "5px",
                boxShadow: "0px 0px 8px #cdcdcd",
              }}
              p={1.5}
            >
              <InputBase
                size="small"
                placeholder="Type your message"
                fullWidth
                // variant="standard"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                inputProps={{
                  style: { fontSize: "14px", alignItems: "center" },
                }}
              />
              <button
                onClick={handleMessageSend}
                disabled={message.length === 0}
                style={{
                  background:
                    message.length !== 0
                      ? "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)"
                      : "lightblue",
                  color: "#ffffff",
                  borderRadius: "5px",
                  marginLeft: "10px",
                  padding: "10px 20px",
                  cursor: "pointer",
                  border: "none",
                }}
              >
                Send
              </button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default AiChatPage;
