import React, { useState } from "react";
import axios from "axios";
import "./style.css";

export const Records = ({
  id,
  userType,
  name,
  email,
  number,
  country,
  city,
  street,
  handleDelete,
  handleEdit,
  all,
  users,
  sellers,
  plantOwners,
}) => {
  const token = localStorage.getItem("token");
  const [type, setType] = useState();

  return (
    <tr>
      {all ? (
        <>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{userType === 1 ? "Seller" : "Plant Owner"}</td> 
          <td>{number}</td>
          <td>{country}</td>
          <td>{city}</td>
          <td>{street}</td>
        </>
      ) : (
        <>
          <td>{id}</td>
          <td>{name}</td>
          <td>{email}</td>
          <td>{number}</td>
          <td>{country}</td>
          <td>{city}</td>
          <td>{street}</td>
        </>
      )}
      <td>
        <button className="edit " onClick={handleEdit}>
          edit
        </button>
      </td>
      <td>
        <button className="delete " onClick={handleDelete}>
          delete
        </button>
      </td>
    </tr>
  );
};
export default Records;
