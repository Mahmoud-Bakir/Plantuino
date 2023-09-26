import React, { useState } from "react";
import NavBar from "../../Components/NavBar";
import "./style.css";
import SideMenu from "../../Components/SideMenu";
import Dashboard from "../../Components/Dashboard";
import Modal from "../../Components/Modal";
import AddUserForm from "../../Components/AddUserForm";

const AdminDashboard = (type) => {
  const [choice, setChoice] = useState(null);

  const getChoice = (choice) => {
    setChoice(choice);
  };
  if (choice === "Add User") {
    return (
      <div>
        <NavBar />
        <div className="containerContent">
          <SideMenu handleChoice={getChoice} />
          <Dashboard title={"All Users"} />
          <AddUserForm />
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
