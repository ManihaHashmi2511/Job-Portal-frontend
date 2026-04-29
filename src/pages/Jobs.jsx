import React, { useState, useEffect } from 'react'
import FilterCard from './FilterCard'
import Job from './Job'
import Navbar2 from '@/components/shared/Navbar2'
import { useSelector } from 'react-redux'
import useGetAllJobs from '@/hooks/useGetAllJobs'
import { motion } from 'framer-motion'

export default function Jobs() {
  useGetAllJobs();

  const {allJobs} = useSelector(store => store.job);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    setFilteredJobs(allJobs);
  }, [allJobs]);

  const handleFilterChange = (filterType, value) => {
    if (filterType === "All" && value === "Reset Filters") {
      setFilteredJobs(allJobs);
      return;
    }

    if (!value) {
      setFilteredJobs(allJobs);
      return;
    }

    let filtered = allJobs.filter(job => {
      if (filterType === "Location") {
        return job.location === value;
      } else if (filterType === "Job Type") {
        return job.jobType === value;
      } else if (filterType === "Industry") {
        return job.title === value;
      }
      return true;
    });

    setFilteredJobs(filtered);
  };

  return (
    <div>
      <Navbar2 />
      <div className='max-w-7xl mx-auto mt-12 p-5'>
        <div className='flex gap-5'>
          <div className='w-[20%]'>
            <FilterCard onFilterChange={handleFilterChange}/>
          </div>

          {
            filteredJobs.length > 0 ? (
              <div className='flex-1 h-[88vh] overflow-y-auto pb-5  '>
                <div className='grid grid-cols-2 gap-6'>
                  {filteredJobs.map((job) => (
                    <motion.div
                    initial={{ opacity: 0, x:100 }}
                    animate={{ opacity: 1, x:0 }}
                    transition={{ duration: 0.5 }}
                    exit={{ opacity: 0, x:-100 }}
                     key={job?._id}> <Job job={job} />  </motion.div>
                  ))}
                </div>
              </div>
            ) : (
              <div className='w-[80%]'>
                <p>No jobs found</p>
              </div>
            )
          }

        </div>
      </div>

    </div>
  )
}
