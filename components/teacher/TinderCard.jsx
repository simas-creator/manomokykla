"use client";

import { useState } from "react";
import { Check, StarIcon, X } from "lucide-react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { Star, Info } from "lucide-react";
const criteria = [
  "Gebėjimas perteikti žinias",
  "Gebėjimas bendrauti su mokiniais",
  "Dalyko išmanymas",
];
const Case = ({
  teacher,
  setCurrentIndex,
  currentIndex,
  setDone,
  length,
  setOpen,
}) => {
  const [jsonData, setJsonData] = useState({
    "Gebėjimas bendrauti su mokiniais": 0,
    "Gebėjimas perteikti žinias": 0,
    "Dalyko išmanymas": 0,
  });

  const handleRating = (criterion, value) => {
    setJsonData((prev) => ({
      ...prev,
      [criterion]: value,
    }));
  };
  function handleSubmit(direction) {
    if (direction === "skip") {
      if (currentIndex + 1 === length) {
        setDone(true);
        return;
      }
      setCurrentIndex((prev) => prev + 1);
    }
  }
  return (
    <div className="w-auto bg-gray-800 relative h-fit border rounded-lg shadow-lg">
      <div className="px-4 pt-4 flex justify-center flex-col">
        <div
          className="mb-2 p-4 h-36 flex gap-x-2 border relative border-black w-full justify-center bg-white"
          style={{
            backgroundImage: `url(${teacher.imageUrl})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
          }}
        >
          <div className="relative w-full flex flex-col items-end px-4 gap-y-1 z-10">
            <div className="peer">
              {" "}
              {/* this is the hover target */}
              <Info size={38} fill="white" stroke="#009dff" />
            </div>

            <div className="absolute top-10 right-0 rounded-lg border border-primary pointer-events-none w-full max-w-sm bg-white p-3 opacity-0 peer-hover:opacity-100 transition-opacity duration-300">
              <div className="border-b py-2">
                <h5>Kaip naudotis?</h5>
              </div>

              <ol className="text-sm text-gray-600 list-decimal px-6 space-y-2 py-2">
                <li>
                  Jeigu jūsų nemoko rodomas mokytojas, spauskite{" "}
                  <code className="bg-gray-300 px-1 font-bold">
                    Neturiu šito mokytojo
                  </code>
                </li>
                <li className="text-nowrap">
                  Įvertinkite mokytoją pateiktais 3 kriterijais
                  <span className="flex items-center gap-x-1 font-bold">
                    1-5
                    <StarIcon />
                  </span>
                </li>
                <li>
                  Priduodami įvertinimą pasirinkite{" "}
                  <code className="bg-red-300 px-1 font-bold">
                    Nerekomenduoju
                  </code>
                  {" / "}
                  <code className="bg-primary/50 px-1 font-bold">
                    Rekomenduoju
                  </code>
                </li>
              </ol>
            </div>
          </div>

          {/* Card counter */}
          <div className="absolute top-2 left-2">
            {currentIndex + 1} / {length}
          </div>
          <button
            onClick={() => setOpen(false)}
            className="absolute left-2 bottom-2 px-2 py-2 bg-primary rounded-md text-white text-sm"
          >
            Grįžti
          </button>
        </div>
        <div className="flex flex-col bg-gray-200 text-center p-2">
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
            <div key={criterion} className="bg-gray-600 p-1 px-2">
              <div className="flex justify-between items-center mb-1">
                <p className="font-medium text-gray-200">{criterion}</p>
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
      <div className=" flex flex-col px-8 pb-4">
        <div className="my-4 flex justify-center gap-4">
          <button
            onClick={() => handleSubmit("recommend")}
            className=" gap-x-2 py-2 bg-red-600 px-3 text-sm flex items-center justify-center text-white"
          >
            <X strokeWidth={1} />
            <p>Nerekomenduoju</p>
          </button>

          <button
            onClick={() => handleSubmit("norecommend")}
            className="bg-green-500 text-white gap-x-2 py-2 text-sm flex px-3 items-center justify-center "
          >
            <Check strokeWidth={1} />
            <p>Rekomenduoju</p>
          </button>
        </div>

        <button
          onClick={() => handleSubmit("skip")}
          className="bg-white text-black text-sm borderpx-4 h-12 flex items-center justify-center"
        >
          Neturiu šito mokytojo
        </button>
      </div>
    </div>
  );
};

const TinderCard = ({ teachers, setOpen }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen text-white">
        Loading...
      </div>
    );
  }

  if (done && !loading) {
    return (
      <div className="h-screen w-full absolute bg-white border-b border-white">
        <div className="flex justify-center flex-col items-center mt-20 bg-white h-32 m-auto w-80 rounded-lg shadow-lg">
          <h1 className="text-white text-2xl typed w-full">
            Ačiū už atsiliepimus
          </h1>
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={() => setOpen(false)}
              className="px-4 py-2 border border-primary text-gray-700 rounded-md text-sm"
            >
              Grįžti
            </button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="h-screen w-full absolute bg-white border-b border-white px-8">
      {/* Display current teacher card */}
      <div className="flex justify-center mt-8">
        {teachers.length > 0 && status === "authenticated" && (
          <Case
            teacher={teachers[currentIndex]}
            setCurrentIndex={setCurrentIndex}
            setDone={setDone}
            currentIndex={currentIndex}
            length={teachers.length}
            setOpen={setOpen}
          />
        )}
      </div>
    </div>
  );
};

export default TinderCard;
