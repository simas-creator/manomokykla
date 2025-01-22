'use client';
import FilterSchools from '@/components/FilterSchools';
import SchoolCase from '@/components/SchoolCase';
import { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/schools/view", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          console.error("Error fetching data:", res.statusText);
          setLoading(false);
          return;
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <FilterSchools />
      <div className='flex justify-center items-center'>
        {loading && <p>Kraunama...</p>}
        {!loading && data.length === 0 && <p>Atsiprašome, bet nieko neradome.</p>}
      </div>
      
      <div className="grid w-full items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 grid-flow-row gap-10 p-4 w-full max-w-screen-xl sm:justify-center sm:items-center">
          
          
          {data.map((school) => (
            <SchoolCase 
              key={`${school.apskritis}-${school.name}`} 
              school={school}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Page;
