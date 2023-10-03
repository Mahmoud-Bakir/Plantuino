import axios from "axios";
import { Records } from "../Records";
import baseURL from "../../config";

export const Map = ({ records, setter, count }) => {
  const token = localStorage.getItem("token");
  console.log(records);

  const remove = async (id) => {
    await axios.post(
      `http://${baseURL}:3000/admin/delete`,
      { id },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    setter(records.filter((record) => record.id !== id));
  };
  return (
    <>
      {records.map(
        (record) =>
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
              handleDelete={() => remove(record.id)}
              key={record.id}
              all={false}
            />
          )
      )}
      {records.map(
        (record) =>
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
              handleDelete={() => remove(record.id)}
              key={record.id}
              all={true}
            />
          )
      )}
    </>
  );
};

export default Map;
