import React, { useEffect } from "react";
import "./style.css";
import AllUsers from "../AllUsers";
import Sellers from "../Sellers";
import PlantOwners from "../PlantOwners";

const Dashboard = ({ title }) => {
  console.log(title);
  return (
    <div className="dashboardContainer">
      <span className="title">{title}</span>
      {title == "All Users" ? (
        <AllUsers />
      ) : title == "Sellers" ? (
        <Sellers />
      ) : title == "Plant Owners" ? (
        <PlantOwners />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
