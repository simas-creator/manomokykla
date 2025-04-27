'use client'
import EditReview from '@/components/teacher/EditReview'
import SearchBar from '@/components/UI/SearchBar';
import { useEffect, useState } from 'react';
import Confirm from '@/components/dashboard/Confirm'

const Page = () => {
    const [loading, setLoading] = useState(true);
    const [pchools, setPchools] = useState([]);
    const [peachers, setPeachers] = useState([]);
    const [peviews, setPeviews] = useState([]);
    const [toggleReview, setToggleReview] = useState({})
    const [open, setOpen] = useState(false);
  
    const [toggleTeacher, setToggleTeacher] = useState({})
  
    const [teacherNames, setTeacherNames] = useState({})
    const [openTeacher, setOpenTeacher] = useState(false);
    const [openSchool, setOpenSchool] = useState(false);
    const [toggleSchool, setToggleSchool] = useState({})
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
    return (        
        <section className='bg-black pt-10 pb-4 h-[100vh] min-h-fit'>
           
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
                              <p className='w-1/2 truncate text-center'>{s.name} {s.surname}</p>
                              <p className='w-1/2 truncate text-center'>{(teacherNames[`${s.n}-${s.m}`]).split(' - ')[1]}</p>
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
                                <td className="w-1/2 p-2 pl-3 truncate">{r?.comment?.slice(0, 70) || 'Nėra komentaro' }</td>
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

export default Page