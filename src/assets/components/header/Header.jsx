import React from "react";
import "./header.css";
import logo from "../../images/logo.png";
import { IoBagHandle } from "react-icons/io5";
function Header() {
  return (
    <div className="header">
      <img src={logo} alt="logo" className="logo" />
      <div className="listNav">
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
        <IoBagHandle size={20} className="iconLogo"/>
      </div>
    </div>
  );
}

export default Header;
