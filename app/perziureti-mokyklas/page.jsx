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
  const [active, setActive] = useState(null);
  const [filter1, setFilter1] = useState(null);
  const [filter2, setFilter2] = useState(null);
  const [filter3, setFilter3] = useState(null);
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
  <div className=' grid-rows-2 sm:grid-rows-1 grid-cols-2 grid lg:max-w-screen-lg lg:px-10 lg:m-auto sm:grid-cols-3 gap-4 px-10 justify-items-center my-4 lg:mt-2 lg:mb-4'>

    <FilterParameter active={active} setActive={setActive} parameters={parameters} type={"Apskritis"} filter={filter1} setFilter={setFilter1}/>
    <FilterParameter active={active} setActive={setActive} parameters={types} type={"Tipas"} filter={filter2} setFilter={setFilter2}/>
    <FilterParameter active={active} setActive={setActive} parameters={best} type={"Įvertinimai"} filter={filter3} setFilter={setFilter3}/>

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
