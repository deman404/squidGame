import React from "react";
import Header from "./assets/components/header/Header";
import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import "./App.css"; // Assuming you have some basic styling
import TopPage from "./assets/components/TopPage/TopPage";

export default function App() {
  return (
    <div className="mainPage">
      <Header /> {/* Ensure this is properly styled */}
      <div className="side">
        <TopPage/>
      </div>
    </div>
  );
}
