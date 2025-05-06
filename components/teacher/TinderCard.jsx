"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
const Case = ({ teacher, jsonData, setJsonData }) => {

  const criteria = [
    "Gebėjimas perteikti žinias",
    "Gebėjimas bendrauti su mokiniais",
    "Dalyko išmanymas",
  ];
  const handleRating = (criterion, value) => {
    setJsonData((prev) => ({
      ...prev,
      [criterion]: value,
    }));
  };
  // Handle mouse/touch move

  

  return (
    <div className="w-fit relative min-h-80 bg-white border rounded-lg shadow-lg cursor-grab active:cursor-grabbing">
      <div className="p-4 flex justify-center flex-col">
        <div className="mb-2 p-4 flex gap-x-2 border border-black items-center w-full justify-center bg-gray-200">
          <Image
            src={teacher.imageUrl || "/placeholder.svg"}
            width={100}
            height={100}
            alt="mokytojas"
          ></Image>
        </div>
        <div className="flex flex-col">
          <h3 className="text-2xl font-bold truncate">
            {(teacher.name + " " + teacher.surname).slice(0, 21)}
            {teacher.name.length + teacher.surname.length > 20 && "..."}
          </h3>

          {teacher.subject && (
            <p className="text-gray-500">{teacher.subject}</p>
          )}
        </div>
        <div className="space-y-2 mt-2">
          {criteria.map((criterion) => (
            <div key={criterion} className="rating-container">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-gray-700">{criterion}</p>
              </div>
              <div className="rating flex gap-0.5">
                {[1, 2, 3, 4, 5].map((index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => handleRating(criterion, index)}
                    className={`star-rating w-8 h-8 flex items-center justify-center transition-all ${
                      jsonData[criterion] >= index
                        ? "text-amber-400"
                        : "text-gray-300"
                    }`}
                  >
                    <Star
                      fill={jsonData[criterion] >= index ? "#fbbf24" : "white"}
                    />
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

const TinderCard = ({ teachers, setOpen, user }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  const [jsonData, setJsonData] = useState({
    "Gebėjimas bendrauti su mokiniais": 0,
    "Gebėjimas perteikti žinias": 0,
    "Dalyko išmanymas": 0,
  });
  function handleSubmit(direction){
    if(direction === 'skip') {
      setCurrentIndex(prev => prev+ 1)
    }
  }
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (done && !loading) {
    return (
      <div className="h-[100vh] w-full absolute bg-white border-b border-white">
        <button
          onClick={() => setOpen(false)}
          className="flex fixed top-16 lg:top-[68px] bg-white z-20 h-10 w-32 items-center gap-2 text-gray-700 hover:text-black transition-all duration-300  group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
          >
            <path
              fillRule="evenodd"
              d="M15.707 4.293a1 1 0 010 1.414L10.414 11H20a1 1 0 110 2h-9.586l5.293 5.293a1 1 0 11-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">Atgal</span>
        </button>
        <div className="flex justify-center items-center mt-20 bg-white h-32 m-auto w-80 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl typed">Ačiū už atsiliepimus</h1>
        </div>
      </div>
    );
  }
  return (
    <div className="h-fit pb-6 w-full absolute bg-white border-b border-white  px-8">
      <button
        onClick={() => setOpen(false)}
        className="flex fixed top-20 bg-white z-20 h-10 w-32 md:top-[68px]items-center gap-2 text-gray-700 hover:text-black transition-all duration-300  group"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300"
        >
          <path
            fillRule="evenodd"
            d="M15.707 4.293a1 1 0 010 1.414L10.414 11H20a1 1 0 110 2h-9.586l5.293 5.293a1 1 0 11-1.414 1.414l-7-7a1 1 0 010-1.414l7-7a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        <span className="font-medium">Atgal</span>
      </button>

      {/* Display current teacher card */}
      <div className="flex justify-center mt-20">
        {teachers.length > 0 && status === "authenticated" && (
          <Case
            teacher={teachers[currentIndex]}
            jsonData={jsonData}
            setJsonData={setJsonData}
          />
        )}
      </div>

      {/* Simple navigation controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button onClick={() => handleSubmit('recommend')} className="bg-white gap-x-2 py-2 border-red-600 rounded-md border px-3 text-sm flex items-center justify-center text-red-600">
          <X strokeWidth={1} />
          <p>Nerekomenduoju</p>
        </button>

        <button onClick={() => handleSubmit('norecommend')} className="bg-white gap-x-2 py-2 border text-sm flex rounded-md px-3 items-center justify-center text-green-400 border-green-400">
          <Check strokeWidth={1} />
          <p>Rekomenduoju</p>
        </button>
      </div>

      {/* Card counter */}
      <div className="mt-4 text-center w-full flex justify-center flex-col items-center">
        <button onClick={() => handleSubmit('skip')} className="bg-white text-black text-sm border border-gray-600 rounded-md px-4 h-12 flex items-center justify-center">
          Neturiu šito mokytojo
        </button>
        {currentIndex + 1} / {teachers.length}
      </div>
    </div>
  );
};

export default TinderCard;
