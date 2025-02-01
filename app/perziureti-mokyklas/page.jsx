'use client';
import FilterParameter from '@/components/FilterParameter';
import SchoolCase from '@/components/SchoolCase';
import SearchBar from '@/components/SearchBar'
import { useEffect, useState } from 'react';

const Page = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const parameters=["Alytaus", "Kauno", "Klaipėdos", "Marijampolės", "Panevėžio", "Šiaulių", "Tauragės", "Telšių", "Utenos", "Vilniaus", "Alytaus"]
  const types = ["Gimnazija", "Universitetas", "Profesinė mokykla"];
  const best = ["Nuo aukščiausio", "Nuo žemiausio"];
  const az = ["Nuo A-Z", "Nuo Z-A"];
  const [active, setActive] = useState(null);
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
    <div className='w-full'>
      <SearchBar parameter={"Ieškokite mokyklos"}/>
      <div className='w-full'>
        <div className='grid lg:max-w-screen-lg lg:px-10 lg:m-auto grid-cols-2 grid-flow-row sm:grid-cols-4 grid-rows-1 gap-4 px-10 justify-items-center my-4 lg:mt-2 lg:mb-4 '>
          <FilterParameter active={active} setActive={setActive} parameters={parameters} type={"Apskritis"}/>
          <FilterParameter active={active} setActive={setActive} parameters={types} type={"Tipas"}/>
          <FilterParameter active={active} setActive={setActive} parameters={best} type={"Pagal įvertinimus"}/>
          <FilterParameter active={active} setActive={setActive} parameters={az} type={"Pagal abecėlę"}/>
        </div>
      </div>
      
      
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
