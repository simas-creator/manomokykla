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
      <div className="grid justify-center grid-cols-1 sm:grid-cols-2 gap-8 p-8">
        {loading && <p>Kraunama...</p>}
        {!loading && data.length === 0 && <p>Atsiprašome, bet nieko neradome.</p>}
        {data.map((school) => (
          <SchoolCase 
            key={`${school.apskritis}-${school.name}`} 
            name={school.name} 
            imgUrl={school.imgUrl} 
          />
        ))}
      </div>
    </div>
  );
};

export default Page;
