"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"

const Case = ({ teacher, style, onSwipe }) => {
  const criteria = [
    "Gebėjimas perteikti žinias",
    "Gebėjimas bendrauti su mokiniais",
    "Dalyko išmanymas",
  ];
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef(null)
  const [jsonData, setJsonData] = useState({})
  // Start dragging
  const handleStart = (clientX) => {
    setIsDragging(true)
    setStartX(clientX)
  }

  const handleRating = (criterion, value) => {
    setJsonData((prev) => ({
      ...prev,
      [criterion]: value,
    }));
  };
  // Handle mouse/touch move
  const handleMove = (clientX) => {
    if (!isDragging) return
    const diff = clientX - startX
    setOffsetX(diff)
  }
 
  // End dragging
  const handleEnd = () => {
    if (!isDragging) return

    // Determine if swipe was significant enough
    if (Math.abs(offsetX) > 100) {
      // Swipe was significant
      const direction = offsetX > 0 ? "right" : "left"
      onSwipe(direction)
    }
    
    // Reset position
    setOffsetX(0)
    setIsDragging(false)
  }

  // Calculate rotation based on drag distance
  const rotation = offsetX * 0.1 // 0.1 degrees per pixel

  // Combine passed style with swipe transform
  const cardStyle = {
    ...style,
    transform: `translateX(${offsetX}px) rotate(${rotation}deg)`,
    transition: isDragging ? "none" : "transform 0.3s ease",
  }

  return (
    <div
      ref={cardRef}
      className="max-w-80 w-auto h-80 bg-white rounded-lg shadow-lg cursor-grab active:cursor-grabbing"
      style={cardStyle}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <div className="p-4 flex justify-center flex-col">
        <div className="ml-2 flex gap-x-2 items-center">
          <Image src={teacher.imageUrl} width={50} height={50} alt="mokytojas"></Image>
          <div className="flex flex-col">
            <h3 className="text-xl font-bold truncate">{(teacher.name + ' ' + teacher.surname).slice(0,21)}
            {teacher.name.length + teacher.surname.length > 20 && "..."}
            </h3>
            
            {teacher.subject && <p className="text-gray-600">{teacher.subject}</p>}
          </div>

          
        </div>
        <div className="flex flex-col gap-4 mt-4">
              {criteria.map((criterion) => (
                <div key={criterion} className="flex flex-col">
                  <p className="font-medium text-gray-700">{criterion}</p>
                  <div className="rating flex gap-1">
                    {[1, 2, 3, 4, 5].map((index) => (
                      <input
                        key={index}
                        type="radio"
                        name={criterion}
                        className="mask mask-star-2 w-8 h-8 bg-orange-400"
                        onChange={() => handleRating(criterion, index)}
                        defaultChecked={index===1}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
      </div>

      {/* Swipe indicators */}
      <div
        className={`absolute top-4 left-[-40px] px-2 py-1 rounded font-bold transform -rotate-12 transition-opacity ${
          offsetX < -20 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image src={'/images/thumbs-down-red.svg'} width={80} height={80} alt="thumbs-up"></Image>
      </div>

      <div
        className={`absolute top-4 right-[-40px] rounded font-bold transform rotate-12 transition-opacity ${
          offsetX > 20 ? "opacity-100" : "opacity-0"
        }`}
      >
        <Image src={'/images/thumbs-up.svg'} width={80} height={80} alt="thumbs-up"></Image>
      </div>
    </div>
  )
}

const TinderCard = ({ teachers, setOpen, img }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(null)
  const [done, setDone] = useState(false)
  
  // Handle swipe completion
  const handleSwipe = (direction) => {
    setDirection(direction)

    // Move to next teacher after animation
    setTimeout(() => {
      if (currentIndex < teachers.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        setDone(true);
      }
      setDirection(null)
    }, 300)
  }
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  },[teachers])
  if(done) {
    return (
      <div className="h-[100vh] w-full absolute bg-black border-b border-white">
        <button
        onClick={() => setOpen(false)}
        className="flex fixed top-16 lg:top-[68px] bg-white z-20 h-10 w-32 border p-2 items-center gap-2 text-gray-700 hover:text-black transition-all duration-300  group"
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
    )
  }
  return (
    <div className="h-[100vh] w-full absolute bg-black border-b border-white">
      <button
        onClick={() => setOpen(false)}
        className="flex fixed top-16 bg-white z-20 h-10 w-32 border p-2 md:top-[68px]items-center gap-2 text-gray-700 hover:text-black transition-all duration-300  group"
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
      {teachers.length > 0 && (
        <Case
          teacher={teachers[currentIndex]}
          style={{
            zIndex: 10,
            opacity: direction ? 0 : 1,
            transform:
              direction === "left"
                ? "translateX(-100%) rotate(-10deg)"
                : direction === "right"
                  ? "translateX(100%) rotate(10deg)"
                  : "none",
          }}
          onSwipe={handleSwipe}
        />
      )}
      </div>
      

      {/* Show next card behind current one */}
      {teachers.length > 1 && currentIndex < teachers.length - 1 && (
        <div className="w-80 h-80 bg-white rounded-lg shadow-lg absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -z-10 scale-95 opacity-70">
          <div className="p-4">
            <h3 className="text-xl font-bold">{teachers[currentIndex + 1].name}</h3>
          </div>
        </div>
      )}

      {/* Simple navigation controls */}
      <div className="mt-4 flex justify-center gap-4">
        <button
          onClick={() => handleSwipe("left")}
          className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold"
        >
          <Image src={'/images/thumbs-down-red.svg'} width={30} height={30} alt="thumbs-up"></Image>
        </button>
        <button
          onClick={() => handleSwipe("up")}
          className="bg-white text-black rounded-md px-4 h-12 flex items-center justify-center font-bold"
        >
          Neturiu šito mokytojo
        </button>
        <button
          onClick={() => handleSwipe("right")}
          className="bg-white text-black w-12 h-12 rounded-full flex items-center justify-center font-bold"
        >
          <Image src={'/images/thumbs-up.svg'} width={30} height={30} alt="thumbs-up"></Image>
        </button>
      </div>

      {/* Card counter */}
      <div className="left-0 right-0 text-center text-white">
        {currentIndex + 1} / {teachers.length}
      </div>
    </div>
  )
}

export default TinderCard