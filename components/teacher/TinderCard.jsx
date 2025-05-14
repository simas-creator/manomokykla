"use client";

import { useEffect, useRef, useState } from "react";
import { Check, StarIcon, X } from "lucide-react";
import { useSession } from "next-auth/react";
import { Star, Info } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { createPortal } from "react-dom";

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
  navigateBack,
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
  <div className="bg-gray-800 relative h-fit border rounded-lg shadow-lg max-w-md w-[95%] mx-auto">
    <div className="px-2 sm:px-4 pt-4 flex justify-center flex-col w-full">
      <div
        className="mb-2 p-4 h-36 flex gap-x-2 border relative border-black w-full justify-center bg-white"
        style={{
          backgroundImage: `url(${teacher.imageUrl})`,
          backgroundSize: "120px",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
        }}
      >
        {/* Card counter */}
        <div className="absolute left-2 bottom-2 text-sm">
          {currentIndex + 1} / {length}
        </div>
        <button
          onClick={navigateBack}
          className="absolute top-0 left-0 px-2 py-2 bg-gray-700 text-white z-10 text-xs sm:text-sm"
        >
          Grįžti
        </button>
      </div>
      <div className="flex flex-col bg-gray-200 text-center p-2">
        <h3 className="text-xl sm:text-2xl font-bold truncate">
          {(teacher.name + " " + teacher.surname).slice(0, 21)}
          {teacher.name.length + teacher.surname.length > 20 && "..."}
        </h3>

        {teacher.subject && (
          <p className="text-gray-500 text-sm sm:text-base">{teacher.subject}</p>
        )}
      </div>
      <div className="space-y-2 mt-2">
        {criteria.map((criterion) => (
          <div key={criterion} className="bg-gray-600 p-1 px-2">
            <div className="flex justify-between items-center mb-1">
              <p className="font-medium text-gray-200 text-xs sm:text-sm">{criterion}</p>
            </div>
            <div className="rating flex gap-0.5 justify-center">
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRating(criterion, index)}
                  className={`star-rating w-6 h-6 sm:w-8 sm:h-8 flex items-center justify-center transition-all ${
                    jsonData[criterion] >= index
                      ? "text-amber-400"
                      : "text-gray-300"
                  }`}
                >
                  <Star
                    fill={jsonData[criterion] >= index ? "#fbbf24" : "white"}
                    size={window.innerWidth < 640 ? 20 : 24}
                  />
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className="flex flex-col px-2 sm:px-8 pb-4">
      <div className="my-4 flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
        <button
          onClick={() => handleSubmit("recommend")}
          className="gap-x-2 py-2 border-2 border-red-800 bg-red-600 px-3 text-xs sm:text-sm flex items-center justify-center text-white w-full"
        >
          <X strokeWidth={1} size={16} className="sm:mr-1" />
          <p>Nerekomenduoju</p>
        </button>

        <button
          onClick={() => handleSubmit("norecommend")}
          className="bg-green-500 border-2 border-green-700 text-white gap-x-2 py-2 text-xs sm:text-sm flex px-3 items-center justify-center w-full"
        >
          <Check strokeWidth={1} size={16} className="sm:mr-1" />
          <p>Rekomenduoju</p>
        </button>
      </div>

      <button
        onClick={() => handleSubmit("skip")}
        className="bg-white text-black text-xs sm:text-sm py-3 h-12 flex items-center justify-center"
      >
        Neturiu šito mokytojo
      </button>
    </div>
  </div>
);
};

const Modal = ({ onClose }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [mounted]);

  if(!mounted) {
    return
  }
  return createPortal(
    <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50">
      <div className="px-4 max-w-sm gap-y-1 h-fit bg-white rounded-lg border border-primary w-fit p-3">
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
            <code className="bg-red-300 px-1 font-bold">Nerekomenduoju</code>
            {" / "}
            <code className="bg-primary/50 px-1 font-bold">Rekomenduoju</code>
          </li>
          <li>
            Vėliau norėdami redaguoti ar ištrinti savo ivertinimą, nueikite ant
            mokytojo profilio arba į savo paskyros skydelį.
          </li>
        </ol>
        <div className="flex justify-end mt-2">
          <button
            onClick={onClose}
            className="bg-primary text-white px-4 py-2 rounded"
          >
            Gerai
          </button>
        </div>
      </div>
    </div>,
    document.getElementById("main-root-for-modal")
  );
};

const TinderCard = ({ teachers }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const navigateBack = () => {
    const pathnameParts = pathname.split("/");
    const schoolPath =
      pathnameParts[0] + pathnameParts[1] + "/" + pathnameParts[2];
    router.push(`/${schoolPath}`);
  };

  const closeModal = () => {
    setIsFirstTime(false);
  };

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
          <h1 className="text-gray-800 text-2xl typed w-full text-center">
            Ačiū už atsiliepimus
          </h1>
          <div className="w-full flex justify-center mt-4">
            <button
              onClick={navigateBack}
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
    <div className="h-auto w-full absolute bg-black border-white pt-4 flex items-center justify-center">
      {isFirstTime && <Modal onClose={closeModal} />}

      {teachers.length > 0 && status === "authenticated" && (
        <Case
          teacher={teachers[currentIndex]}
          setCurrentIndex={setCurrentIndex}
          setDone={setDone}
          currentIndex={currentIndex}
          length={teachers.length}
          navigateBack={navigateBack}
        />
      )}
    </div>
  );
};

export default TinderCard;
