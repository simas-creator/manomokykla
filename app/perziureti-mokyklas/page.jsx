'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import FilterParameter from '@/components/FilterParameter';
import SchoolCase from '@/components/SchoolCase';
import SearchBar from '@/components/SearchBar';
import LoadingSpinner from '@/components/LoadingSpinner';
const decodeLithuanianChars = (str) => {
  const wordMap = new Map([
    ["alytaus", "Alytaus"],
    ["kauno", "Kauno"],
    ["klaipedos", "Klaipėdos"],
    ["marijampoles", "Marijampolės"],
    ["panevezio", "Panevėžio"],
    ["siauliu", "Šiaulių"],
    ["taurages", "Tauragės"],
    ["telsiu", "Telšių"],
    ["utenos", "Utenos"],
    ["vilniaus", "Vilniaus"],
    ["gimnazija", "Gimnazija"],
    ["universitetas", "Universitetas"],
    ["profesinemokykla", "Profesinė mokykla"],
    ["nuoauksciausio", "Nuo aukščiausio"],
    ["nuozemiausio", "Nuo žemiausio"],
  ]);

  return wordMap.get(str) || str;
};

const PageContent = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [active, setActive] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const interRef = useRef(null);
  const isFetching = useRef(false);
  const parameters = ["Alytaus", "Kauno", "Klaipėdos", "Marijampolės", "Panevėžio", "Šiaulių", "Tauragės", "Telšių", "Utenos", "Vilniaus"];
  const types = ["Gimnazija", "Universitetas", "Profesinė mokykla"];
  const best = ["Nuo aukščiausio", "Nuo žemiausio"];
  const pageRef = useRef(1);
  const queriesObject = Object.fromEntries(searchParams.entries());
  const [filter1, setFilter1] = useState(decodeLithuanianChars(queriesObject['apskritis']));
  const [filter2, setFilter2] = useState(decodeLithuanianChars(queriesObject['tipas']));
  const [filter3, setFilter3] = useState(decodeLithuanianChars(queriesObject['ivertinimai']));

  const fetchData = async () => {
    if (!hasMore || isFetching.current) return;
    isFetching.current = true;
    setLoading(true);
  
    try {
      const res = await fetch(`/api/schools/view?${searchParams}&pages=${pageRef.current}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      if (!res.ok) throw new Error("Error fetching data");
  
      const result = await res.json();
      if (result.length === 0) {
        setHasMore(false);
      } else {
        setData(prevData => (pageRef.current === 1 ? result : [...prevData, ...result]));
      }

    } catch (error) {
      console.error("Fetch error:", error);
      setHasMore(false);
    } finally {
      setLoading(false);
      isFetching.current = false;
    }
  };  
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setData([]);
      pageRef.current = 0;
      setHasMore(true);
      isFetching.current = false;
      fetchData();
    }, 300);
  
    return () => clearTimeout(timeout);
  }, [searchParams]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading && !isFetching.current) {
          pageRef.current += 1;
          await fetchData(); 
        }
      },
      { threshold: 1 }
    );
  
    const currentRef = interRef.current;
    if (currentRef) observer.observe(currentRef);
  
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [hasMore, loading]);
  
  

  const filteredData = search
    ? data.filter((school) => school.name.toLowerCase().includes(search.toLowerCase()))
    : data;
  
  return (
    <div className='w-full pb-8'>
      <SearchBar parameter={"Ieškokite mokyklos"} setSearch={setSearch} />
      
      <div className='w-full'>
        <div className='grid grid-rows-3 sm:grid-rows-1 grid-cols-1 lg:max-w-screen-lg lg:px-10 lg:m-auto sm:grid-cols-3 gap-4 px-10 sm:justify-items-center my-4 lg:mt-2 lg:mb-4'>
          <FilterParameter active={active} setActive={setActive} parameters={parameters} type={"Apskritis"} filter={filter1} setFilter={setFilter1} />
          <FilterParameter active={active} setActive={setActive} parameters={types} type={"Tipas"} filter={filter2} setFilter={setFilter2} />
          <FilterParameter active={active} setActive={setActive} parameters={best} type={"Įvertinimai"} filter={filter3} setFilter={setFilter3} />
        </div>
      </div>

      <div className='flex justify-center items-center relative'>
        {!loading && filteredData.length === 0 && <p className='mt-4'>Atsiprašome, bet nieko neradome.</p>}
      </div>
      
      <div className="grid w-full items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-4 w-full max-w-screen-xl sm:justify-center sm:items-center">
          {filteredData.filter((s, i) => s.status === 'ok').map((school) => (
            <SchoolCase key={`${school.apskritis}-${school.name}`} school={school}/>
          ))}
        </div>
        <div ref={interRef} className="text-center" style={{ visibility: hasMore ? "visible" : "hidden" }}>
            {hasMore ? <LoadingSpinner/> : ''}
          </div>
      </div>
    </div>
  );
};

const Page = () => (
  <Suspense fallback={<p className='w-full mt-32'>Kraunama...</p>}>
    <PageContent />
  </Suspense>
);

export default Page;