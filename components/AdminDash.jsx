import EditReview from '@/components/EditReview'
import LoadingSpinner from './LoadingSpinner';
import SearchBar from './SearchBar';
import { useEffect, useState } from 'react';
const Dashb = ({admin, setAdmin}) => {
  const [schools, setSchools] = useState([])
  const [teachers, setTeachers] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [pchools, setPchools] = useState([]);
  const [peachers, setPeachers] = useState([]);
  const [peviews, setPeviews] = useState([]);
  const [toggleReview, setToggleReview] = useState({})
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const getAllData = async () => {
      try {
        const res = await fetch('/api/dashboard/admin', {
          method: 'GET'
        })
        const data = await res.json();
        console.log(data)
        setSchools(data.allSchools)
        setTeachers(data.allTeachers)
        setReviews(data.allReviews)
        setPchools(data.pSchools)
        setPeachers(data.pTeachers)
        setPeviews(data.pReviews)
      } catch (error) {
        console.log('eerorr, ', error)
      }
      
    }
    getAllData()
  }, [])
  const editReview = (r) => {
    setOpen(true)
    setToggleReview(r)
  }
  return (
    <div>
        
        <div className='p-4 bg-primary pb-20 md:p-8'>
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
          {/*Laukia patvirtinimo */}
        <section className='bg-black mt-8 rounded-xl collapse collapse-arrow mb-4'>
        <input type="checkbox" className="peer absolute h-fit" />
          <div className="flex justify-between items-center p-4 rounded-t-xl cursor-pointer">
            <h3 className="text-2xl md:text-2xl text-white font-title p-2">Laukia patvirtinimo</h3>
            <svg
              className="w-6 h-6 text-white transition-transform duration-300 peer-checked:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
          
          <div className='collapse-content grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {/*Mokymo istaigos */}
            <div className='w-full mt-3'>
              <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                <div className='bg-white h-[350px] w-[90%] m-auto overflow-auto rounded-xl shadow max-w-lg'>
                    {
                      pchools &&
                      pchools.map((p, index) => (
                        <div key={index} className='h-14 border flex items-center p-4 justify-between'>
                          <p className='w-1/2 truncate'>{p.name}</p>
                          <button>Peržiūrėti</button>
                        </div>
                      ))
                    }
                </div>
            </div>

            {/*Mokytojai */}
            <div className='w-full mt-3'>
              <p className='text-white font-title p-4 text-center text-lg'>Mokytojai</p>
                <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
      
                </div>
            </div>

            {/*Įvertinimai */}
            <div className='w-full mt-3 mb-8'>
              <p className='text-white font-title p-4 text-center text-lg'>Įvertinimai</p>
                <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
      
                </div>
            </div>
          </div>
          
        </section>
          {/*Duomenys */}
          <p className='text-white font-title text-[34px] md:text-[48px] font-medium text-center p-2 md:p-6'>Duomenys</p>
              <section className='flex items-center flex-col md:flex-row gap-x-10 justify-center'>

                {/*Mokymo istaigos */}
                <div className='max-w-lg w-[85%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow max-w-lg'>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div className=''>
                      {
                        schools.length > 0 && 
                          schools.map((s, index) => (
                          <div key={index} className="p-2 border-b ">
                            <p className='truncate'>{s.name}</p> {/* Adjust this to match your data structure */}
                          </div>
                        ))
                        
                      }
                    </div>
                  </div>
                </div>

                {/*Mokytojai */}
                <div className='max-w-lg w-[85%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokytojai</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow'>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div>
                    {
                        teachers.length > 0 && 
                          teachers.map((s, index) => (
                          <div key={index} className="p-2 border-b">
                            <p>{s.name}</p> {/* Adjust this to match your data structure */}
                          </div>
                        ))
                        
                      }
                    </div>
                  </div>
                </div>
                {/*Įvertinimai */}
                <div className='max-w-lg w-[85%]'>
                  <p className='text-white font-title p-4 text-center text-lg'>Įvertinimai</p>
                  <div className='bg-white h-[350px] m-auto rounded-xl shadow relative'>
                  {toggleReview && open && <EditReview admin={true} review={toggleReview} open={open} setOpen={setOpen}></EditReview>}
                    <div>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div>
                    <table className="table-fixed w-full border-collapse">
                      <thead className="border-b">
                        <tr>
                          <th className="p-3 w-1/2 text-left">Komentaras</th>
                          <th className="p-3 w-1/2 text-center">Bendras įvertinimas</th>
                        </tr>
                      </thead>
                      <tbody>
                        {reviews.length > 0 &&
                          reviews.map((r, index) => (
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
          </div>

        
    </div>
    
  );
};

export default Dashb;
