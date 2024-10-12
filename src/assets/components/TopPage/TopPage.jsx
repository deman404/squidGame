import React, { useEffect, useRef, useState } from "react";
import { IoClose } from "react-icons/io5";
import { CgMouse } from "react-icons/cg";
import "./TopPage.css";
import model from "../../images/bg-one.png";
import Mask from "../../images/mask.webp";
import useWindowSize from "../../../Hooks/useWindowSize";
import { useSpring, animated } from "@react-spring/web";

function TopPage() {
  const [direction, setDirection] = useState("");
  const size = useWindowSize();
  const words = [
    "You will find all squid game products",
    " | ",
    "the best store in 2025",
  ];
  const [scrollY, setScrollY] = useState(0);
  const [offset, setOffset] = useState(100);
  const animationRef = useRef();

  // Ref for the TopPage component
  const topPageRef = useRef(null);

  // Handle scroll and update scrollY state
  const handleScroll = () => {
    setScrollY(window.scrollY);
  };

  // Animation effect for word train and scroll
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    const animateTrain = () => {
      setOffset((prevOffset) => (prevOffset <= -100 ? 100 : prevOffset - 0.1));
      animationRef.current = requestAnimationFrame(animateTrain);
    };
    animationRef.current = requestAnimationFrame(animateTrain);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationRef.current);
    };
  }, []);

  // Fade-in animation properties
  const [fade, setFade] = useState(false);
  const fadeProps = useSpring({
    opacity: fade ? 1 : 0,
    transform: fade ? 'translateY(0px)' : 'translateY(-20px)',
    config: { tension: 280, friction: 60 },
  });

  // Intersection Observer to trigger animation on visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFade(true); // Fade in when in view
        } else {
          setFade(false); // Fade out when not in view
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (topPageRef.current) {
      observer.observe(topPageRef.current);
    }

    return () => {
      if (topPageRef.current) {
        observer.unobserve(topPageRef.current);
      }
    };
  }, [topPageRef]);

  // Scroll animation properties
  const props = useSpring({
    opacity: scrollY < 300 ? 1 - scrollY / 300 : 0,
    transform: `translateY(${scrollY / 2}px)`,
  });

  // Mouse move direction handling
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.target.getBoundingClientRect();
    const mouseX = e.clientX - left;
    const mouseY = e.clientY - top;

    setDirection(
      mouseX < width / 2 
        ? (mouseY < height / 2 ? "top-left" : "bottom-left") 
        : (mouseY < height / 2 ? "top-right" : "bottom-right")
    );
  };

  return (
    <animated.div ref={topPageRef} className="mainTop" style={fadeProps}>
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
        <div className="wordTrain" style={{ transform: `translateX(${-offset}%)` }}>
          {words.map((word, index) => (
            <span key={index} className="word">{word}</span>
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

      <IoClose color="#2a2a83" size={200} className="ioCloseIcon" />

      <div className="mouse Animation">
        <CgMouse size={20} color="#ffffff" />
      </div>
    </animated.div>
  );
}

export default TopPage;
