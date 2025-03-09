import { useEffect, useState } from 'react';
import { signOut, useSession } from 'next-auth/react';
import EditReview from '@/components/EditReview'
import LoadingSpinner from './LoadingSpinner';
const Dashb = ({admin, setAdmin}) => {
  return (
    <div>
        <div className='p-6'>
              <button className={`${admin === true ? 'bg-white text-black px-2 py-1' : 'bg-black text-gray-300 px-2 py-2 rounded-md'}`} onClick={() => setAdmin(false)}>
                Mokinys
              </button>
              <button className={`${admin === true ? 'bg-primary border border-white text-white px-2 py-2 rounded-md' : 'bg-white px-2 py-1'}`} onClick={() => setAdmin(true)}>
                Admin
              </button>
            </div>
        <section>
        
        </section>
        <section>

        </section>
    </div>
    
  );
};

export default Dashb;
