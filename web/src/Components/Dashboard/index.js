import React, { useEffect } from "react";
import "./style.css";
import AllUsers from "../AllUsers";
import Sellers from "../Sellers";

const Dashboard = ({ title }) => {
  console.log(title);
  return (
    <div className="dashboardContainer">
      <span className="title">{title}</span>
      {title == "All Users" ? (
        <AllUsers />
      ) : title == "Sellers" ? (
        <Sellers />
      ) : (
        <></>
      )}
    </div>
  );
};

export default Dashboard;
