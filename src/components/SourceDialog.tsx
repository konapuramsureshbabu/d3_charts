/* eslint-disable @typescript-eslint/no-explicit-any */
// UploadDialog.tsx
import React, { useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  IconButton,
  Grid,
} from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { makeStyles } from "@mui/styles";
import * as d3 from "d3";
import { saveCodeToDB } from "../db";

interface SourceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  setAnchorEl: any;
}

const useStyles=makeStyles({
    uploadInput: {
        display: "none",
      },
      addMoreButton: {
        backgroundColor: "#4CAF50",
        color: "white",
        fontFamily: "'Roboto', sans-serif",
        fontSize: "14px",
        padding: "8px 16px",
        borderRadius: "4px",
        cursor: "pointer",
        border: "none",
        marginRight: "10px",
      },
      closeButton:{
        backgroundColor: "#888 !important",
        color: "#fff !important",
        borderRadius: "0 !important",
      },
      uploadLabel: {
        cursor: "pointer",
        padding: "6px 12px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        backgroundColor: "#f9f9f9",
        display: "inline-block",
        fontSize: "12px",
      },
})

const SourceDialog: React.FC<SourceDialogProps> = ({
  isOpen,
  onClose,
  setAnchorEl,
}) => {
    const classes=useStyles();
    const [dropData, setDropData] = useState<any>({ data: [] });
    const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);
    // const params = location.href.split('/')[5];


    const handleAddMore = () => {
        const newInput = document.createElement("input");
        newInput.type = "file";
        newInput.accept = ".csv";
        newInput.className = classes.uploadInput;
        newInput.onchange = (e) =>
          onChangeFileUpload(e as unknown as React.ChangeEvent<HTMLInputElement>);
        document.body.appendChild(newInput);
        newInput.click();
        document.body.removeChild(newInput);
      };

      useEffect(() =>{
        // console.log("dropDatat",dropData)
      },[dropData])
    
    
      const onChangeFileUpload = async (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        const fileInput = event.target;
        if (!fileInput || !fileInput.files || fileInput.files.length === 0) {
          return;
        }
        const newFiles = Array.from(fileInput.files);
    
        setUploadedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    
        for (const file of newFiles) {
          try {
            const csvDataRaw = await readCSVFile(file);
            if (Array.isArray(csvDataRaw)) {
              const csvData: any[] = csvDataRaw;
              const transformedData = {
                data: csvData,
              };
              setDropData((prevData: any) => ({
                data: [...prevData.data, transformedData.data],
              }));
              
            //   console.log("data",dropData,transformedData)
            } else {
              console.error("CSV data is not in the expected format:");
            }
          } catch (error) {
            console.error("Error reading CSV file:", error);
          }
        }
      };
    
      const readCSVFile = (file: any) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (e) => {
            if (e && e.target) {
              const csvData = d3.csvParse(e.target.result as string);
              resolve(csvData);
            } else {
              reject(new Error("Error reading CSV file: Event or target is null."));
            }
          };
          reader.onerror = (error) => reject(error);
          reader.readAsText(file);
        });
      };

      const handleSaveFileToDB = async () => {
        // console.log("File saved to DB with fileId:", dropData, params, "File:");
         await saveCodeToDB("SourceData",dropData.data[0]);
         setAnchorEl(null)
        // if (uploadedFiles.length > 0) {
            
        // //   const fileToSave = uploadedFiles[uploadedFiles.length - 1]; // Assuming you want to save the latest uploaded file
        // }
        onClose()
        window.location.reload();
      };
    
      const handleCancel = (index: number) => {
        setUploadedFiles((prevFiles) => {
          const updatedFiles = [...prevFiles];
          updatedFiles.splice(index, 1);
          return updatedFiles;
        });
    
        setDropData((prevData: any) => {
          const updatedData = { data: [...prevData.data] };
          updatedData.data.splice(index, 1);
          return updatedData;
        });
      };


  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Upload CSV</DialogTitle>
      <DialogContent style={{ width: "200px", height: "200px" }}>
        {uploadedFiles.map((file, index) => (
          <Grid key={index}>
            <Grid container alignItems="center">
              <Grid item>
                <Typography variant="body2" component="span">
                  {file.name.length > 8
                    ? file.name.slice(0, 8) + ".."
                    : file.name}
                  <IconButton
                    onClick={() => handleCancel(index)}
                  >
                    <CancelIcon />
                  </IconButton>
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        ))}
        {uploadedFiles.length === 0 ? (
          <label htmlFor="csvFile" className={classes.uploadLabel}>
            {uploadedFiles.length > 0 ? "Files Selected" : "Upload CSV here"}
            <input
              type="file"
              accept=".csv"
              onChange={(e) => onChangeFileUpload(e)}
              id="csvFile"
              className={classes.uploadInput}
              ref={fileInputRef}
            />
          </label>
        ) : (
          <button
            ref={buttonRef}
            onClick={handleAddMore}
            className={classes.addMoreButton}
          >
            Add More
          </button>
        )}
      </DialogContent>
      <DialogActions style={{ justifyContent: "space-between" }}>
        <Button onClick={handleSaveFileToDB} className={classes.closeButton}>
          Save To DB
        </Button>
        <Button onClick={onClose} className={classes.closeButton}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SourceDialog;
