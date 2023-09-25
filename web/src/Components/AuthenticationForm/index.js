import React from "react";
import "./style.css";
import LabeledInput from "../LabeledInput";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const AuthenticationForm = () => {

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
