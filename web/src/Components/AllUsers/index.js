import "./style.css";
import Header from "../Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Map from "../Map";
import baseURL from "../../config";
const AllUsers = () => {
  const token = localStorage.getItem("token");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          `http://${baseURL}:3000/admin/getUsers`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        const recs = data.map((record) => ({
          id: record._id,
          userType: record.userType,
          email: record.email,
          name: record.name,
          phoneNumber: record.phoneNumber,
          country: record.country,
          city: record.city,
          street: record.street,
        }));
        if (JSON.stringify(recs) !== JSON.stringify(records)) {
          setRecords(recs);
          console.log(recs);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getUsers();
  }, [records]);
  if (records.length == 0) {
    return <p>Loading</p>;
  }
  return (
    <table>
      <Header
        t1={"ID"}
        t2={"Name"}
        t3={"Email"}
        t4={"Number"}
        t5={"User Type"}
        t6={"Country"}
        t7={"City"}
        t8={"Street"}
        t9={"Delete"}
        count={9}
      />
      <Map records={records} setter={setRecords} />
    </table>
  );
};

export default AllUsers;
