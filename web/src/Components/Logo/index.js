import React from "react";
import Logos from "../../assets/pictures/logo.svg";
import Name from "../../assets/pictures/logoName.svg";
import "./style.css";
const Logo = () => {
  return (
    <div className="authLogo">
      <div className="logoContainer">
        <img src={Logos} alt="Logo" className="logo" />
      </div>
      <div className="logoNameContainer">
        <img src={Name} alt="Logo" className=" logo logoName" />
      </div>
    </div>
  );
};

export default Logo;
