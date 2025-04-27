import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import EditReview from '../teacher/EditReview';
import LoadingSpinner from '../UI/LoadingSpinner';
import AdminDash from '../dashboard/AdminDash';

const Dashb = () => {
  const [s, setS] = useState();
  const [r, setR] = useState();
  const [t, setT] = useState();
  const [a, setA] = useState();
  const [role, setRole] = useState('viewer');
  const [admin, setAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [reviewData, setReviewData] = useState();
  const [teacherNames, setTeacherNames] = useState({});
  const { data: session } = useSession();

  const [pendingReviews, setPendingReviews] = useState([]);
  const [pendingTeachers, setPendingTeachers] = useState([]);
  const [pendingSchools, setPendingSchools] = useState([]);

  const [showPendingR, setShowPendingR] = useState(false);
  const [showPendingS, setShowPendingS] = useState(false);
  const [showPendingT, setShowPendingT] = useState(false);

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
      const { confTeachers, confSchools, confReviews, pendTeachers, pendSchools, pendReviews, reviewsNames, role } = data;
      
      setRole(role);
      setAdmin(role === 'admin');

      const total = confReviews.reduce(
        (acc, review) => acc + (review.criterion1 + review.criterion2 + review.criterion3) / 3,
        0
      );
      const avg = total / confReviews?.length || 0;

      setS(confSchools || false);
      setT(confTeachers || false);
      setA(avg);
      setR(confReviews || false);

      setPendingReviews(pendReviews || []);
      setPendingSchools(pendSchools || []);
      setPendingTeachers(pendTeachers || []);
      setTeacherNames(reviewsNames);

      setLoading(false);
    };

    getData(session?.user?.email);
  }, [session]);


  const toggleEdit = (review) => {
    setOpen(true);
    setReviewData(review);
  };

  if(loading) {
    return (
      <div className='flex w-full justify-center p-20'>Kraunama...</div> 
    );
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
            {role === 'admin' &&
              <div>
              <button className={`${admin === true ? 'bg-white text-black px-2 py-1' : 'bg-black text-gray-300 px-2 py-2 rounded-md'}`} onClick={() => setAdmin(false)}>
                Mokinys
              </button>
              <button className={`${admin === true ? 'bg-primary border border-white text-white px-2 py-2 rounded-md' : 'bg-white px-2 py-1'}`} onClick={() => setAdmin(true)}>
                Admin
              </button>
            </div>
            }
            
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
          <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 ">
            {/* Reviews Component */}
            <div className="w-full relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Tab navigation */}
              <div className="flex border-b">
                <button 
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${!showPendingR ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setShowPendingR(false)}
                >
                  Patvirtinta
                </button>
                <button 
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${showPendingR ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setShowPendingR(true)}
                >
                  Laukia patvirtinimo
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Mano įvertinimai</h3>
                
                <div className="overflow-x-auto">
                  {r !== undefined ? (
                    <div className='overflow-y-auto max-h-[300px]'>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mokytojas</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Veiksmai</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showPendingR ? (
                          pendingReviews && pendingReviews.length > 0 ? (
                            pendingReviews.map((review, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">
                                  {teacherNames[`${review.n}-${review.m}`]}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <button 
                                    onClick={() => toggleEdit(review)} 
                                    className="text-gray-600 hover:text-black hover:underline transition-colors"
                                  >
                                    Redaguoti
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                Nėra laukiančių patvirtinimo įvertinimų
                              </td>
                            </tr>
                          )
                        ) : (
                          r && r.length > 0 ? (
                            r.map((review, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">
                                  {teacherNames[`${review.n}-${review.m}`]}
                                </td>
                                <td className="px-4 py-3 text-sm">
                                  <button 
                                    onClick={() => toggleEdit(review)} 
                                    className="text-gray-600 hover:text-black hover:underline transition-colors"
                                  >
                                    Redaguoti
                                  </button>
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                Nėra patvirtintų įvertinimų
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    </div>
                    
                  ) : (
                    <div className="w-full flex justify-center items-center h-32">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Teachers Component */}
            <div className="w-full relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              <div className="flex border-b">
                <button 
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${!showPendingT ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setShowPendingT(false)}
                >
                  Patvirtinta
                </button>
                <button 
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${showPendingT ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setShowPendingT(true)}
                >
                  Laukia patvirtinimo
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Pridėti mokytojai</h3>
                
                <div className="overflow-x-auto">
                  {t !== undefined ? (
                    <div className='overflow-y-auto max-h-[300px]'>
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Mokytojas</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showPendingT ? (
                          pendingTeachers && pendingTeachers.length > 0 ? (
                            pendingTeachers.map((teacher, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">
                                  {teacher.name} {teacher.surname}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {teacher.createdAt.split('T')[0]}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                Nėra laukiančių patvirtinimo mokytojų
                              </td>
                            </tr>
                          )
                        ) : (
                          t && t.length > 0 ? (
                            t.map((teacher, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">
                                  {teacher.name} {teacher.surname}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600">
                                  {teacher.createdAt.split('T')[0]}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                Nėra pridėtų mokytojų
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                    </div>
                    
                  ) : (
                    <div className="w-full flex justify-center items-center h-32">
                      <LoadingSpinner />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Schools Component */}
            <div className="w-full  relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* Tab navigation */}
              <div className="flex border-b ">
                <button 
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${!showPendingS ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setShowPendingS(false)}
                >
                  Patvirtinta
                </button>
                <button 
                  className={`flex-1 py-3 font-medium text-sm transition-colors ${showPendingS ? 'bg-white text-black border-b-2 border-black' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`} 
                  onClick={() => setShowPendingS(true)}
                >
                  Laukia patvirtinimo
                </button>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-bold mb-4">Pridėtos mokymo įstaigos</h3>
                
                <div className="overflow-x-auto">
                {s !== undefined ? (
                  <div className="max-h-[300px] overflow-y-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Įstaiga</th>
                          <th className="px-4 py-3 text-left text-sm font-medium text-gray-600">Data</th>
                        </tr>
                      </thead>
                      <tbody>
                        {showPendingS ? (
                          pendingSchools && pendingSchools.length > 0 ? (
                            pendingSchools.map((school, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">
                                  {school.name.slice(0, 24)}
                                  {school.name.length >= 24 && ' ...'}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                  {school.createdAt.split('T')[0]}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                Nėra laukiančių patvirtinimo įstaigų
                              </td>
                            </tr>
                          )
                        ) : (
                          s && s.length > 0 ? (
                            s.map((school, index) => (
                              <tr key={index} className="border-t hover:bg-gray-50">
                                <td className="px-4 py-3 text-sm">
                                  {school.name.slice(0, 24)}
                                  {school.name.length >= 24 && ' ...'}
                                </td>
                                <td className="px-4 py-3 text-sm text-gray-600 whitespace-nowrap">
                                  {school.createdAt.split('T')[0]}
                                </td>
                              </tr>
                            ))
                          ) : (
                            <tr>
                              <td colSpan="2" className="px-4 py-8 text-center text-gray-500">
                                Nėra pridėtų įstaigų
                              </td>
                            </tr>
                          )
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="w-full flex justify-center items-center h-32">
                    <LoadingSpinner />
                  </div>
                )}
              </div>

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
  );
};

export default Dashb;