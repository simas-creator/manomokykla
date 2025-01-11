"use client"
import { useSession } from 'next-auth/react'
import React from 'react'
import Dashb from '@/components/Dashb'
const page = () => {
  const {data: session, status} = useSession()
  if (status === "loading") {
    return <div className='flex w-full justify-center p-20'>Kraunama...</div>; 
  }
  return (
    <div>
        {session? 
        (<Dashb></Dashb>) 
        : 
        (   
            <div className='flex w-full justify-center p-10'>
                <h1 className='text-3xl font-bold'>Esate neprisijungęs</h1>
            </div>
        )
        }

    </div>
  )
}

export default page