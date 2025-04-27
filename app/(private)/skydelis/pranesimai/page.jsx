"use client"
import { useEffect, useState } from 'react';
import SearchBar from '@/components/UI/SearchBar';
import LoadingSpinner from '@/components/UI/LoadingSpinner';
import ViewMessage from '@/components/dashboard/ViewMessage';
const Page = () => {

    const [teacherMessage, setTeacherMessage] = useState(false);
    const [schoolMessage, setSchoolMessage] = useState(false);
    const [toggleTeacherMessage, setToggleTeacherMessage] = useState({})
    const [toggleSchoolMessage, setToggleSchoolMessage] = useState({})
    
    const [teacherNames, setTeacherNames] = useState({})
    const [schoolNames, setSchoolNames] = useState({})

    const [schoolReports, setSchoolReports] = useState([])
    const [teacherReports, setTeacherReports] = useState([])
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getData = async () => {
            try {
                setLoading(true)
                const res = await fetch(`/api/dashboard/admin/pranesimai`, {
                    method: "GET"
                })
                const data = await res.json();
                console.log(data, 'our data')
                setSchoolReports(data.schoolReports)
                setTeacherReports(data.teacherReports)
                setTeacherNames(data.teacherNames)
                setSchoolNames(data.schoolNames)
            } catch (error) {
                console.log(error, 'error')
            } finally {
                setLoading(false);
            }
        }
        getData();
    }, [])
    const viewTeacherMessage = (s) => {
        setToggleTeacherMessage(s);
        setTeacherMessage(true);
      }
      const viewSchoolMessage = (s) => {
        setToggleSchoolMessage(s);
        setSchoolMessage(true);
      }
      return (
        <div className='bg-primary h-[100vh] pt-10 min-h-fit'>
          <h3 className='text-white font-title text-[34px] md:text-[48px] font-medium text-center p-2 md:mb-4'>Pranešimai</h3>
          <div className=' w-full flex flex-col items-center p-8 pt-3 md:flex-row justify-center gap-x-20'>
          <div className='max-w-lg w-[95%]'>
            <p className='text-white font-title p-4 text-center text-lg'>Mokyklų</p>
            <div className='bg-white h-[350px] m-auto  shadow overflow-auto'>
              {schoolMessage && <ViewMessage name={schoolNames} setOpen={setSchoolMessage} type={'school'} object={toggleSchoolMessage}></ViewMessage>}
              {!schoolMessage && <div>
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
                    <div key={index} onClick={() => viewSchoolMessage(s)} className="h-[56px] flex items-center justify-between p-2 px-4 border-b hover:bg-gray-100 cursor-pointer">
                      <p className='truncate w-1/2'>{s.message}</p>
                      <p className='font-medium w-1/2 px-4 text-center truncate'>{schoolNames[`${s.school}`]}</p>
                    </div>
                  ))
                  
                }
                {schoolReports?.length === 0 && <p className='text-center p-10'>Duomenų nerasta.</p>}
              </div>}
              
            </div>
          </div>
          <div className='max-w-lg w-[95%]'>
            <p className='text-white font-title p-4 text-center text-lg'>Mokytojų</p>
            <div className='bg-white h-[350px] m-auto shadow overflow-auto'>
            {teacherMessage && <ViewMessage name={teacherNames} setOpen={setTeacherMessage} type={'teacher'} object={toggleTeacherMessage}></ViewMessage>}
            {!teacherMessage && 
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
                  <div key={index} onClick={() => viewTeacherMessage(s)}  className="h-[56px] flex items-center px-4 p-2 border-b hover:bg-gray-100 cursor-pointer">
                    <p className='truncate w-1/2'>{s.message}</p>
                    <p className='font-medium text-center w-1/2 px-4 truncate'>{teacherNames[`${s.school}-${s.teacher}`].split('-')[0]}</p>
                  </div>
                ))
                
              }
              
              {teacherReports?.length === 0 && <p className='p-10 text-center w-full'>Duomenų nerasta.</p>}
            </div>
            }
              
            </div>
          </div>
          </div>
          
        </div>
      )
}

export default Page