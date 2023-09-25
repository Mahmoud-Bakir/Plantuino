import React, { useState } from "react";
import axios from "axios";

export const Records = ({
  id,
  name,
  email,
  number,
  country,
  city,
  street,
  handleDelete,
  handleEdit,
  all,
  sellers,
  plantOwners,
}) => {
  const token = localStorage.getItem("token");
  if (all) {
    return (
      <tr>
        <td>{id}</td>
        <td>{name}</td>
        <td>{email}</td>
        <td>{number}</td>
        <td>{country}</td>
        <td>{city}</td>
        <td>{street}</td>

        <select>
          {users.map((course) => (
            <option>{course.course_name}</option>
          ))}
        </select>
        <td>
          <button className="edit action-button" onClick={handleEdit}>
            edit
          </button>
        </td>
        <td>
          <button className="delete action-button" onClick={handleDelete}>
            delete
          </button>
        </td>
      </tr>
    );
  }
};
export default TeacherRecord;
