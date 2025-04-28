const CoordinateGridBackground = ({ 
    color = "#E5E7EB", 
    spacing = 40, 
    lineWidth = 1,
    showAxis = true,
    axisColor = "#000000",
    axisWidth = 2
  }) => {
    return (
      <div className="coordinate-grid-background absolute inset-0 -z-10 overflow-hidden">
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute inset-0"
        >
          <defs>
            <pattern
              id="grid"
              width={spacing}
              height={spacing}
              patternUnits="userSpaceOnUse"
            >
              <path
                d={`M ${spacing} 0 L 0 0 0 ${spacing}`}
                fill="none"
                stroke={color}
                strokeWidth={lineWidth}
              />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          
          {showAxis && (
            <>
              {/* X-Axis */}
              <line
                x1="0"
                y1="50%"
                x2="100%"
                y2="50%"
                stroke={axisColor}
                strokeWidth={axisWidth}
              />
              
              {/* Y-Axis */}
              <line
                x1="50%"
                y1="0"
                x2="50%"
                y2="100%"
                stroke={axisColor}
                strokeWidth={axisWidth}
              />
            </>
          )}
        </svg>
      </div>
    );
  };
  
  export default CoordinateGridBackground;