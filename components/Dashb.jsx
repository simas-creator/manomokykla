import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import EditReview from '@/components/EditReview'
import LoadingSpinner from './LoadingSpinner';
import AdminDash from '@/components/AdminDash'
const Dashb = () => {
  const [s, setS] = useState()
  const [r, setR] = useState()
  const [t, setT] = useState()
  const [a, setA] = useState()
  const [role, setRole] = useState('viewer')
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false)
  const [reviewData, setReviewData] = useState()
  const [teacherNames, setTeacherNames] = useState({});
  const { data: session } = useSession();
  const toggleAdmin = (s) => {
    if(s === admin) {
      return;
    }
    setAdmin(s);
  }
  useEffect(() => {
    if (open) {
        document.documentElement.style.overflow = "hidden";
        document.body.style.overflow = "hidden";
    } else {
        document.documentElement.style.overflow = "";  // Restore scrolling
        document.body.style.overflow = "";
    }

    return () => {
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
    };
}, [open]);

useEffect(() => {
  if (!session?.user?.email) return;

  const getData = async (email) => {
    const response = await fetch(`/api/dashboard?email=${email}`);
    const block = await response.json();
    const { data } = block;
    const { schools, reviews, teachers, reviewsNames, role } = data;
    
    setRole(role);
    setAdmin(role === 'admin');

    const total = reviews.reduce(
      (acc, review) => acc + (review.criterion1 + review.criterion2 + review.criterion3) / 3,
      0
    );
    const avg = total / reviews?.length || 0;

    setS(schools || false);
    setT(teachers || false);
    setA(avg);
    setR(reviews || false);
    setTeacherNames(reviewsNames);

    setLoading(false);
  };

  getData(session?.user?.email);
}, [session]);


  const toggleEdit = (review) => {
    setOpen(true)
    setReviewData(review)
  }
  if(loading) {
    return (
      <div className='flex w-full justify-center p-20'>Kraunama...</div> 
    )
  }
  return admin === true ? (
    <AdminDash admin={admin} setAdmin={setAdmin}/>
  ) : (
<>
      <div className=''>
        {open && <EditReview review={reviewData} setOpen={setOpen}/>}
  
        </div>
      <div className="min-h-screen w-full bg-gray-100 flex flex-col justify-center">
        
        {/* Main Content */}
        <main className="flex-1 p-4 md:p-8">
          <header className="mb-8 flex justify-between flex-col gap-4">
          <div>
              <button className={`${admin === true ? 'bg-white text-black px-2 py-1' : 'bg-black text-gray-300 px-2 py-2 rounded-md'}`} onClick={() => setAdmin(false)}>
                Mokinys
              </button>
              <button className={`${admin === true ? 'bg-primary border border-white text-white px-2 py-2 rounded-md' : 'bg-white px-2 py-1'}`} onClick={() => setAdmin(true)}>
                Admin
              </button>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-semibold">
                {session.user.email || session.user.name}
              </h2>
              <p className="text-gray-600">Jūsų veiklos apžvalga.</p> 
            </div>
            
            
          </header>
  
          {/* Stats Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Iš viso įvertinimų</h3>
              {r !== false && !r && <div className='w-full flex mt-2'>
                <LoadingSpinner></LoadingSpinner>
                </div>}
              <p className="text-4xl font-bold text-primary">{r?.length}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-xl font-semibold">Vidutinis įvertinimas</h3>
              {!r && r !== false && <div className='w-full flex mt-2'>
                <LoadingSpinner></LoadingSpinner>
                </div>}
              <p className="text-4xl font-bold text-primary">{a?.toFixed(2)}</p>
            </div>
          </div>
  
          {/* My Ratings Section */}
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            
            <div className="bg-white p-6 rounded-lg shadow max-h-[350px] overflow-auto">
            <h2 className="text-2xl font-bold mb-4">Mano įvertinimai</h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className='h-[48px]'>
                      <th className="px-4 py-2 text-left text-gray-600">Mokytojas</th>
                      <th className="px-4 py-2 text-left text-gray-600">Veiksmai</th>
                    </tr>
                  </thead>
                  <tbody>
                    {r?.map((review, index) => (
                      <tr key={index} className='border-t'>
                        <td className='py-2 px-4 h-[48px]'>
                          {teacherNames[`${review.n}-${review.m}`]}
                        </td>
                        <td className='px-4'>
                          <div className='flex items-center'>
                            <button onClick={() => toggleEdit(review)} className="hover:text-primary text-gray-500 hover:underline">Redaguoti</button>
                          </div>
                          
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {!r && r !== false && 
                <div className='w-full flex h-24'>
                    <LoadingSpinner></LoadingSpinner>
                </div>
                      }
              </div>
            </div>
            <div className='w-full bg-white rounded-lg shadow p-6 max-h-[350px] overflow-auto'>
              <h3 className='font-bold text-2xl mb-4'>Pridėti mokytojai</h3>
              <div className='overflow-x-auto'>
                <table className='min-w-full text-left'>
                  <thead>
                    <tr>
                      <th className='px-4 py-2 h-[48px] text-gray-600'>Mokytojas</th>
                      <th className='px-4 py-2 text-gray-600'>Data</th>
                    </tr>
                    
                  </thead>
                  <tbody>
                    {t?.map((teacher, index) => (
                      <tr key={index} className='border-t h-[48px]'>
                        <td className='px-4'>
                          {teacher.name} {teacher.surname}
                        </td>
                        <td className='px-4'>
                          {teacher.createdAt.split('T')[0]}
                        </td>
                      </tr>
                      ))}
                  </tbody>
                </table>
                {!t && t !== false && 
                <div className='w-full flex h-24'>
                    <LoadingSpinner></LoadingSpinner>
                </div>
                      }
              </div>
            </div>
            <div className='bg-white p-6 rounded-lg shadow w-full max-h-[350px] overflow-auto'>
              <h3 className='font-bold text-2xl mb-4'>Pridėtos mokymo įstaigos</h3>
              <div className='overflow-x-auto'>
                <table className='min-w-full text-left overflow-auto'>
                  <thead>
                    <tr className='h-[48px]'>
                      <th className='px-4 py-2 text-gray-600'>Įstaiga</th>
                      <th className='px-4 py-2 text-gray-600'>Data</th>
                    </tr>
                    
                  </thead>
                  <tbody >
                    {s?.map((school, index) => (
                      <tr key={index} className='border-t h-[48px]'>
                        <td className='px-4 py-2'>
                          {(school.name).slice(0, 24)}
                          {school.name.length >= 24 && ' ...'}
                        </td>
                        <td className='px-4 text-nowrap'>
                          {school.createdAt.split('T')[0]}
                        </td>
                      </tr>
                    ))}
                          
                  </tbody>
                </table>
                {!s && s !== false && 
                <div className='w-full flex h-24'>
                    <LoadingSpinner></LoadingSpinner>
                </div>
                      }
              </div>
            </div>
          </section>
          <button
            onClick={() => signOut()}
            className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
          >
            Atsijungti
          </button>
  
        </main>
        
      </div>
      </>
  )
  
};

export default Dashb;
