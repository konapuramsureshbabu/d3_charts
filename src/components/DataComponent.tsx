/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Chip,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useEffect, useState } from "react";
import { DrawScatterPlot } from "../charts/ScatteredPlot";
import { DrawAreaChart } from "../charts/AreaChart/index";
import AreaChartStyles from "../charts/AreaChart/styles.json";
import columnChartStyles from "../charts/ColumnChart/styles.json";
import { drawColumnChart } from "../charts/ColumnChart/index";
import { DrawPieChart } from "../charts/PieChart/index";
import { DrawMultiLineChart } from "../charts/MultiLineChart";
import { DrawCalendarChart } from "../charts/CalendarChart/index";
import scatterPlotStyles from "../charts/ScatteredPlot/styles.json";
import pieChartStyles from "../charts/PieChart/styles.json";
import multiLineChartStyles from "../charts/MultiLineChart/styles.json";
import { useParams } from "react-router-dom";
import { getCodeFromDB, saveCodeToDB } from "../db";
import { useAppDispatch } from "../redux/redux-hooks";
import { chartConfigSliceActions } from "../redux/slices/chartConfigSlice";

interface IDataCompoennt {
  data?: any;
}
interface XDataEntry {
  [key: string]: string[];
}

interface YDataEntry {
  [key: string]: string[];
}

const useStyles = makeStyles({
  container: {
    transition: "margin-left 0.3s",
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
  },
  optionsContainer: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
  },
});

const DataComponent: React.FC<IDataCompoennt> = ({ data }) => {
  const classes = useStyles();
  const params = useParams();
  const dispatch = useAppDispatch();
  const [defaultData, setDefaultData] = useState(data);

  const allKeys = Array.from(
    new Set(data?.data?.flatMap((item: any) => Object.keys(item)))
  );
  const [xValue, setXValue] = useState<any>("genre" || "name" || []);
  const [yValue, setYValue] = useState<any>("na_sales" || "value" || []);
  const [dropData, setDropData] = useState<any>();
  const defaultDataLength = defaultData?.data && defaultData?.data?.length;
  const defaultDataColumns = defaultData?.data[defaultDataLength - 1];
  const [selectedFilterOption, setSelectedFilterOption] = useState<any>("");
  const [getFValues, setGetFValues] = useState<any>();
  const [getFilterValues, setGetFilterValues] = useState<any>();
  const [selectYValue, setSelectedYValue] = useState<any>();
  const [keysXArray, setKeysXArray] = useState<any[]>([]);
  const [keysYArray, setKeysYArray] = useState<any[]>([]);
  const [valuesXArray, setValuesXArray] = useState<any>([]);
  const [valuesYArray, setValuesYArray] = useState<any>([]);

  useEffect(() => {
    const newData = { ...data };
    newData.data = [...newData.data, { columns: allKeys }];

    setDefaultData(newData);
  }, [params.id, data]);

  useEffect(() => {
    getCodeFromDB("selected-FilteredAxis")
      .then((yAxis: any) => {
        if (yAxis) {
          const uniqueYValuesSet = new Set(yAxis);

          const uniqueYValuesArray = Array.from(uniqueYValuesSet);
          setGetFilterValues(uniqueYValuesArray);
        } else {
          console.log("Code not found for the given id:", params.id);
        }
      })
      .catch((error) => {
        console.error("Error retrieving code from IndexedDB:", error);
      });
  }, [selectedFilterOption, params.id, getFValues]);

  const handleChange = (event: any) => {
    setSelectedFilterOption(event.target.value);
  };

  const handleYValueChange = (event: any) => {
    setSelectedYValue(event.target.value);
  };

  const Filteroptions = [
    { value: "in", label: "in" },
    { value: "=", label: "Equal to(=)" },
    { value: "#", label: "Not equal to(#)" },
    { value: "<", label: "Less than(<)" },
    { value: "<=", label: "Less or Equal(<=)" },
    { value: ">", label: "Greater than(>)" },
    { value: ">=", label: "Greater or Equal(>=)" },
    { value: "not", label: "Not in", disabled: true },
  ];

  const handleXAxisChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;
    const removedKey = keysXArray.find((key) => !value.includes(key));

    if (removedKey) {
      setKeysXArray(value);
      const updatedValuesArray = valuesXArray.filter(
        (entry: any) => Object.keys(entry)[0] !== removedKey
      );
      setValuesXArray(updatedValuesArray);
    } else {
      const key = value[value.length - 1];
      keysXArray.push(key);
      let columnValues;
      if (dropData?.length > 0) {
        columnValues = dropData?.map((val: any) => val[key]);
      } else {
        columnValues = defaultData?.data?.map((val: any) => val[key]);
      }
      valuesXArray.push({ [key]: columnValues });
      setValuesXArray(valuesXArray);
      const updatedXAxis = [...xValue, key];
      setXValue(updatedXAxis);
      dispatch(chartConfigSliceActions.setKeysXArray(keysXArray));
    }
  };

  const handleYAxisChange = (event: SelectChangeEvent<any>) => {
    const {
      target: { value },
    } = event;

    value.forEach(async (newKey: string) => {
      const removedKey = keysYArray.find((key) => !value.includes(key));
      if (removedKey) {
        setKeysYArray(value);
        const updatedValuesArray = valuesYArray.filter(
          (entry: any) => Object.keys(entry)[0] !== removedKey
        );
        setValuesYArray(updatedValuesArray);
      } else {
        const updatedKeysArray = [...keysYArray, newKey];
        setKeysYArray(updatedKeysArray);
        let columnValues;
        if (dropData?.length > 0) {
          columnValues = dropData?.map((val: any) => val[newKey]);
        } else {
          columnValues = defaultData?.data?.map((val: any) => val[newKey]);
        }

        const updatedValuesArray = [
          ...valuesYArray,
          { [newKey]: columnValues },
        ];
        setValuesYArray(updatedValuesArray);

        const updatedYAxis = [...yValue, newKey];
        setYValue(updatedYAxis);
        dispatch(chartConfigSliceActions.setKeysYArray(updatedKeysArray));
      }
    });
  };

  const handleFilterChange = async (event: SelectChangeEvent<any>) => {
    if (defaultData && defaultData.data) {
      const selectedColumn = event.target.value;
      const columnValues = defaultData.data.map(
        (val: any) => val[selectedColumn]
      );
      const filteredColumnValues = columnValues.filter(
        (value: any) => value !== undefined
      );
      setGetFValues(filteredColumnValues);
      await saveCodeToDB("selected-FilteredAxis", filteredColumnValues);
    }
    const selectedColumn = event.target.value;
    const columnValues = dropData?.map((val: any) => val[selectedColumn]);
    setGetFValues(columnValues);
    await saveCodeToDB("selected-FilteredAxis", columnValues);
  };

  const renderChart = (dataToRender: any) => {
    try {
      if (params.id === "area-chart") {
        const options = {
          id: params.id,
          dimension: keysXArray,
          measures: keysYArray,
          filterValues: getFValues,
          filters: [selectedFilterOption, selectYValue],
        };
        DrawAreaChart(options, dataToRender, AreaChartStyles);
      } else if (params.id === "column-chart") {
        const options = {
          id: params.id,
          dimension: keysXArray,
          measures: keysYArray,
          filterValues: getFValues,
          filters: [selectedFilterOption, selectYValue],
        };
        drawColumnChart(options, dataToRender, columnChartStyles);
      } else if (params.id === "scatter-plot") {
        const options = {
          id: params.id,
          dimension: keysXArray,
          measures: keysYArray,
          filterValues: getFValues,
          filters: [selectedFilterOption, selectYValue],
        };
        DrawScatterPlot(options, dataToRender, scatterPlotStyles);
      } else if (params.id === "pie-chart") {
        const seletctedXAixsPie = keysXArray.map((item: any) => ({
          name: item,
          hidden: false,
        }));
        const options = {
          id: params.id,
          dimension: seletctedXAixsPie,
          measures: keysYArray,
          filters: [],
        };
        DrawPieChart(options, dataToRender, pieChartStyles);
      } else if (params.id === "multi-line-chart") {
        const options = {
          id: params.id,
          dimension: keysXArray,
          measures: keysYArray,
          filters: [],
        };
        DrawMultiLineChart(options, dataToRender, multiLineChartStyles);
      } else if (params.id === "calendar-chart") {
        DrawCalendarChart(params.id, dataToRender);
      }
    } catch (error) {
      console.error("Error rendering chart:", error);
    }
  };

  useEffect(() => {
    getCodeFromDB("SourceData")
      .then((code) => {
        if (code) {
          setDropData(code);
          setKeysXArray([]);
          setKeysYArray([]);
        } else {
          console.log("Code not found for the given id:", params.id);
        }
      })
      .catch((error) => {
        console.error("Error retrieving code from IndexedDB:", error);
      });
  }, [params.id]);

  useEffect(() => {
    const DataToSend = {
      xData: valuesXArray,
      yData: valuesYArray,
    };
    const transformData = (xData: XDataEntry[], yData: YDataEntry[]) => {
      const transformedData: any[] = [];
      xData.forEach((xEntry) => {
        for (let i = 0; i < xEntry[Object.keys(xEntry)[0]]?.length; i++) {
          const combinedData: any = {};
          Object.keys(xEntry).forEach((dimension) => {
            combinedData[dimension] = xEntry[dimension][i];
          });
          yData.forEach((yObj) => {
            const measure = Object.keys(yObj)[0];
            const measureValues = yObj[measure];
            if (measureValues && measureValues[i] !== undefined) {
              combinedData[measure] = measureValues[i];
            }
          });
          if (
            Object.values(combinedData).every((value) => value !== undefined)
          ) {
            transformedData.push(combinedData);
          }
        }
      });

      return transformedData;
    };
    const transformedData = transformData(DataToSend.xData, DataToSend.yData);

    renderChart(transformedData);
  }, [
    params.id,
    keysXArray,
    keysYArray,
    valuesXArray,
    valuesYArray,
    selectedFilterOption,
    selectYValue,
    getFValues,
    yValue,
    xValue,
  ]);

  return (
    <Box className={classes.container}>
      <Grid container className={classes.optionsContainer} spacing={2}>
        <Grid item xs={12}>
          <Typography
            fontSize={13}
            style={{ color: "#000000", fontWeight: "500" }}
          >
            Dimensions
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {dropData && dropData.columns ? (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Select
                  multiple
                  value={keysXArray}
                  onChange={handleXAxisChange}
                  fullWidth={true}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ height: "20px" }}
                        />
                      ))}
                    </Box>
                  )}
                  variant="outlined"
                  size="small"
                  inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                  sx={{ font: "12px", height: 30, width: "100%" }}
                >
                  {dropData.columns.map((item: string, i: number) => (
                    <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          ) : (
            <Grid container spacing={2} justifyContent="center">
              <Grid item xs={12}>
                <Select
                  multiple
                  value={keysXArray}
                  fullWidth={true}
                  onChange={handleXAxisChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  variant="outlined"
                  size="small"
                  inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                  sx={{ font: "12px", height: 35, width: "100%" }}
                >
                  {defaultDataColumns?.columns?.map(
                    (item: string, i: number) => (
                      <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.optionsContainer} spacing={2}>
        <Grid item xs={12}>
          <Typography
            fontSize={13}
            style={{ color: "#000000", fontWeight: "500" }}
          >
            Measures
          </Typography>
        </Grid>
        <Grid item xs={12}>
          {dropData && dropData?.columns ? (
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Select
                  multiple
                  value={keysYArray}
                  onChange={handleYAxisChange}
                  renderValue={(selected) => (
                    <Box sx={{ 
                      display: "flex", 
                      flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ height: "20px" }}
                        />
                      ))}
                    </Box>
                  )}
                  variant="outlined"
                  size="small"
                  inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                  sx={{
                    font: "12px",
                    minHeight: 30,
                    width: "100%",
                  }}
                >
                  {dropData?.columns.map((item: string, i: number) => (
                    <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
                      {item}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          ) : (
            <Grid container justifyContent="center">
              <Grid item xs={12}>
                <Select
                  multiple
                  value={keysYArray}
                  onChange={handleYAxisChange}
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{ height: "20px" }}
                        />
                      ))}
                    </Box>
                  )}
                  variant="outlined"
                  size="small"
                  inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                  sx={{ font: "12px", width: "100%",minHeight:25 }}
                >
                  {defaultDataColumns?.columns?.map(
                    (item: string, i: number) => (
                      <MenuItem key={i} value={item} sx={{ fontSize: "12px" }}>
                        {item}
                      </MenuItem>
                    )
                  )}
                </Select>
              </Grid>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Grid container className={classes.optionsContainer} spacing={2}>
        <Grid item xs={12}>
          <Typography
            fontSize={13}
            style={{ color: "#000000", fontWeight: "500" }}
          >
            Filters
          </Typography>
        </Grid>
        <Grid item xs={12} container>
          <Grid item xs={3.5}>
            {/* <FormControl sx={{ mb: 1 }}> */}
            {dropData && dropData?.columns ? (
              <Select
                value={getFValues}
                onChange={handleFilterChange}
                labelId="filter-label"
                id="filtefvesdr"
                variant="outlined"
                size="small"
                fullWidth={true}
                inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                sx={{ font: "12px", height: 30, width: "100%" }}
              >
                {dropData?.columns?.map((option: any) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{ fontSize: "12px" }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            ) : (
              <Select
                value={getFValues}
                onChange={handleFilterChange}
                labelId="filter-label"
                id="filtefvesdr"
                variant="outlined"
                inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
                size="small"
                fullWidth={true}
                sx={{ font: "12px", height: 30, width: "100%" }}
              >
                {defaultDataColumns?.columns?.map((option: any) => (
                  <MenuItem
                    key={option}
                    value={option}
                    sx={{ fontSize: "12px" }}
                  >
                    {option}
                  </MenuItem>
                ))}
              </Select>
            )}
            {/* </FormControl> */}
          </Grid>
          <Grid item xs={3.5} ml={1} mr={2}>
            {/* <FormControl sx={{ my: 1 }}> */}
            {/* <InputLabel
          id="filter-label"
          size="small"
          variant="outlined"
          sx={{ fontSize: "13px" }}
        >
          Select a filter
        </InputLabel> */}
            <Select
              value={selectedFilterOption}
              onChange={handleChange}
              labelId="filter-label"
              id="filter"
              label="Select a filter"
              variant="outlined"
              size="small"
              fullWidth={true}
              inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
              sx={{ font: "8px", height: 30, width: "100%" }}
            >
              {Filteroptions?.map((option: any) => (
                <MenuItem
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  sx={{ fontSize: "12px" }}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
          </Grid>
          <Grid item xs={3.5}>
            {/* <FormControl sx={{ mt: 1 }}> */}
            <Select
              value={selectYValue}
              onChange={handleYValueChange}
              variant="outlined"
              size="small"
              inputProps={{ sx: { textAlign: "center", fontSize: "13px" } }}
              sx={{ font: "12px", height: 30, width: "100%" }}
              fullWidth={true}
            >
              {getFilterValues?.map((option: any) => (
                <MenuItem key={option} value={option} sx={{ fontSize: "12px" }}>
                  {option}
                </MenuItem>
              ))}
            </Select>
            {/* </FormControl> */}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataComponent;
