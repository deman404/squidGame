import React, { useState, useEffect, useRef } from "react";
import "./TimerTab.css";
import { useSpring, animated } from "@react-spring/web";
import useWindowSize from "../../../Hooks/useWindowSize";
import { TbTriangleFilled, TbRectangleFilled } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";
import triangle from "../../images/triangle.png";
import square from "../../images/square.png";
import circle from "../../images/circle.png";
import { RiCheckboxBlankFill } from "react-icons/ri";
import { LuChevronLeft } from "react-icons/lu";




function TimerTab() {
  const size = useWindowSize();
  const [hours, setHours] = useState(1); // Start with 1 hour
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fade, setFade] = useState(false); // State for fade animation
  const timerRef = useRef(null); // Reference for the timer
  const timerTabRef = useRef(null); // Reference for the TimerTab component
  const [isVisible, setVisible] = useState(false); // State to show the GiftCard
  const [showGiftCard, setShowGiftCard] = useState(false); // State to handle GiftCard visibility
  const RandomGiftValue = [5, 30, 10, 40, 20, 70, 90];
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);
  const [randomGift, setRandomGift] = useState(null); // State to store the current random value

  // Spring animation properties
  const fadeProps = useSpring({
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 280, friction: 60 },
  });

  // Generate a random gift when the component loads
  useEffect(() => {
    setRandomGift(getRandomGift());
  }, []);

  const getRandomGift = () => {
    const randomIndex = Math.floor(Math.random() * RandomGiftValue.length);
    return RandomGiftValue[randomIndex];
  };

  // Timer logic
  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds((prev) => prev - 1);
      } else if (minutes > 0) {
        setMinutes((prev) => prev - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours((prev) => prev - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    return () => clearInterval(timer); // Cleanup the timer
  }, [seconds, minutes, hours]);

  // Intersection Observer for the entire TimerTab
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setFade(entry.isIntersecting); // Set fade based on visibility
      },
      { threshold: 0.1 } // Trigger when 10% of the component is visible
    );

    if (timerTabRef.current) {
      observer.observe(timerTabRef.current);
    }

    return () => {
      if (timerTabRef.current) {
        observer.unobserve(timerTabRef.current);
      }
    };
  }, [timerTabRef]);

  // Intersection Observer for individual card animations
  useEffect(() => {
    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add(
              entry.target === leftCardRef.current
                ? "fadeLeftAnimation"
                : "fadeRightAnimation"
            );
          } else {
            entry.target.classList.remove(
              entry.target === leftCardRef.current
                ? "fadeLeftAnimation"
                : "fadeRightAnimation"
            );
          }
        });
      },
      { threshold: 0.1 }
    );

    if (leftCardRef.current) cardObserver.observe(leftCardRef.current);
    if (rightCardRef.current) cardObserver.observe(rightCardRef.current);

    return () => {
      if (leftCardRef.current) cardObserver.unobserve(leftCardRef.current);
      if (rightCardRef.current) cardObserver.unobserve(rightCardRef.current);
    };
  }, []);

  // Handle card click
  const handleCardClick = () => {
    setShowGiftCard(true); // Show the GiftCard when a card is clicked
  };

  return (
    <>
      <animated.div
        ref={timerTabRef}
        className="TimerSidePage"
        style={{ fadeProps, justifyContent: size.width > 800 ? "" : "center" }}
      >
        <h1
          className="HeaderTitle"
          style={{ fontSize: size.width > 1300 ? 60 : 25 }}
        >
          Last Deal
        </h1>
        <div className="TimeCountainer">
          <div
            className="Houre"
            style={{
              fontSize: size.width > 1300 ? 80 : 18,
              width: size.width > 1300 ? 150 : 100,
            }}
          >
            <span>{hours.toString().padStart(2, "0")}</span>
          </div>
          <div
            className="Min"
            style={{
              fontSize: size.width > 1300 ? 80 : 18,
              width: size.width > 1300 ? 150 : 100,
            }}
          >
            <span>{minutes.toString().padStart(2, "0")}</span>
          </div>
          <div
            className="Sec"
            style={{
              fontSize: size.width > 1300 ? 80 : 18,
              width: size.width > 1300 ? 150 : 100,
            }}
          >
            <span>{seconds.toString().padStart(2, "0")}</span>
          </div>
        </div>
        <h1 className="MagicTitle">Choose your card</h1>
        <div className="cardMagic">
          <div
            ref={leftCardRef}
            className="back gift2"
            style={{
              height: size.width > 1300 ? 300 : 250,
              width: size.width > 1300 ? 200 : 150,
            }}
            onClick={handleCardClick} // Trigger GiftCard on click
          >
            <div className="back-content">
              <img src={circle} alt="mask" style={{ width: 80 }} />
            </div>
          </div>
          <div
            className="back gift1"
            style={{
              height: size.width > 1300 ? 300 : 250,
              width: size.width > 1300 ? 200 : 150,
            }}
            onClick={handleCardClick} // Trigger GiftCard on click
          >
            <div className="back-content">
              <img src={triangle} alt="mask" style={{ width: 80 }} />
            </div>
          </div>
          <div
            ref={rightCardRef}
            className="back gift3"
            style={{
              height: size.width > 1300 ? 300 : 250,
              width: size.width > 1300 ? 200 : 150,
            }}
            onClick={() => {
              handleCardClick();
              setRandomGift(getRandomGift());
            }} // Trigger GiftCard on click
          >
            <div className="back-content">
              <img src={square} alt="mask" style={{ width: 80 }} />
            </div>
          </div>
        </div>

        {/* Conditionally render the GiftCard */}
        {showGiftCard && (
          <div
            className="GiftCard "
            style={{
              background: "#00000066",
              width: "100%",
              height: "100%",
              position: "absolute",
              top: 0,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backdropFilter: "blur(6.5px)",
              WebkitBackdropFilter: "blur(6.5px)",
              ...fadeProps,
            }}
          >
            <h1 style={{ color: "#fff", fontSize: 25 }}>You Win</h1>
            <div
              className="back fadeUPAnimation "
              style={{ height: size.width > 800 ? 300 : 300, marginTop: 0 }}
            >
              <div className="back-content">
                {randomGift !== null && (
                  <p style={{ fontSize: 30, fontWeight: "bold" }}>
                    {randomGift}%
                  </p>
                )}
              </div>
            </div>
            <div
              className="btnColect"
              onClick={() => setShowGiftCard(false)}
              style={fadeProps}
            >
              <p>Collect</p>
            </div>
          </div>
        )}
      </animated.div>
      <div className="Sold" style={{display:size.width > 800 ? "flex" : "none" }}>
      <LuChevronLeft size={20} className="openIcon"/>
        <FaCircle  size={20} className="iconsSold"/>
        <TbTriangleFilled  size={20} className="iconsSold"/>
        <RiCheckboxBlankFill  size={20} className="iconsSold"/>
        </div>
    </>
  );
}

export default TimerTab;
