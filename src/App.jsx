import React from "react";
import Header from "./assets/components/header/Header";
import "./App.css"; // Assuming you have some basic styling
import TopPage from "./assets/components/TopPage/TopPage";
import TimerTab from "./assets/components/TimerSection/TimerTab";
import CustomCursor from "./Hooks/CustomCursor";
import Store from "./assets/components/Store/Store";
export default function App() {
  return (
    <div className="mainPage">
      <Header /> {/* Ensure this is properly styled */}
      <div className="side">
        <div className="TopPage">
          <TopPage />
        </div>
        <div className="TimerTab">
          <TimerTab />
        </div>
        <div className="StoreTab">
          <Store />
        </div>
      </div>
      <CustomCursor />
    </div>
  );
}
