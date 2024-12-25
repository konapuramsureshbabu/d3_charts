import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
  Grid,
  IconButton,
  Typography,
  InputAdornment,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import AiImg from "../assets/images/Ai.png";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import { makeStyles } from "@mui/styles";

interface IAiChatPopup {
  isOpen: boolean;
  onClose: () => void;
}

const useStyles = makeStyles({
  titleContainer: {
    background: "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)",
    height: "30px", // Increase the height to center items vertically
    display: "flex",
    alignItems: "center", // Center items vertically
    justifyContent: "space-between", // Space between icon and text
    padding: "0 16px", // Add some padding for better spacing
  },
  titleTextContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center text horizontally
    flexGrow: 0, // Take up remaining space
  },
  messageContainer: {
    display: "flex",
    padding: "8px",
    borderRadius: "8px",
    marginBottom: "8px",
    color: "#000",
    width: "fit-content",
  },
  senderMessage: {
    marginRight: "auto",
    background: "#F5F5F5",
  },
  receiverMessage: {
    marginLeft: "auto",
    background: "linear-gradient(98.56deg, #52C7FF 0%, #0D8DCB 66.3%)",
  },
  sendButton: {
    color: "linear-gradient(91.62deg, #52C7FF 0%, #0D8DCB 64.83%)",
  },
});

const AiChatPopup: React.FC<IAiChatPopup> = ({ isOpen, onClose }) => {
  const classes = useStyles();
  const [inputMessage, setInputMessage] = useState<string>("");
  const [messages, setMessages] = useState<
    Array<{ text: string; sender: string }>
  >([
    { text: "Hello!", sender: "Sender" },
    { text: "Hi there!", sender: "Receiver" },
    { text: "How are you", sender: "Sender" },
    { text: "Fine, what about you?", sender: "Receiver" },
  ]);

  const handleSendClick = () => {
    if (inputMessage.trim() !== "") {
      setMessages([...messages, { text: inputMessage, sender: "Sender" }]);
      setInputMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendClick();
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        style: {
          position: "absolute",
          bottom: 10,
          right: 10,
          minWidth: 300,
        },
      }}
    >
      <DialogTitle className={classes.titleContainer}>
        <Grid item className={classes.titleTextContainer}>
          <img
            src={AiImg}
            alt="AI Icon"
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <Typography variant="body2" style={{ color: "#fff",whiteSpace:"nowrap" }}>
            AI Chat
          </Typography>
        </Grid>

        <Grid container item alignItems="center" justifyContent="flex-end">
          <IconButton style={{color:"#fff"}}>
            <OpenInFullIcon fontSize="small" />
          </IconButton>
          <IconButton  style={{color:"#fff"}}onClick={onClose}>
            <ExpandMoreIcon fontSize="medium" />
          </IconButton>
        </Grid>
      </DialogTitle>

      <DialogContent>
        <Grid m={2}>
          {messages.map((message, index) => (
            <div
              key={index}
              className={`${classes.messageContainer} ${
                message.sender === "Sender"
                  ? classes.senderMessage
                  : classes.receiverMessage
              }`}
            >
              {message.text}
            </div>
          ))}
        </Grid>
      </DialogContent>
      <DialogContent>
        <Grid container spacing={1} alignItems="flex-end">
          <Grid item xs={12}>
            <TextField
              label="Type a message"
              size="small"
              fullWidth
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyDown={handleKeyPress}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      style={{ color: "#52C7FF" }}
                      className={classes.sendButton}
                      onClick={handleSendClick}
                    >
                      <SendIcon />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
        </Grid>
      </DialogContent>
    </Dialog>
  );
};

export default AiChatPopup;
