import React from "react";
import "./style.css";
import DashboardIcon from "../../assets/pictures/dashboard.svg";
import Users from "../../assets/pictures/users.svg";
import PlantOwners from "../../assets/pictures/PlantOwners.svg";
import Sellers from "../../assets/pictures/Sellers.svg";
import AddUser from "../../assets/pictures/addUser.svg";

const SideMenu = () => {
  return (
    <div className="sideMenuContainer">
      <div className="sideMenuContent">
      <div className="categoryContainer">
          <div className="menuLogoContainer">
            <img src={DashboardIcon} alt="Logo" className="logo" />
          </div>
          <span >Dashboard</span>
        </div>
      <div className="categoryContainer">
          <div className="menuLogoContainer">
            <img src={Users} alt="Logo" className="logo" />
          </div>
          <span >All Users</span>
        </div>
        <div className="categoryContainer">
          <div className=" menuLogoContainer">
            <img src={Sellers} alt="Logo" className="logo" />
          </div>
          <span>Sellers</span>
        </div>
        <div className="categoryContainer">
          <div className=" menuLogoContainer">
            <img src={PlantOwners} alt="Logo" className="logo" />
          </div>
          <span>Plant Owners</span>
        </div> <div className="categoryContainer">
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
