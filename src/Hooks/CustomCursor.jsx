// src/components/CustomCursor.jsx

import React, { useEffect, useState } from "react";
import "./CustomCursor.css"; // Import the CSS for styling

const CustomCursor = () => {
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const handleMouseMove = (event) => {
      setCursorPosition({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      <div
        className="custom-cursor"
        style={{
          left: cursorPosition.x,
          top: cursorPosition.y,
        }}
      />
      {/* Fire particles */}
      {Array.from({ length: 10 }).map((_, index) => (
        <div
          key={index}
          className="fire-particle"
          style={{
            left: cursorPosition.x + Math.random() * 30 - 15, // Randomize x position
            top: cursorPosition.y + Math.random() * 30 - 15, // Randomize y position
            animationDelay: `${Math.random() * 500}ms`, // Randomize animation delay
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
