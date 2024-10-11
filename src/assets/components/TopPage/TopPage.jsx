import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { CgMouse } from "react-icons/cg";
import "./TopPage.css";
import model from "../../images/bg-one.png";
import Mask from "../../images/mask.webp";
import useWindowSize from "../../../Hooks/useWindowSize";

function TopPage() {
  const [direction, setDirection] = useState("");
  const size = useWindowSize();
  const words = [
    "You will find all squid game products",
    " | ",
    "the best store in 2025",
  ];

  const wordTrainRef = useRef(null);
  const animationRef = useRef();
  const [offset, setOffset] = useState(100);

  // Animation effect for word train
  useEffect(() => {
    const animateTrain = () => {
      setOffset((prevOffset) => (prevOffset <= -100 ? 100 : prevOffset - 0.1));
      animationRef.current = requestAnimationFrame(animateTrain);
    };
    animationRef.current = requestAnimationFrame(animateTrain);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    if (mouseX < width / 2 && mouseY < height / 2) {
      setDirection("top-left");
    } else if (mouseX >= width / 2 && mouseY < height / 2) {
      setDirection("top-right");
    } else if (mouseX < width / 2 && mouseY >= height / 2) {
      setDirection("bottom-left");
    } else if (mouseX >= width / 2 && mouseY >= height / 2) {
      setDirection("bottom-right");
    }
  };

  return (
    <div className="mainTop">
      <img src={model} alt="model" className="bgOne fadeAnimation" />
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
          style={{ transform: `translateX(${-offset}%)` }}
        >
          {words.map((word, index) => (
            <span key={index} className="word">
              {word}
            </span>
          ))}
        </div>
      </div>

      {size.width > 800 && (
        <div
          className={`rightSide RightAnimation ${direction}`}
          onMouseMove={handleMouseMove}
        >
          <img src={Mask} alt="animated" className="animated-image" />
        </div>
      )}

      <IoClose
        color="#2a2a83"
        size={200}
        className="ioCloseIcon"
      />

      <div className="mouse Animation">
        <CgMouse size={20} color="#ffffff" />
      </div>
    </div>
  );
}

export default TopPage;
