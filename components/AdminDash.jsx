import EditReview from '@/components/EditReview'
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
import Confirm from '@/components/Confirm'
const getTeacher = (n, m) => {
  return 's'
}
const Dashb = ({admin, setAdmin}) => {
  const [loading, setLoading] = useState(true);
  const [pchools, setPchools] = useState([]);
  const [peachers, setPeachers] = useState([]);
  const [peviews, setPeviews] = useState([]);
  const [toggleReview, setToggleReview] = useState({})
  const [open, setOpen] = useState(false);
  const [confirmation, setConfirmation] = useState(false);
  const [messages, setMessages] = useState(false);
  const [schoolReports, setSchoolReports] = useState([])
  const [teacherReports, setTeacherReports] = useState([])

  const [toggleTeacher, setToggleTeacher] = useState({})

  const [reviewsNames, setReviewsNames] = useState({});
  const [teacherNames, setTeacherNames] = useState({})
  const [schoolNames, setSchoolNames] = useState({})
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
        setSchoolReports(data.schoolReports)
        setTeacherReports(data.teacherReports)
        setTeacherNames(data.teacherNames)
        setSchoolNames(data.schoolNames)
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
  const back = () => {
    setConfirmation(false);
    setMessages(false);
  }
  if(!confirmation && !messages) {
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
        <button onClick={() => setConfirmation(true)} className='flex gap-x-2 text-white space-y-4 leading-[40px] bg-black rounded-lg px-6 py-4 text-3xl hover:opacity-80 md:mt-20 xl:px-12 xl:py-8 xl:text-[48px]'>
          Laukia patvirtinimo
          <svg xmlns="http://www.w3.org/2000/svg" fill='#009DFF' x="0px" y="0px" width="40" height="40" viewBox="0 0 50 50">
<path d="M 25 2 C 12.309295 2 2 12.309295 2 25 C 2 37.690705 12.309295 48 25 48 C 37.690705 48 48 37.690705 48 25 C 48 12.309295 37.690705 2 25 2 z M 25 4 C 36.609824 4 46 13.390176 46 25 C 46 36.609824 36.609824 46 25 46 C 13.390176 46 4 36.609824 4 25 C 4 13.390176 13.390176 4 25 4 z M 37.039062 10.990234 A 1.0001 1.0001 0 0 0 36.265625 11.322266 L 26.183594 22.244141 A 3 3 0 0 0 25 22 A 3 3 0 0 0 22 25 A 3 3 0 0 0 25 28 A 3 3 0 0 0 25.5 27.958984 L 29.125 34.486328 A 1.0010694 1.0010694 0 1 0 30.875 33.513672 L 27.246094 26.984375 A 3 3 0 0 0 28 25 A 3 3 0 0 0 27.652344 23.599609 L 37.734375 12.677734 A 1.0001 1.0001 0 0 0 37.039062 10.990234 z"></path>
</svg>
        </button>
        <button onClick={() => setMessages(true)} className='flex items-center  gap-x-2 text-white bg-black rounded-lg px-6 py-4 text-3xl hover:opacity-80 md:mt-20 xl:px-12 xl:py-8 xl:text-[48px]'>
          <p>Pranešimai</p>
          <img className='w-10 h-10' src="\images\flag-country-svgrepo-com.svg" alt="" />
        </button>
      </div>
      </section>
      </>
    )
  }
  if(confirmation === true) {
    return (        
      <section className='bg-primary pb-4'>
         
        <button onClick={back} className="px-4 py-2 m-4 md:m-8 border rounded-md text-gray-600 bg-white hover:bg-gray-100">Grįžti atgal</button>
        <h3 className='text-white font-title text-[34px] md:text-[48px] font-medium text-center p-2 md:mb-4'>Laukia patvirtinimo</h3>
              <section className='flex items-center flex-col md:flex-row gap-x-10 justify-center p-8 pt-3'>

                {/*Mokymo istaigos */}
                <div className='max-w-lg w-[95%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow max-w-lg'>
                    {openSchool ? (<Confirm object={toggleSchool} open={openSchool} setOpen={setOpenSchool}></Confirm>) : (
                      <div className=''>
                    <div>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div className='flex justify-between border-b p-3'>
                      <p className='w-1/2 text-center font-medium'>Mokykla</p>
                      <p className='w-1/2 text-center font-medium'>Tipas</p>
                    </div>
                      
                      {
                        pchools?.length > 0 && 
                          pchools.map((s, index) => (
                          <div key={index} className="cursor-pointer hover:bg-gray-100 p-4 border-b px-6 flex justify-between text-center" onClick={() => editSchool(s)}>
                            <p className='truncate w-1/2'>{s.name}</p>
                            <p className='truncate w-1/2'>{s.type}</p>
                          </div>
                        ))
                        
                      }
                      {pchools?.length === 0 && <p className='text-center p-10'>Duomenų nerasta.</p>}
                    </div>
                    )}
                    
                  </div>
                </div>

                {/*Mokytojai */}
                <div className='max-w-lg w-[95%]'>
                
                  <p className='text-white font-title p-4 text-center text-lg'>Mokytojai</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow'>
                  {openTeacher ? (
                    <Confirm names={teacherNames} object={toggleTeacher} open={openTeacher} setOpen={setOpenTeacher}></Confirm>
                    ) : (
                  <div>
                    <div>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div className='flex justify-between p-3 border-b'>
                      <p className='w-1/2 text-center font-medium'>Mokytojas</p>
                      <p className='w-1/2 text-center font-medium'>Mokykla</p>
                      <p></p>
                    </div>
                    
                    {
                        peachers?.length > 0 && 
                          peachers.map((s, index) => (
                          <div key={index} onClick={() => editTeacher(s)} className="flex px-6 p-4 border-b hover:bg-gray-100 cursor-pointer">
                            <p className='w-1/2 truncate'>{s.name} {s.surname}</p>
                            <p className='w-1/2 truncate'>{schoolNames[`${s.n}`]}</p>
                          </div>
                        ))
                        
                      }
                      {peachers?.length === 0 && <p className='text-center p-10'>Duomenų nerasta.</p>}
                    </div>
                    ) }
                    
                    
                  </div>
                </div>
                {/*Įvertinimai */}
                <div className='max-w-lg w-[95%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Įvertinimai</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow relative'>
                  {toggleReview && open && <EditReview admin={true} review={toggleReview} open={open} setOpen={setOpen}></EditReview>}
                    <div>
                    <div>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <table className="table-fixed w-full border-collapse">
                      <thead className="border-b">
                        <tr>
                          <th className="p-3 w-1/2 text-center">Komentaras</th>
                          <th className="p-3 w-1/2 text-center">Bendras įvertinimas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {peviews?.length > 0 &&
                          peviews.map((r, index) => (
                            <tr onClick={() => editReview(r)} key={index} className="border-b hover:bg-gray-50 cursor-pointer">
                              <td className="w-1/2 p-2 pl-3 truncate">{r.comment.slice(0, 70) + "..."}</td>
                              <td className="w-auto p-2 text-center flex justify-center items-center gap-1">
                                {((r.criterion1 + r.criterion2 + r.criterion3) / 3).toFixed(1)}
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="orange"
                                  width="18"
                                  height="18"
                                >
                                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77l-6.18 3.23L7 14.14 2 9.27l6.91-1.01L12 2z" />
                                </svg>
                              </td>
                            </tr>
                          ))}
                           
                      </tbody>
                    </table>
                    {peviews?.length === 0 && <p className='text-center p-10'>Duomenų nerasta.</p>}
                    </div>
                  </div>
                </div>
              </section>
      </section>
    )
  }
  if(messages === true) {
    return (
      <div className='bg-primary'>
        <button onClick={back} className="px-4 py-2 m-4 md:m-8 border rounded-md text-gray-600 bg-white hover:bg-gray-100">Grįžti atgal</button>
        <h3 className='text-white font-title text-[34px] md:text-[48px] font-medium text-center p-2 md:mb-4'>Pranešimai</h3>
        <div className='w-full flex flex-col items-center p-8 pt-3 md:flex-row justify-center gap-x-20'>
        <div className='max-w-lg w-[95%]'>
          <p className='text-white font-title p-4 text-center text-lg'>Mokyklų</p>
          <div className='bg-white h-[350px] m-auto rounded-xl shadow overflow-auto'>
            <div>
            <div className='sticky top-0 bg-white'>
              <SearchBar parameter={'Ieškoti'}></SearchBar>
            </div>
            <div className='w-full flex justify-between p-2 border-b'>
              <p className='px-4 font-medium text-gray-600 w-1/2 text-center'>Žinutė</p>
              <p className='px-4 font-medium text-gray-600 w-1/2 text-center'>Mokykla</p>
            </div>
            {loading && <LoadingSpinner></LoadingSpinner>}
            {
                schoolReports?.length > 0 && 
                  schoolReports.map((s, index) => (
                  <div key={index} className="h-[56px] flex items-center justify-between p-2 px-4 border-b hover:bg-gray-100 cursor-pointer">
                    <p className='truncate w-1/2'>{s.message}</p>
                    <p className='font-medium w-1/2 px-4 text-center'>{schoolNames[`${s.school}`].slice(0, 24) + '...'}</p>
                  </div>
                ))
                
              }
              {schoolReports?.length === 0 && <p className='text-center p-10'>Duomenų nerasta.</p>}
            </div>
          </div>
        </div>
        <div className='max-w-lg w-[95%]'>
          <p className='text-white font-title p-4 text-center text-lg'>Mokytojų</p>
          <div className='bg-white h-[350px] m-auto rounded-xl shadow overflow-auto'>
            <div>
            <div className=' sticky top-0'>
              <SearchBar parameter={'Ieškoti'}></SearchBar>
            </div>
            <div className='w-full flex justify-between p-2 border-b'>
              <p className='px-4 font-medium text-gray-600 w-1/2 text-center'>Žinutė</p>
              <p className='px-4 font-medium text-gray-600 w-1/2 text-center'>Mokytojas</p>
            </div>
            {loading && <LoadingSpinner></LoadingSpinner>}
            {
                teacherReports?.length > 0 && 
                  teacherReports?.map((s, index) => (
                  <div key={index} className="h-[56px] flex items-center px-4 p-2 border-b hover:bg-gray-100 cursor-pointer">
                    <p className='truncate w-1/2'>{s.message}</p>
                    <p className='font-medium text-center w-1/2 px-4'>{teacherNames[`${s.school}-${s.teacher}`].slice(0, 24)}{teacherNames[`${s.school}-${s.teacher}`].slice(0, 24).length > 24 ? + '...' : ''}</p>
                  </div>
                ))
                
              }
              
              {peachers?.length === 0 && <p>Duomenų nerasta.</p>}
            </div>
          </div>
        </div>
        </div>
        
      </div>
    )
  }
};

export default Dashb;
