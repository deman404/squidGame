import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import "./TopPage.css";
import model from "../../images/bg-one.png";
function TopPage() {
  return (
    <>
        <div className="mainTop">
          <img src={model} alt="model"  className="bgOne"/>
          <div className="textSide">
            <p>Squid Game</p>
          </div>
        </div>
    </>
  );
}

export default TopPage;
