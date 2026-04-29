import  {createSlice} from "@reduxjs/toolkit";


export const applicantSlice = createSlice({
     name: 'jobApplication',
     initialState :{
        allApplicants: [],
     }, 
     reducers: {
     setAllApplicants  : (state, action)=>{
        state.allApplicants = action.payload
     }
     }
});

export const {setAllApplicants } = applicantSlice.actions;
export default applicantSlice.reducer;