import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';

const Dashb = () => {
  const [s, setS] = useState()
  const [r, setR] = useState()
  const [t, setT] = useState()
  const [a, setA] = useState()
  const [teacherNames, setTeacherNames] = useState({});
  const { data: session } = useSession();
  useEffect(() => {
    if (!session?.user?.email) return;
    const getData = async (email) => {
      const response = await fetch(`/api/dashboard?email=${email}`)
      const block = await response.json()
      const {data} = block
      const {schools, reviews, teachers, reviewsNames} = data;
      const total = reviews.reduce((acc, review) => 
      acc + (review.criterion1 + review.criterion2 + review.criterion3) /3, 0);
      const avg = total / reviews?.length
      setA(avg)
      setS(schools);
      setT(teachers)
      setR(reviews)
      setTeacherNames(reviewsNames)
    }
    getData(session?.user?.email);
  }, [session])
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8">
        <header className="mb-8">
          <h2 className="text-2xl md:text-3xl font-semibold">
            {session.user.email || session.user.name}
          </h2>
          <p className="text-gray-600">Jūsų įvertinimų apžvalga.</p>
        </header>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Iš viso įvertinimų</h3>
            <p className="text-4xl font-bold text-primary">{r?.length}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Vidutinis įvertinimas</h3>
            <p className="text-4xl font-bold text-primary">{a?.toFixed(2)}</p>
          </div>
        </div>

        {/* My Ratings Section */}
        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Mano įvertinimai</h2>
            <div className="overflow-x-auto">
              <table className="w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Mokytojas</th>
                    <th className="px-4 py-2 text-left text-gray-600">Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  {r?.map((review, index) => (
                    <tr key={index} className='border-t'>
                      <td className='py-2 px-4'>
                        {teacherNames[`${review.n}-${review.m}`]}
                      </td>
                      <td className='px-4'>
                        <div className='flex items-center'>
                          <button className="hover:text-primary text-gray-500 hover:underline">Redaguoti</button>
                          <button className="hover:text-red-500 text-red-400 ml-2">
                            <svg xmlns="http://www.w3.org/2000/svg"  fill="#ef4444" viewBox="0 0 24 24" width="24px" height="24px"><path d="M 10 2 L 9 3 L 4 3 L 4 5 L 5 5 L 5 20 C 5 20.522222 5.1913289 21.05461 5.5683594 21.431641 C 5.9453899 21.808671 6.4777778 22 7 22 L 17 22 C 17.522222 22 18.05461 21.808671 18.431641 21.431641 C 18.808671 21.05461 19 20.522222 19 20 L 19 5 L 20 5 L 20 3 L 15 3 L 14 2 L 10 2 z M 7 5 L 17 5 L 17 20 L 7 20 L 7 5 z M 9 7 L 9 18 L 11 18 L 11 7 L 9 7 z M 13 7 L 13 18 L 15 18 L 15 7 L 13 7 z"/></svg>
                          </button>
                        </div>
                        
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='w-full bg-white rounded-lg shadow p-6'>
            <h3 className='font-bold text-2xl mb-4'>Pridėti mokytojai</h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-left'>
                <thead>
                  <tr>
                    <th className='px-4 py-2 text-gray-600'>Mokytojas</th>
                    <th className='px-4 py-2 text-gray-600'>Data</th>
                  </tr>
                  
                </thead>
                <tbody>
                  {t?.map((teacher, index) => (
                    <tr key={index} className='border-t'>
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
            </div>
          </div>
          <div className='bg-white p-6 rounded-lg shadow w-full'>
            <h3 className='font-bold text-2xl mb-4'>Pridėtos mokymo įstaigos</h3>
            <div className='overflow-x-auto'>
              <table className='min-w-full text-left'>
                <thead>
                  <tr>
                    <th className='px-4 py-2 text-gray-600'>Įstaiga</th>
                    <th className='px-4 py-2 text-gray-600'>Data</th>
                  </tr>
                  
                </thead>
                <tbody>
                  {s?.map((school, index) => (
                    <tr key={index} className='border-t'>
                      <td className='px-4 py-2'>
                        {school.name}
                      </td>
                      <td className='px-4'>
                        {school.createdAt.split('T')[0]}
                      </td>
                    </tr>
                  ))}
                            
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
      <div className='bg-white h-20 justify-center items-center flex'>
        <button
          onClick={() => signOut()}
          className="bg-primary text-white px-4 py-2 rounded-lg hover:opacity-80 transition"
        >
          Atsijungti
        </button>
      </div>
    </div>
  );
};

export default Dashb;
