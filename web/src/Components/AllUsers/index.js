import "./style.css";
import Header from "../Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Map from "../Map";
const AllUsers = () => {
  const token = localStorage.getItem("token");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await axios.get(
          "http://192.168.1.5:8000/admin/getUsers",
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

  return (
    <table>
      <Header
        t1={"ID"}
        t2={"Name"}
        t3={"Email"}
        t4={"Number"}
        t5={"Country"}
        t6={"City"}
        t7={"Street"}
        t8={"Edit"}
        t9={"Delete"}
      />
      <Map records={records} setter={setRecords} />
    </table>
  );
};

export default AllUsers;
