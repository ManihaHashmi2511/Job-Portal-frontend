import { createSlice } from "@reduxjs/toolkit";


export const companySlice = createSlice({
    name: "company",
    initialState:{
        singleCompany: null,
        companies: [],
        filterCompaniesByText:"",
    },
     reducers:{
        setSingleCompany: (state, action) => {
            state.singleCompany = action.payload;
        },
        setCompanies: (state, action) => {
            state.companies = action.payload;
        },
        setFilterCompaniesByText: (state, action) => {
            state.filterCompaniesByText = action.payload;
        }
     }
});

export const {setSingleCompany, setCompanies, setFilterCompaniesByText} = companySlice.actions;
export default companySlice.reducer;