import { setAllAppliedJobs } from '@/redux/jobSlice';
import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import API_BASE_URL from '@/api/config';

export default function useGetAppliedJobs() {
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.auth);

  useEffect(()=>{
    const fetchAppliedJobs = async ()=>{
        try {
            const res = await axios.get(`${API_BASE_URL}/api/applications/getAppliedJobs`, {withCredentials:true});
            console.log(res.data);

            if(res.status === 200){
                dispatch(setAllAppliedJobs(res.data))
            }

        } catch (error) {
            console.log(error);

        }
    }
    if(user){
      fetchAppliedJobs();
    }
  },[user]);

};
