import React, { useEffect } from 'react'
import ApplicantTable from './ApplicantTable'
import Navbar2 from '@/components/shared/Navbar2'
import { useParams } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicantSlice';
import API_BASE_URL from '@/api/config';

export default function Applicants() {

  const params = useParams();
  const dispatch = useDispatch();
  const { allApplicants } = useSelector(state => state.application);

  useEffect(() => {
    const fetchAllApplicants = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/applications/${params.id}/applicants`, { withCredentials: true });
        console.log(res.data);

        if (res.status === 200) {
          const applicants = res.data.map(app => ({
            ...app.applicants,
            status: app.status,
            applicationId: app._id
          }));
          dispatch(setAllApplicants(applicants));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchAllApplicants();
  }, [dispatch, params.id])

  return (
    <>
      <Navbar2 />
      <div className='max-w-6xl mx-auto mt-16'>
        <h1 className='text-[20px] font-bold my-10'>Applicants ({allApplicants.length})</h1>
        <ApplicantTable />
      </div>
    </>
  )
}
