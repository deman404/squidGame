import React, { useState, useEffect } from "react";
import "./TimerTab.css";

function TimerTab() {
  const [hours, setHours] = useState(1); // Start with 1 hour
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      } else if (minutes > 0) {
        setMinutes(minutes - 1);
        setSeconds(59);
      } else if (hours > 0) {
        setHours(hours - 1);
        setMinutes(59);
        setSeconds(59);
      }
    }, 1000);

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [hours, minutes, seconds]);

  return (
    <div className="TimerSidePage">
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
    </div>
  );
}

export default TimerTab;
