import React from "react";
import "./style.css";
import Header from "../Header";
const AllUsers = ({ title }) => {
  return (
    <div className="dashboardContainer">
      <span className="title">{title}</span>
      <div className="innerContentContainer">
          <table>
            <Header
              t1={"ID"}
              t2={"Name"}
              t3={"Email"}
              t4={"Number"}
              t5={"Country"}
              t6={"City"}
              t7={"Street"}
            />
          </table>
      </div>
    </div>
  );
};

export default AllUsers;
