import axios from "axios";
import { Records } from "../Records";

export const Map = ({ records, setter, count }) => {
  const token = localStorage.getItem("token");
  console.log(records);

  const remove = async (id) => {
   const data={id:id}
   console.log(data)
    await axios.post("http://192.168.1.5:8000/admin/delete", data, {
      headers: {
        Authorization: "Bearer " + token,
      }
    });
    setter(records.filter((record) => record.id !== id));
  };
  const edit = async (id) => {
    console.log("edit");
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
              handleEdit={() => edit(record.id)}
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
              handleEdit={() => edit(record.id)}
              key={record.id}
              all={true}
            />
          )
      )}
    </>
  );
};

export default Map;
