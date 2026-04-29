import { setSingleJob } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import API_BASE_URL from '@/api/config';

export default function useGetSingleJob({jobId}) {

  const dispatch = useDispatch();
  useEffect(() => {
    // Function to fetch single job from the backend
    const fetchSingleJob = async () => {
        try {
             const res = await axios.get(`${API_BASE_URL}/api/jobs/get/${jobId}`, {withCredentials: true}); 
                if(res.status === 200){
                  dispatch(setSingleJob(res.data.job));
                }
        } 
        
        catch (error) {
            console.error("Error fetching job:", error);
        }
    };
  if(jobId) fetchSingleJob();

}, [jobId, dispatch]);

}
