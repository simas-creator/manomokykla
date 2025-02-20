'use client';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import FilterParameter from '@/components/FilterParameter';
import SchoolCase from '@/components/SchoolCase';
import SearchBar from '@/components/SearchBar';

const PageContent = () => {
  const searchParams = useSearchParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(""); 
  const [filteredData, setFilteredData] = useState([]);

  const parameters = ["Alytaus", "Kauno", "Klaipėdos", "Marijampolės", "Panevėžio", "Šiaulių", "Tauragės", "Telšių", "Utenos", "Vilniaus"];
  const types = ["Gimnazija", "Universitetas", "Profesinė mokykla"];
  const best = ["Nuo aukščiausio", "Nuo žemiausio"];
  const [active, setActive] = useState(null);
  const [page, setPage] = useState(1)
  const queriesObject = Object.fromEntries(searchParams.entries());

  const decodeLithuanianChars = (str) => {
    const wordMap = {
      "alytaus": "Alytaus",
      "kauno": "Kauno",
      "klaipedos": "Klaipėdos",
      "marijampoles": "Marijampolės",
      "panevezio": "Panevėžio",
      "siauliu": "Šiaulių",
      "taurages": "Tauragės",
      "telsiu": "Telšių",
      "utenos": "Utenos",
      "vilniaus": "Vilniaus",
      "gimnazija": "Gimnazija",
      "universitetas": "Universitetas",
      "profesinemokykla": "Profesinė mokykla",
      "nuoauksciausio": "Nuo aukščiausio",
      "nuozemiausio": "Nuo žemiausio",
    };

    return wordMap[str] || str;
  };

  const [filter1, setFilter1] = useState(decodeLithuanianChars(queriesObject['apskritis']));
  const [filter2, setFilter2] = useState(decodeLithuanianChars(queriesObject['tipas']));
  const [filter3, setFilter3] = useState(decodeLithuanianChars(queriesObject['ivertinimai']));
  const interRef = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if(entries[0].isIntersecting) {
        console.log('more data is being fetched')
        fetchData();
      }
    }, { threshold: 1.0 }
      
    ,)
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/schools/view?${searchParams}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          console.log("Error fetching data:", res.statusText);
          setData([]);
          return;
        }

        const result = await res.json();
        setData(result);
      } catch (error) {
        console.log("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [searchParams]);

  useEffect(() => {
    if (!search) {
      setFilteredData(data);
    } else {
      setFilteredData(
        data.filter((school) =>
          school.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }
  }, [search, data]);

  return (
    <div className='w-full'>
      <SearchBar parameter={"Ieškokite mokyklos"} setSearch={setSearch} />
      
      <div className='w-full'>
        <div className='grid grid-rows-2 sm:grid-rows-1 grid-cols-2 lg:max-w-screen-lg lg:px-10 lg:m-auto sm:grid-cols-3 gap-4 px-10 justify-items-center my-4 lg:mt-2 lg:mb-4'>
          <FilterParameter active={active} setActive={setActive} parameters={parameters} type={"Apskritis"} filter={filter1} setFilter={setFilter1} />
          <FilterParameter active={active} setActive={setActive} parameters={types} type={"Tipas"} filter={filter2} setFilter={setFilter2} />
          <FilterParameter active={active} setActive={setActive} parameters={best} type={"Įvertinimai"} filter={filter3} setFilter={setFilter3} />
        </div>
      </div>

      <div className='flex justify-center items-center'>
        {!loading && filteredData.length === 0 && <p>Atsiprašome, bet nieko neradome.</p>}
      </div>

      <div className="grid w-full items-center justify-center">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10 p-4 w-full max-w-screen-xl sm:justify-center sm:items-center">
          {filteredData.map((school, index) => (
            <SchoolCase key={`${school.apskritis}-${school.name}`} school={school} ref={index === filteredData.length - 1 ? interRef : null}/>
          ))}
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
