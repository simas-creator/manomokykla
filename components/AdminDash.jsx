import EditReview from '@/components/EditReview'
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Confirm from '@/components/Confirm'
import ViewMessage from '@/components/ViewMessage'
import Link from 'next/link';
const Dashb = ({admin, setAdmin}) => {
  const [loading, setLoading] = useState(true);
  const [pchools, setPchools] = useState([]);
  const [peachers, setPeachers] = useState([]);
  const [peviews, setPeviews] = useState([]);
  const [toggleReview, setToggleReview] = useState({})
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);

  const [toggleTeacher, setToggleTeacher] = useState({})

  const [teacherNames, setTeacherNames] = useState({})
  const [openTeacher, setOpenTeacher] = useState(false);
  const [openSchool, setOpenSchool] = useState(false);
  const [toggleSchool, setToggleSchool] = useState({})


  useEffect(() => {

  }, [])
  useEffect(() => {
    const getAllData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/dashboard/admin', {
          method: 'GET'
        })
        const data = await res.json();
        setPchools(data.pSchools)
        setPeachers(data.pTeachers)
        setPeviews(data.pReviews)
        setTeacherNames(data.teacherNames)
      } catch (error) {
        console.log('eerorr, ', error)
      } finally {
        setLoading(false);
      }
    }
    getAllData()
  }, [open, openTeacher, openSchool])
  const editReview = (r) => {
    setOpen(true)
    setToggleReview(r)
  }

  const editTeacher = (t) => {
    setOpenTeacher(true)
    setToggleTeacher(t)
  }
  const editSchool = (s) => {
    setOpenSchool(true);
    setToggleSchool(s)
  }
  if(!confirmation) {
    return (
      <>
      <section className='p-4 bg-primary pb-20 md:p-8 h-[100vh]'>
      <div className=''>
        <div>
            <button className={`${admin === true ? 'bg-white text-black px-2 py-1' : 'bg-black text-gray-300 px-2 py-2 rounded-md'}`} onClick={() => setAdmin(false)}>
              Mokinys
            </button>
            <button className={`${admin === true ? 'bg-primary border border-white text-white px-2 py-2 rounded-md' : 'bg-white px-2 py-1'}`} onClick={() => setAdmin(true)}>
              Admin
            </button>
        </div>
      </div>
      <div className='w-full flex flex-col items-center gap-y-6 mt-20 md:flex-row gap-x-10 justify-center'>
        <button className='flex gap-x-2 text-white space-y-4 leading-[40px] bg-black rounded-lg px-6 py-4 text-3xl hover:opacity-80 md:mt-20 xl:px-12 xl:py-8 xl:text-[48px]'>
        <Link href={`/skydelis/laukia-patvirtinimo`} >Laukia patvirtinimo</Link>
          <svg xmlns="http://www.w3.org/2000/svg" fill='#009DFF' x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
</svg>
        </button>
        <button className='flex items-center  gap-x-2 text-white bg-black rounded-lg px-6 py-4 text-3xl hover:opacity-80 md:mt-20 xl:px-12 xl:py-8 xl:text-[48px]'>
          <Link href={`/skydelis/pranesimai`} >Pranešimai</Link>
          <img className='w-10 h-10' src="\images\flag-country-svgrepo-com.svg" alt="" />
        </button>
      </div>
      </section>
      </>
    )
  }


  
};

export default Dashb;
