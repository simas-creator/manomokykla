import React from 'react';
import { signOut, useSession } from 'next-auth/react';

const Dashb = () => {
  const { data: session } = useSession();
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
            <p className="text-4xl font-bold text-primary">45</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold">Vidutinis įvertinimas</h3>
            <p className="text-4xl font-bold text-primary">4.2</p>
          </div>
        </div>

        {/* My Ratings Section */}
        <section className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Mano įvertinimai</h2>
          <div className="bg-white p-6 rounded-lg shadow">
            <div className="overflow-x-auto">
              <table className="min-w-full table-auto">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-left text-gray-600">Mokytojas</th>
                    <th className="px-4 py-2 text-left text-gray-600">Įvertinimas</th>
                    <th className="px-4 py-2 text-left text-gray-600">Atsiliepimas</th>
                    <th className="px-4 py-2 text-left text-gray-600">Laikas</th>
                    <th className="px-4 py-2 text-left text-gray-600">Veiksmai</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-t">
                    <td className="px-4 py-2">Petras gražulis</td>
                    <td className="px-4 py-2">5 ⭐</td>
                    <td className="px-4 py-2">Puikus matematikas!</td>
                    <td className="px-4 py-2">2025-01-01</td>
                    <td className="px-4 py-2">
                      <button className="text-primary hover:underline">Redaguoti</button>
                      <button className="text-red-500 hover:underline ml-2">Naikinti</button>
                    </td>
                  </tr>
                  {/* Add more rows dynamically */}
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
