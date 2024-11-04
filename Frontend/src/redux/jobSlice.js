import { createSlice } from "@reduxjs/toolkit";

const jobSlice = createSlice({
  name: "job",

  initialState: {
    allJobs: [],
  },
  reducers: {
    setAllobs: (state, action) => {
      state.allJobs = action.payload;
    },
  },
});

export const { setAllobs } = jobSlice.actions;
export default jobSlice.reducer;
