import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import "./style.css";
import SideMenu from "../../Components/SideMenu";
import Dashboard from "../../Components/Dashboard";
import Modal from "../../Components/Modal";
import AddUserForm from "../../Components/AddUserForm";

const AdminDashboard = () => {
  const token = localStorage.getItem("token");
  const [choice, setChoice] = useState(null);

  const getChoice = (choice) => {
    setChoice(choice);
  };

  const handleModalClose = () => {
    setChoice("All Users");
  };
  if (!token) return <></>;
  if (choice === "Add User") {
    return (
      <div>
        <NavBar />
        <div className="containerContent">
          <SideMenu handleChoice={getChoice} />
          <Dashboard title={"All Users"} />
          <AddUserForm handleModalClose={handleModalClose} />
        </div>
      </div>
    );
  }

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
