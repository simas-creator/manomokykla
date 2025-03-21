"use client"

import { useState, useRef } from "react"
import Image from "next/image"

const Case = ({ teacher, style, onSwipe }) => {
  const [startX, setStartX] = useState(0)
  const [offsetX, setOffsetX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const cardRef = useRef(null)

  // Start dragging
  const handleStart = (clientX) => {
    setIsDragging(true)
    setStartX(clientX)
  }

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
      className="w-80 h-80 bg-white rounded-lg shadow-lg -translate-x-1/2 -translate-y-1/2 cursor-grab active:cursor-grabbing"
      style={cardStyle}
      onMouseDown={(e) => handleStart(e.clientX)}
      onMouseMove={(e) => handleMove(e.clientX)}
      onMouseUp={handleEnd}
      onMouseLeave={handleEnd}
      onTouchStart={(e) => handleStart(e.touches[0].clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
      onTouchEnd={handleEnd}
    >
      <div className="p-4">
        <h3 className="text-xl font-bold">{teacher.name}</h3>
        {teacher.subject && <p className="text-gray-600">{teacher.subject}</p>}
        {teacher.description && <p className="mt-2">{teacher.description}</p>}
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

  // Handle swipe completion
  const handleSwipe = (direction) => {
    setDirection(direction)

    // Move to next teacher after animation
    setTimeout(() => {
      if (currentIndex < teachers.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        // Optional: loop back to the first teacher
        setCurrentIndex(0)
      }
      setDirection(null)
    }, 300)
  }

  return (
    <div className="h-[100vh] w-full absolute bg-black border-b border-white">
      <button
        onClick={() => setOpen(false)}
        className="absolute top-2 left-4 text-white border border-primary px-4 py-2 rounded-md font-thin m-4"
      >
        Grįžti atgal
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