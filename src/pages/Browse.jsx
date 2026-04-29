import Navbar2 from '@/components/shared/Navbar2'
import React, { useEffect } from 'react'
import Job from './Job'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { useDispatch, useSelector } from 'react-redux'
import { setAllJobs, setSearchedQuery } from '@/redux/jobSlice'

export default function Browse() {
  const dispatch = useDispatch();
  const { allJobs } = useSelector(store => store.job);

  useGetAllJobs();

  useEffect(() => {
    dispatch(setAllJobs([])); // Clear previous jobs on mount to avoid showing stale data
  }, []);

  useEffect(()=>{
    return ()=>{
      dispatch(setSearchedQuery(""));
    }

  },[])

  return (
    <div>
      <Navbar2/>
      <div className='max-w-6xl mx-auto my-10'>
        <h1 className='text-[20px] font-bold my-10'>Search Results ({allJobs.length})</h1>
        <div className='grid grid-cols-3 gap-5'>
          {
            allJobs.map((job) => (
              <Job key={job._id} job={job} />
            ))
          }
        </div>
      </div>
    </div>
  )
}
