import React from "react";
import "./Header.scss";

import imgLogo from "./img/Logo.svg";

export default function Header() {
  function d() {
    console.log("пидор");
  }
  return (
    <div className="Header">
      <div className="container">
        <a href="/">
          <img src={imgLogo}></img>
        </a>
        <div className="Header__btns-wrapp">
          <button onClick={d}>Users</button>
          <button>Sign up</button>
        </div>
      </div>
    </div>
  );
}
