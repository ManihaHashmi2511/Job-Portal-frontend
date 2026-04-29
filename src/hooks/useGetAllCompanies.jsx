import { setCompanies } from '@/redux/companySlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import API_BASE_URL from '@/api/config';

export default function useGetAllCompanies() {

    const dispatch = useDispatch();
  useEffect(() => {
    // Function to fetch all jobs from the backend
    const fetchAllCompanies = async () => {
        try {
             const res = await axios.get(`${API_BASE_URL}/api/companies/get`, {withCredentials: true}); 
                if(res.status === 200){
                  dispatch(setCompanies(res.data.companies));
                }
        } 
        
        catch (error) {
            console.error("Error fetching jobs:", error);
        }
    };
  fetchAllCompanies();

}, []);


}
        
