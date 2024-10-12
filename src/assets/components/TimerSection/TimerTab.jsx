import React, { useState, useEffect, useRef } from "react";
import "./TimerTab.css";
import { useSpring, animated } from "@react-spring/web";
import useWindowSize from "../../../Hooks/useWindowSize";
import { TbTriangleFilled, TbRectangleFilled } from "react-icons/tb";
import { FaCircle } from "react-icons/fa";

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

  // Refs for each card element
  const leftCardRef = useRef(null);
  const rightCardRef = useRef(null);

  // Spring animation properties
  const fadeProps = useSpring({
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 280, friction: 60 },
  });

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
            // Add animation class when the element is visible
            entry.target.classList.add(
              entry.target === leftCardRef.current
                ? "fadeLeftAnimation"
                : "fadeRightAnimation"
            );
          } else {
            // Remove animation class when the element is not visible
            entry.target.classList.remove(
              entry.target === leftCardRef.current
                ? "fadeLeftAnimation"
                : "fadeRightAnimation"
            );
          }
        });
      },
      { threshold: 0.1 } // Trigger when 10% of the card is visible
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
        <h1 className="HeaderTitle">Last Deal</h1>
        <div className="TimeCountainer">
          <div className="Houre">
            <span>{hours.toString().padStart(2, "0")}</span>
          </div>
          <div className="Min">
            <span>{minutes.toString().padStart(2, "0")}</span>
          </div>
          <div className="Sec">
            <span>{seconds.toString().padStart(2, "0")}</span>
          </div>
        </div>
        <h1 className="MagicTitle">Choose your card</h1>
        <div className="cardMagic">
          <div
            ref={leftCardRef}
            className="back gift2"
            style={{ height: size.width > 800 ? 300 : 200 }}
            onClick={handleCardClick} // Trigger GiftCard on click
          >
            <div className="back-content">
              <TbTriangleFilled color="#ffffff" size={50} />
            </div>
          </div>
          <div
            className="back gift1"
            style={{ height: size.width > 800 ? 300 : 200 }}
            onClick={handleCardClick} // Trigger GiftCard on click
          >
            <div className="back-content">
              <FaCircle color="#ffffff" size={50} />
            </div>
          </div>
          <div
            ref={rightCardRef}
            className="back gift3"
            style={{ height: size.width > 800 ? 300 : 200 }}
            onClick={handleCardClick} // Trigger GiftCard on click
          >
            <div className="back-content">
              <TbRectangleFilled color="#ffffff" size={50} />
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
              fadeProps,

            }}
          >
            <h1 style={{ color: "#fff", fontSize: "5vW",margin:0 }} >You Win</h1>
            <div
              className="back fadeUPAnimation "
              style={{ height: size.width > 800 ? 300 : 300 }}
            >
              <div className="back-content">
                <FaCircle color="#ffffff" size={50} />
              </div>
            </div>
            <div className="btnColect" onClick={() => setShowGiftCard(false)} style={fadeProps}>
              <p>Collect</p>
            </div>
          </div>
        )}
      </animated.div>
    </>
  );
}

export default TimerTab;
