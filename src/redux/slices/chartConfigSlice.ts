// slices/ChartConfigSlice.ts
import { createSlice} from '@reduxjs/toolkit';

interface ChartConfigState {
  keysXArray: string[];
  keysYArray: string[];
}

const initialState: ChartConfigState = {
  keysXArray: [],
  keysYArray: [],
};

const chartConfigSlice = createSlice({
  name: 'chartConfig',
  initialState,
  reducers: {
    setKeysXArray: (state, action) => {
      state.keysXArray = action.payload;
    },
    setKeysYArray: (state, action) => {
      state.keysYArray = action.payload;
    },
  },
});

export const chartConfigSliceActions  = chartConfigSlice.actions;
export default chartConfigSlice.reducer;
