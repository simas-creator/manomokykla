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
  return (
    <div>
        <div className='p-4 bg-primary pb-20 md:p-8'>
          <div className='flex justify-end'>
            <div>
                <button className={`${admin === true ? 'bg-white text-black px-2 py-1' : 'bg-black text-gray-300 px-2 py-2 rounded-md'}`} onClick={() => setAdmin(false)}>
                  Mokinys
                </button>
                <button className={`${admin === true ? 'bg-primary border border-white text-white px-2 py-2 rounded-md' : 'bg-white px-2 py-1'}`} onClick={() => setAdmin(true)}>
                  Admin
                </button>
            </div>
          </div>
          {/*Duomenys */}
          <p className='text-white font-title text-[34px] md:text-[48px] font-medium text-center p-2 md:p-6'>Duomenys</p>
              <section className='grid grid-col-1 md:grid-cols-2 lg:grid-cols-3'>

                {/*Mokymo istaigos */}
                <div className='w-full'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                  <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div className=''>
                      {
                        schools.length > 0 && 
                          schools.map((s, index) => (
                          <div key={index} className="p-2 border-b">
                            <p>{s.name}</p> {/* Adjust this to match your data structure */}
                          </div>
                        ))
                        
                      }
                    </div>
                  </div>
                </div>

                {/*Mokytojai */}
                <div className='w-full'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                  <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
                {/*Mokymo istaigos */}
                <div className='w-full'>
                  <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                  <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
                    <div className='border-b'>
                      <SearchBar parameter={'Ieškoti'}></SearchBar>
                    </div>
                    <div>

                    </div>
                  </div>
                </div>
              </section>
          </div>

        {/*Laukia patvirtinimo */}
        <section className='bg-black pb-16 pt-8'>
          <h3 className='text-[34px] md:text-[48px] text-center text-white font-title p-2 md:p-6'>Laukia patvirtinimo</h3>
          <div className=' grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
              {/*Mokymo istaigos */}
            <div className='w-full mt-3'>
              <p className='text-white font-title p-4 text-center text-lg'>Mokymo įstaigos</p>
                <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
      
                </div>
            </div>

            {/*Mokytojai */}
            <div className='w-full mt-3'>
              <p className='text-white font-title p-4 text-center text-lg'>Mokytojai</p>
                <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
      
                </div>
            </div>

            {/*Įvertinimai */}
            <div className='w-full mt-3'>
              <p className='text-white font-title p-4 text-center text-lg'>Įvertinimai</p>
                <div className='bg-white h-[350px] w-[90%] m-auto rounded-xl shadow max-w-lg'>
      
                </div>
            </div>
          </div>
          
        </section>
    </div>
    
  );
};

export default Dashb;
