"use client";

import { useEffect, useState } from "react";
import { Check, StarIcon, X, ArrowLeft, Info } from "lucide-react";
import { useSession } from "next-auth/react";
import { Star } from "lucide-react";
import didUserReview from "@/lib/checkUserReviews";
const criteria = [
  "Gebėjimas perteikti žinias",
  "Gebėjimas bendrauti su mokiniais",
  "Dalyko išmanymas",
];

const Case = ({
  teacher,
  setCurrentIndex,
  currentIndex,
  length,
  navigateBack,
  user,
}) => {
  const [error, setError] = useState("");
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
        setError({});
        navigateBack();
        return;
      }
      setCurrentIndex((prev) => prev + 1);
      setError({});
      return;
    }
    const errors = Object.fromEntries(
      Object.entries(jsonData).filter(([_, value]) => value === 0)
    );
    if (Object.keys(errors).length > 0) {
      setError(errors);
      return;
    }
    if (direction === "recommend") {
      const formData = {
        ...jsonData,
        rec: true,
      };
      // Handle form submission
      if (currentIndex + 1 === length) {
        navigateBack();
      } else {
        setCurrentIndex((prev) => prev + 1);
        setJsonData({
          "Gebėjimas bendrauti su mokiniais": 0,
          "Gebėjimas perteikti žinias": 0,
          "Dalyko išmanymas": 0,
        });
      }
    }
    if (direction === "norecommend") {
      // Handle form submission
      if (currentIndex + 1 === length) {
        navigateBack();
      } else {
        setCurrentIndex((prev) => prev + 1);
        setJsonData({
          "Gebėjimas bendrauti su mokiniais": 0,
          "Gebėjimas perteikti žinias": 0,
          "Dalyko išmanymas": 0,
        });
      }
    }
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 relative h-fit rounded-2xl shadow-2xl max-w-md w-[95%] mx-auto overflow-hidden border border-gray-700">
      {/* Header with teacher image */}
      <div className="relative">
        <div 
          className="h-48 w-full bg-gradient-to-b bg-white flex items-center justify-center"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)), url(${teacher.imageUrl})`,
            backgroundSize: "contain",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat"
          }}
        >
          <div className="absolute inset-0 flex items-center justify-center">
            {!teacher.imageUrl && (
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-4xl font-bold text-white">
                {teacher.name[0]}{teacher.surname[0]}
              </div>
            )}
          </div>
        </div>
        
        {/* Back button */}
        <button
          onClick={navigateBack}
          className="absolute top-4 left-4 p-2 rounded-full bg-gray-800/70 text-white hover:bg-gray-700/90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        
        {/* Card counter pill */}
        <div className="absolute right-4 top-4 bg-gray-800/70 text-white px-3 py-1 rounded-full text-sm font-medium">
          {currentIndex + 1} / {length}
        </div>
      </div>
      
      {/* Teacher info */}
      <div className="flex flex-col bg-primary text-center p-4 shadow-md">
        <h3 className="text-2xl font-bold text-white">
          {(teacher.name + " " + teacher.surname).slice(0, 21)}
          {teacher.name.length + teacher.surname.length > 20 && "..."}
        </h3>

        {teacher.subject && (
          <p className="text-gray-100 text-lg font-medium mt-1">{teacher.subject}</p>
        )}
      </div>
      
      {/* Rating criteria */}
      <div className="space-y-3 p-4">
        {criteria.map((criterion) => (
          <div key={criterion} className="bg-gray-700/70 p-3 rounded-lg backdrop-blur-sm">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-100 font-medium">{criterion}</p>
            </div>
            <div className="rating flex gap-1 justify-center">
              {[1, 2, 3, 4, 5].map((index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => handleRating(criterion, index)}
                  className={`star-rating w-10 h-10 flex items-center justify-center transition-all ${
                    jsonData[criterion] >= index
                      ? "text-amber-400 transform scale-105"
                      : "text-gray-400 hover:text-gray-300"
                  }`}
                >
                  <Star
                    fill={jsonData[criterion] >= index ? "#fbbf24" : "transparent"}
                    stroke={jsonData[criterion] >= index ? "#fbbf24" : "currentColor"}
                    size={32}
                    className="transition-all duration-200"
                  />
                </button>
              ))}
            </div>
            {error[criterion] !== undefined && (
              <div className="mt-1 bg-red-500/20 rounded p-1 flex items-center justify-center">
                <p className="text-red-300 text-xs font-medium">Užpildykite šį laukelį</p>
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Action buttons */}
      <div className="flex flex-col px-4 pb-6 pt-2 space-y-4">
        <div className="flex justify-between gap-4">
          <button
            onClick={() => handleSubmit("norecommend")}
            className="gap-x-2 py-3 border border-red-700 bg-gradient-to-r from-red-600 to-red-700 rounded-lg text-sm font-medium flex items-center px-4 justify-center text-white w-full transition-all hover:brightness-110 shadow-md"
          >
            <X strokeWidth={2} size={18} className="mr-2" />
            <p>Nerekomenduoju</p>
          </button>

          <button
            onClick={() => handleSubmit("recommend")}
            className="bg-gradient-to-r from-green-500 to-green-600 border border-green-700 text-white gap-x-2 py-3 rounded-lg text-sm font-medium flex px-4 items-center justify-center w-full transition-all hover:brightness-110 shadow-md"
          >
            <Check strokeWidth={2} size={18} className="mr-2" />
            <p>Rekomenduoju</p>
          </button>
        </div>

        <button
          onClick={() => handleSubmit("skip")}
          className="bg-gradient-to-r from-gray-600 to-gray-700 text-gray-100 text-sm py-3 rounded-lg flex items-center justify-center shadow-md hover:brightness-110 transition-all font-medium"
        >
          Neturiu šito mokytojo
        </button>
      </div>
    </div>
  );
};

export const Modal = ({ onClose }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, [mounted]);

  if (!mounted) {
    return null;
  }
  
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center w-full px-4 justify-center z-50">
      <div className="px-6 max-w-sm gap-y-1 h-fit bg-white rounded-xl border-l-4 border-blue-500 shadow-2xl w-auto p-4">
        <div className="border-b border-gray-200 py-3 flex w-full gap-x-2 items-center">
          <Info stroke="#0080FF" size={24} />
          <h5 className="font-bold text-lg text-gray-800">Kaip naudotis?</h5>
        </div>

        <ol className="text-sm text-gray-700 list-decimal px-6 space-y-3 py-4">
          <li>
            Jeigu jūsų nemoko rodomas mokytojas, spauskite{" "}
            <code className="bg-gray-200 px-2 py-0.5 rounded font-bold text-gray-800">
              Neturiu šito mokytojo
            </code>
          </li>
          <li>
            Įvertinkite mokytoją pateiktais 3 kriterijais
            <span className="flex items-center gap-x-1 font-bold mt-1 text-amber-500">
              1-5
              <StarIcon fill="#f59e0b" />
            </span>
          </li>
          <li>
            Priduodami įvertinimą pasirinkite{" "}
            <code className="bg-red-100 px-2 py-0.5 rounded font-bold text-red-800">
              Nerekomenduoju
            </code>
            {" / "}
            <code className="bg-green-100 px-2 py-0.5 rounded font-bold text-green-800">
              Rekomenduoju
            </code>
          </li>
          <li>
            Vėliau norėdami redaguoti ar ištrinti savo ivertinimą, nueikite ant
            mokytojo profilio arba į savo paskyros skydelį.
          </li>
        </ol>
        <div className="flex justify-end mt-3">
          <button
            onClick={onClose}
            className="bg-gradient-to-r from-primary to-primary/60 text-white px-5 py-2 rounded-lg hover:brightness-110 transition-all font-medium shadow-md"
          >
            Gerai
          </button>
        </div>
      </div>
    </div>
  );
};

const TinderCard = ({ teachers, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [iterableTeachers, setIterableTeachers] = useState([])
  const { data: session, status } = useSession();
useEffect(() => {
  if (!session?.user?.email || !Array.isArray(teachers) || !teachers) return;
  async function filterTeachers(){
    const teacherIds = teachers.map(teacher => teacher._id)
    const reviewed = await didUserReview(teacherIds, session.user.email)
    const unreviewed = teachers.filter(teacher => {
          const result = reviewed.find(r => r.teacherId === teacher._id);
          return result && !result.reviewed;
        });
        
        setIterableTeachers(unreviewed);
  }


  filterTeachers();
}, [session?.user?.email, teachers]);
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-white font-medium">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen w-full absolute bg-gradient-to-b from-gray-900 to-black pt-8 pb-12 flex items-center justify-center">
      
      {iterableTeachers.length > 0 && status === "authenticated" && (
        <Case
          teacher={iterableTeachers[currentIndex]}
          setCurrentIndex={setCurrentIndex}
          currentIndex={currentIndex}
          length={teachers.length}
          navigateBack={onClose}
          user={session.user.email}
        />
      )}
    </div>
  );
};

export default TinderCard;