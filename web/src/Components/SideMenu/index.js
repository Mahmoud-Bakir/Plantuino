import React, { useState } from "react";
import DashboardIcon from "../../assets/pictures/dashboard.svg";
import Users from "../../assets/pictures/users.svg";
import PlantOwners from "../../assets/pictures/PlantOwners.svg";
import Sellers from "../../assets/pictures/Sellers.svg";
import AddUser from "../../assets/pictures/addUser.svg";
import "./style.css";

const SideMenu = ({ handleChoice }) => {
  const [selectedChoice, setSelectedChoice] = useState(null);

  const choose = (choice) => {
    handleChoice(choice);
    setSelectedChoice(choice);
  };

  return (
    <div className="sideMenuContainer">
      <div className="sideMenuContent">
        <div
          className={`categoryContainer ${selectedChoice === "Dashboard" ? "selected" : ""}`}
          onClick={() => choose("Dashboard")}
        >
          <div className="menuLogoContainer">
            <img src={DashboardIcon} alt="Logo" className="logo" />
          </div>
          <span>Dashboard</span>
        </div>
        <div
          className={`categoryContainer ${selectedChoice === "All Users" ? "selected" : ""}`}
          onClick={() => choose("All Users")}
        >
          <div className="menuLogoContainer">
            <img src={Users} alt="Logo" className="logo" />
          </div>
          <span>All Users</span>
        </div>
        <div
          className={`categoryContainer ${selectedChoice === "Sellers" ? "selected" : ""}`}
          onClick={() => choose("Sellers")}
        >
          <div className=" menuLogoContainer">
            <img src={Sellers} alt="Logo" className="logo" />
          </div>
          <span>Sellers</span>
        </div>
        <div
          className={`categoryContainer ${selectedChoice === "Plant Owners" ? "selected" : ""}`}
          onClick={() => choose("Plant Owners")}
        >
          <div className=" menuLogoContainer">
            <img src={PlantOwners} alt="Logo" className="logo" />
          </div>
          <span>Plant Owners</span>
        </div>
        <div
          className={`categoryContainer ${selectedChoice === "Add User" ? "selected" : ""}`}
          onClick={() => choose("Add User")}
        >
          <div className=" menuLogoContainer">
            <img src={AddUser} alt="Logo" className="logo" />
          </div>
          <span>Add User</span>
        </div>
      </div>
    </div>
  );
};

export default SideMenu;
