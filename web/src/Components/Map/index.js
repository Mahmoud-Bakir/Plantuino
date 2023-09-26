import axios from "axios";
import { Records } from "../Records";

export const Map = ({ records, handleDelete, setter, handleEdit, count }) => {
  const token = localStorage.getItem("token");
  console.log(records);

  async function handleDelete(id) {
    const del = new FormData();
    del.append("user_id", id);
    const response = await axios.post(
      "http://127.0.0.1:8000/api/Admin/delete",
      del,
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setter(records.filter((record) => record.id !== id));
  }

  return (
    <>
      {records.map((record) => (
        count === 9 && (
          <Records
            id={record.id}
            userType={record.userType}
            name={record.name}
            email={record.email}
            number={record.phoneNumber}
            country={record.country}
            city={record.city}
            street={record.street}
            handleDelete={() => handleDelete(record.id)}
            handleEdit={() => handleEdit(record.id)}
            key={record.id}
            all={false}
          />
        )
      ))}
      {records.map((record) => (
        count !== 9 && (
          <Records
            id={record.id}
            userType={record.userType}
            name={record.name}
            email={record.email}
            number={record.phoneNumber}
            country={record.country}
            city={record.city}
            street={record.street}
            handleDelete={() => handleDelete(record.id)}
            handleEdit={() => handleEdit(record.id)}
            key={record.id}
            all={true}
          />
        )
      ))}
    </>
  );
};

export default Map;
