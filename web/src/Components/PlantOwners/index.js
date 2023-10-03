import Header from "../Header";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Map from "../Map";
import baseURL from "../../config";
const PlantOwners = () => {
  const token = localStorage.getItem("token");
  const [records, setRecords] = useState([]);

  useEffect(() => {
    async function getPlantOwners() {
      try {
        const response = await axios.get(
          `http://${baseURL}:3000/admin/getPlantOwners`,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );

        const data = response.data;
        const recs = data.map((record) => ({
          id: record._id,
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
    getPlantOwners();
  }, [records]);

  if (records.length==0) {
    return <p>Loading...</p>;
  }
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
        t8={"Delete"}
        count={8}
      />
      <Map records={records} setter={setRecords} count={9} />
    </table>
  );
};

export default PlantOwners;
