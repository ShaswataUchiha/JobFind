import { createSlice } from "@reduxjs/toolkit";

const companySlice = createSlice({
    name : "company",
    initialState : {
        singleCompany : null,
    },
    reducers : {
        setSingleComapny : (state, action) => {
            state.singleCompany = action.payload
        }
    }
})

export const {setSingleComapny} = companySlice.actions;
export default companySlice.reducer