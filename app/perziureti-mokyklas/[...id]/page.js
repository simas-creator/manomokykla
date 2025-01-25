'use client'

import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import SchoolPage from "@/components/SchoolPage";

const Page = () => {
  const pathname = usePathname()
  const [school, setSchool] = useState(null)
  const [loading, setLoading] = useState(true)

  const n = pathname.match(/(\d+)$/)?.[0]

  useEffect(() => {
    const fetchSchoolData = async () => {
      try {
        const response = await fetch(`/api/schools/${n}`)
        const data = await response.json()

        if (response.ok) {
          setSchool(data)
        } else {
          console.log("error occurred")
        }
      } catch (err) {
        console.log('error', err)
      } finally {
        setLoading(false) 
      }
    }

    fetchSchoolData()
  
  }, [pathname, n])

  if (loading) {
    return <div>Kraunama...</div>
  }

  if (!school) {
    return <div>Mokykla nerasta</div>
  }

  return (
    <div>
      <SchoolPage School={school}/>
    </div>
  )
}

export default Page
