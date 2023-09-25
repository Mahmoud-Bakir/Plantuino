import React from "react";
import "./style.css";
import LabeledInput from "../LabeledInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthenticationForm = () => {
  const navigater = useNavigate();
  const moveToHome = () => navigater("/home");

  const defaultState = {
    email: "",
    password: "",
  };
  const [data, setData] = useState(defaultState);
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    console.log(data);
  };
  const handleLogin = async () => {
    const response = await axios.post("http://localhost:8000/auth/login", data);
    window.localStorage.setItem("token", response.data.token);
    window.localStorage.setItem("id", response.data.user._id);
    window.localStorage.setItem("first_name", response.data.user.first_name);
    window.localStorage.setItem("last_name", response.data.user.last_name);
    console.log(response.data.user.token);
    moveToHome();
  };
  return (
    <div className="login-form-container">
      <span className="authTitle">Welcome</span>
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
          Name={"password"}
          Itype={"password"}
          holder={"Please enter your Password"}
          lab={"Password"}
          value={data.password}
          onChange={handleDataChange}
        />
      </div>
    </div>
  );
};

export default AuthenticationForm;
