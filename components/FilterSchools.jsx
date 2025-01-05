'use client'
import React, { useState } from "react";

const FilterSchools = ({ regions, onFilter }) => {
  const [selectedRegion, setSelectedRegion] = useState("all");
  const [selectedRating, setSelectedRating] = useState("all");

  const handleFilter = () => {
    onFilter({ region: selectedRegion, rating: selectedRating });
  };

  return (
    <div className="lg:max-w-screen-lg w-full m-auto p-10">

      <div className="flex flex-col">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-lg">
          <form className="">
            <div className="relative mb-10 w-full flex  items-center justify-between rounded-md">
              <svg className="absolute left-2 block h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" className=""></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65" className=""></line>
              </svg>
              <input type="name" name="search" className="h-12 w-full cursor-text rounded-md border border-gray-100 bg-gray-100 py-4 pr-40 pl-12 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" placeholder="Ieškokite mokyklos pavadinimo" />
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <div className="flex flex-col">
                <label htmlFor="apskritis" className="text-sm font-medium text-stone-600">Apskritis</label>
                <select id="apskritis" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <option>Alytaus</option>
                  <option>Kauno</option>
                  <option>Klaipėdos</option>
                  <option>Klaipėdos</option>
                  <option>Marijampolės</option>
                  <option>Panevėžio</option>
                  <option>Šiaulių</option>
                  <option>Tauragės</option>
                  <option>Telšių</option>
                  <option>Utenos</option>
                  <option>Vilniaus</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="ivertinimai" className="text-sm font-medium text-stone-600">Įvertinimai</label>
                <select id="ivertinimai" className="mt-2 block w-full cursor-pointer rounded-md border border-gray-100 bg-gray-100 px-2 py-2 shadow-sm outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
                  <option>Nuo aukščiausio</option>
                  <option>Nuo žemiausio</option>
                </select>
              </div>
            </div>

            <div className="mt-6 grid w-full grid-cols-2 justify-end space-x-4 md:flex">
              <button className="rounded-lg bg-gray-200 px-8 py-2 font-medium text-gray-700 outline-none hover:opacity-80 focus:ring">Atstatyti</button>
              <button className="rounded-lg bg-primary px-8 py-2 font-medium text-white outline-none hover:opacity-80 focus:ring">Ieškoti</button>
            </div>
          </form>
        </div>
      </div> 
  </div>

  );
};

export default FilterSchools;