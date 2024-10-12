import React, { useState, useEffect, useRef } from "react";
import "./TimerTab.css";
import { useSpring, animated } from "@react-spring/web";
import { useWindowSize } from "@react-hook/window-size";
import { TbTriangleFilled } from "react-icons/tb";
function TimerTab() {
  const size = useWindowSize();
  const [hours, setHours] = useState(1); // Start with 1 hour
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [fade, setFade] = useState(false); // State for fade animation
  const timerRef = useRef(null); // Reference for the timer
  const timerTabRef = useRef(null); // Reference for the TimerTab component
  // Spring animation properties
  const fadeProps = useSpring({
    opacity: fade ? 1 : 0,
    transform: fade ? "translateY(0px)" : "translateY(20px)",
    config: { tension: 280, friction: 60 },
  });

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

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [seconds, minutes, hours]);

  // Intersection Observer to trigger fade animation
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

  return (
    <animated.div ref={timerTabRef} className="TimerSidePage" style={fadeProps}>
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
      <h1 className="MagicTitle">Chose your card</h1>
      <div className="cardMagic">
        <div className="back fadeLeftAnimation">
          <div className="back-content">
          <TbTriangleFilled color="#ffffff" size={50} />
            <strong>ccc</strong>
          </div>
        </div>
        <div className="back">
          <div className="back-content">
          <TbTriangleFilled color="#ffffff" size={50} />
            <strong>ss</strong>
          </div>
        </div>
        <div className="back fadeRightAnimation">
          <div className="back-content">
          <TbTriangleFilled color="#ffffff" size={50} />
            <strong>cc</strong>
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default TimerTab;
