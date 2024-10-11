import React from "react";
import "./header.css";
import logo from "../../images/logo.png";
import { IoBagHandle } from "react-icons/io5";
import useWindowSize from "../../../Hooks/useWindowSize";

function Header() {
  const size = useWindowSize();

  return (
    <div
      className="header TopAnimation"
      style={{
        width: size.width > 800 ? "50%" : "90%",
        left: size.width > 800 ? "25%" : "2.5%",
        right: size.width > 800 ? "25%" : "2.5%",
        justifyContent: size.width > 800 ? "space-around" : "space-between"
      }}
    >
      <img src={logo} alt="logo" className="logo" />
      <div
        className="listNav"
        style={{ display: size.width > 800 ? "flex" : "none" }}
      >
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">About</a>
          </li>
          <li>
            <a href="#">Get Product</a>
          </li>
        </ul>
      </div>
      <div className="btn">
        <IoBagHandle size={20} className="iconLogo" />
      </div>
    </div>
  );
}

export default Header;
