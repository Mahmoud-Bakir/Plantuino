import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import "./style.css";
import SideMenu from "../../Components/SideMenu";
import Dashboard from "../../Components/Dashboard";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [choice, setChoice] = useState(null);

  const getChoice = (choice) => {
    setChoice(choice);
  };

  if (!token) return <></>;

  return (
    <div className="container">
      <NavBar />
      <div className="containerContent">
        <SideMenu handleChoice={getChoice} />
        <Dashboard title={choice} />
      </div>
    </div>
  );
};

export default AdminDashboard;
