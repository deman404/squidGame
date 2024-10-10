import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "./TopPage.css";
import model from "../../images/bg-one.png";
import { IoClose } from "react-icons/io5";
import React, { useEffect, useRef, useState } from "react";
import Mask from "../../images/mask.webp";
import useWindowSize from "../../../Hooks/useWindowSize";
function TopPage() {
  const size = useWindowSize();
  const words = [
    "You will find all squid game products",
    " | ",
    "the best store in 2025",
  ];
  const wordTrainRef = useRef(null);
  const [offset, setOffset] = useState(100); // Initial position off the right side
  const animationRef = useRef();
  useEffect(() => {
    const animateTrain = () => {
      setOffset((prevOffset) => {
        // Move the words left, reset when fully off-screen
        return prevOffset <= -100 ? 100 : prevOffset - 0.1; // Smaller step for smoothness
      });
      animationRef.current = requestAnimationFrame(animateTrain);
    };

    animationRef.current = requestAnimationFrame(animateTrain); // Start animation

    return () => cancelAnimationFrame(animationRef.current); // Clean up on unmount
  }, []);

  return (
    <>
      <div className="mainTop">
        <img src={model} alt="model" className="bgOne" />
        <div className="textSide">
          <p className="name1">Squid</p>
          <p className="name2">Game</p>
        </div>
        <span className="shap1"></span>
        <div className="shap2">
          <IoClose color="rgb(167, 2, 2)" size={200} />
        </div>
        <div className="barDown">
          <div
            className="wordTrain"
            ref={wordTrainRef}
            style={{
              ...styles.wordTrain,
              transform: `translateX(${-offset}%)`, // Move the word train based on offset
            }}
          >
            {words.map((word, index) => (
              <span key={index} className="word">
                {word}
              </span>
            ))}
          </div>
        </div>
        <div className="rightSide">
          <img src={Mask} alt="" />
        </div>
        <IoClose
          color="#2a2a83"
          size={200}
          style={{ zIndex: 0, position: "absolute", right: "8%", top: "15%",rotate: "15deg" }}
        />
      </div>
    </>
  );
}
const styles = {
  wordTrain: {
    display: "inline-block",
  },
  word: {
    display: "inline-block",
    marginRight: "20px",
    fontSize: "20px",
  },
};
export default TopPage;
