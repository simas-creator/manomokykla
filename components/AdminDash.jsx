import EditReview from '@/components/EditReview'
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
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
      } catch (error) {
        console.log('eerorr, ', error)
      } finally {
        setLoading(false);
      }
    }
    getAllData()
  }, [])
  const editReview = (r) => {
    setOpen(true)
    setToggleReview(r)
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
        <button onClick={() => setConfirmation(true)} className='text-white space-y-4 leading-[40px] bg-black rounded-lg px-6 py-4 text-3xl hover:opacity-80 md:mt-20 xl:px-12 xl:py-8 xl:text-[48px]'>
          Laukia patvirtinimo
        </button>
        <button onClick={() => setMessages(true)} className='text-white bg-black rounded-lg px-6 py-4 text-3xl hover:opacity-80 md:mt-20 xl:px-12 xl:py-8 xl:text-[48px]'>
          Pranešimai
        </button>
      </div>
      </section>
      </>
    )
  }
  if(confirmation === true) {
    return (        
      <section className='bg-primary mb-4'>
        <button onClick={back} className="px-4 py-2 m-4 md:m-8 border rounded-md text-gray-600 bg-white hover:bg-gray-100">Grįžti atgal</button>
        <h3 className='text-white font-title text-[34px] md:text-[48px] font-medium text-center p-2 md:mb-4'>Laukia patvirtinimo</h3>
              <section className='flex items-center flex-col md:flex-row gap-x-10 justify-center p-8 pt-3'>

                {/*Mokymo istaigos */}
                <div className='max-w-lg w-[95%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow max-w-lg'>
                    <div className=''>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                      {loading && <LoadingSpinner></LoadingSpinner>}
                      {
                        pchools.length > 0 && 
                          pchools.map((s, index) => (
                          <div key={index} className="p-2 border-b ">
                            <p className='truncate'>{s.name}</p> {/* Adjust this to match your data structure */}
                          </div>
                        ))
                        
                      }
                    </div>
                  </div>
                </div>

                {/*Mokytojai */}
                <div className='max-w-lg w-[95%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokytojai</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow'>
                    <div>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    {loading && <LoadingSpinner></LoadingSpinner>}
                    {
                        peachers.length > 0 && 
                          peachers.map((s, index) => (
                          <div key={index} className="p-2 border-b hover:bg-gray-100 cursor-pointer">
                            <p>{s.name}</p>
                          </div>
                        ))
                        
                      }
                      {peachers.length === 0 && <p>Duomenų nerasta.</p>}
                    </div>
                  </div>
                </div>
                {/*Įvertinimai */}
                <div className='max-w-lg w-[95%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Įvertinimai</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow relative'>
                  {toggleReview && open && <EditReview admin={true} review={toggleReview} open={open} setOpen={setOpen}></EditReview>}
                    <div>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <table className="table-fixed w-full border-collapse">
                      <thead className="border-b">
                        <tr>
                          <th className="p-3 w-1/2 text-left">Komentaras</th>
                          <th className="p-3 w-1/2 text-center">Bendras įvertinimas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {peviews.length > 0 &&
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
            <div className='border-b sticky top-0 bg-white'>
              <SearchBar parameter={'Ieškoti'}></SearchBar>
            </div>
            {loading && <LoadingSpinner></LoadingSpinner>}
            {
                schoolReports.length > 0 && 
                  schoolReports.map((s, index) => (
                  <div key={index} className="h-[40px] p-2 px-4 border-b hover:bg-gray-100 cursor-pointer">
                    <p>{s.message}</p>
                  </div>
                ))
                
              }
              {schoolReports.length === 0 && <p>Duomenų nerasta.</p>}
            </div>
          </div>
        </div>
        <div className='max-w-lg w-[95%]'>
          <p className='text-white font-title p-4 text-center text-lg'>Mokytojų</p>
          <div className='bg-white h-[350px] m-auto rounded-xl shadow overflow-auto'>
            <div>
            <div className='border-b sticky top-0'>
              <SearchBar parameter={'Ieškoti'}></SearchBar>
            </div>
            {loading && <LoadingSpinner></LoadingSpinner>}
            {
                teacherReports.length > 0 && 
                  teacherReports.map((s, index) => (
                  <div key={index} className="h-[40px] px-4 p-2 border-b hover:bg-gray-100 cursor-pointer">
                    <p>{s.message}</p>
                  </div>
                ))
                
              }
              {peachers.length === 0 && <p>Duomenų nerasta.</p>}
            </div>
          </div>
        </div>
        </div>
        
      </div>
    )
  }
};

export default Dashb;
