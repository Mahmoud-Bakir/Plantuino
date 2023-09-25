import React from "react";
import "./style.css";
import LabeledInput from "../LabeledInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthenticationForm = () => {
  const navigater = useNavigate();
  const moveToDashboard = () => navigater("/Dashboard");

  const defaultState = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(defaultState);
  const [error, setError] = useState("");
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError("");
    console.log(data);
  };
  function is_empty(name) {
    const test = name.trim();
    return test === "";
  }
  const handleLogin = async () => {
    if (is_empty(data.email) || is_empty(data.password) )
    setError("All Inputs are required")
    try {
      const response = await axios.post(
        "http://localhost:8000/auth/login",
        data
      );
      window.localStorage.setItem("token", response.data.token);
      console.log(response.data.user.token);
      moveToDashboard();
    } catch (error) {
      console.log(error.message);
      if (error.message === "Request failed with status code 404")
        setError("Incorrect Credentials");
    }
  };
  return (
    <div className="login-form-container">
      <span className="authTitle">Welcome</span>
      <div className="inputs">
        <div className="part">
          <LabeledInput
            naming={"email"}
            Itype={"email"}
            holder={"please enter your Email"}
            lab={"Email"}
            value={data.email}
            onChange={handleDataChange}
          />
        </div>
        <div className="part">
          <LabeledInput
            naming={"password"}
            Itype={"password"}
            holder={"Please enter your Password"}
            lab={"Password"}
            value={data.password}
            onChange={handleDataChange}
          />
        </div>
        <span className="error">{error}</span>
        <button className="authButton" onClick={handleLogin}>
          Sign In
        </button>
      </div>
    </div>
  );
};

export default AuthenticationForm;
