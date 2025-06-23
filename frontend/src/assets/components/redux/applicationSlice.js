import { createSlice } from "@reduxjs/toolkit";

const applicationSlice = createSlice({
  name: "application",
  initialState: {
    allApplicants: [], // Initializing as an empty array
  },
  reducers: {
    setAllApplicants: (state, action) => {
      state.allApplicants = action.payload; // Setting all applicants from the payload
    },
  },
});

// Export the action to be used in dispatch
export const { setAllApplicants } = applicationSlice.actions;

// Export the reducer to be used in store configuration
export default applicationSlice.reducer;
