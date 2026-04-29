import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./authSlice";
import {jobSlice} from "./jobSlice";
import { companySlice } from "./companySlice";
import { applicantSlice } from "./applicantSlice";



export const store = configureStore({
  reducer: {
    auth: authSlice.reducer, 
    job: jobSlice.reducer,
    company: companySlice.reducer,
    application: applicantSlice.reducer
  }
})
