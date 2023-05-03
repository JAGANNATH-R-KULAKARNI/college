import React from "react";
import ChatsUI from "./Chats";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../Supabase";

export default function UserUI() {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = React.useState(null);
  const [requestedData, setRequestedData] = React.useState(null);
  const [reason, setReason] = React.useState(null);

  async function getHospitalDetails() {
    const { data, error } = await supabase.from("hospital").select("*");

    if (data) {
      console.log("Data of hospitals");
      console.log(data);
      setHospitals(data);
    }
  }

  async function getRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .eq("phnum", Cookies.get("phnumH"));

    if (data) {
      console.log("Requests from user");
      console.log(data);
      let hsh = {};

      for (let i = 0; i < data.length; i++) {
        hsh[data[i].hospital] = data[i].accept;
      }

      setRequestedData(hsh);
    }
  }

  async function saveUserInfo(typ, val) {
    let temp = null;

    if (Cookies.get("patient-info"))
      temp = JSON.parse(Cookies.get("patient-info"));

    if (!temp) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          name: "",
          age: 0,
          gender: "",
          pc: "",
          phnum: "",
          aoin: "",
        })
      );

      temp = JSON.parse(
        JSON.stringify({
          name: "",
          age: 0,
          gender: "",
          pc: "",
          phnum: "",
          aoin: "",
        })
      );

      // console.log(temp);
    }

    if (typ == 1) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          ...temp,
          name: val,
        })
      );
    } else if (typ == 2) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          ...temp,
          age: val,
        })
      );
    } else if (typ == 3) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          ...temp,
          gender: val,
        })
      );
    } else if (typ == 4) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          ...temp,
          pc: val,
        })
      );
    } else if (typ == 5) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          ...temp,
          phnum: val,
        })
      );
    } else if (typ == 6) {
      Cookies.set(
        "patient-info",
        JSON.stringify({
          ...temp,
          aoin: val,
        })
      );
    }
  }

  React.useEffect(() => {
    if (Cookies.get("phnumH")) {
      getHospitalDetails();
      getRequests();
    } else {
      navigate("/otp");
    }
  }, []);

  return (
    <div style={{ marginTop: "-130px" }}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div style={{ width: "85%" }}>
          <h1
            style={{
              fontSize: "40px",
              fontWeight: 700,
              textAlign: "center",
              color: "white",
            }}
          >
            Available Hospitals{" "}
            <span style={{ fontSize: "23px" }}>
              (+91 {Cookies.get("phnumH")})
            </span>
          </h1>
          <br />
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => {
                  setReason("Accident");
                }}
                style={{
                  backgroundColor: reason == "Accident" ? "#1F2937" : "white",
                  color: reason == "Accident" ? "white" : "black",
                }}
              >
                Accident
              </button>
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border-t border-b border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => {
                  setReason("Pregnancy");
                }}
                style={{
                  backgroundColor: reason == "Pregnancy" ? "#1F2937" : "white",
                  color: reason == "Pregnancy" ? "white" : "black",
                }}
              >
                Pregnancy
              </button>
              <button
                type="button"
                class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                onClick={() => {
                  setReason("Medical Issue");
                }}
                style={{
                  backgroundColor:
                    reason == "Medical Issue" ? "#1F2937" : "white",
                  color: reason == "Medical Issue" ? "white" : "black",
                }}
              >
                Medical Issues
              </button>
            </div>
          </div>

          <br />
          <div
            style={{ display: "flex", justifyContent: "center", width: "100%" }}
          >
            <div style={{ width: "45%" }}>
              {hospitals && requestedData ? (
                <ChatsUI
                  hospitals={hospitals}
                  requestedData={requestedData}
                  getRequests={getRequests}
                  getHospitalDetails={getHospitalDetails}
                  reason={reason}
                />
              ) : (
                <h1 style={{ textAlign: "center", color: "white" }}>
                  Loading...
                </h1>
              )}
            </div>
            <div style={{ width: "10%" }}></div>
            <div style={{ width: "45%", marginTop: "20px" }}>
              <div class="mb-6">
                <input
                  type="text"
                  id="name-of-p"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Skandan"
                  required
                  onChange={(e) => {
                    saveUserInfo(1, e.target.value);
                  }}
                />
              </div>
              <div class="mb-6">
                <input
                  type="number"
                  id="age-of-p"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="30"
                  required
                  onChange={(e) => {
                    saveUserInfo(2, e.target.value);
                  }}
                />
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  id="gender-of-p"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Male"
                  required
                  onChange={(e) => {
                    saveUserInfo(3, e.target.value);
                  }}
                />
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  id="pc-of-p"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Previous Complication Entry"
                  required
                  onChange={(e) => {
                    saveUserInfo(4, e.target.value);
                  }}
                />
              </div>
              <div class="mb-6">
                <input
                  type="number"
                  id="num-of-p"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Contact Number"
                  required
                  onChange={(e) => {
                    saveUserInfo(5, e.target.value);
                  }}
                />
              </div>
              <div class="mb-6">
                <input
                  type="text"
                  id="i-of-p"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Availability Of Insurance"
                  required
                  onChange={(e) => {
                    saveUserInfo(6, e.target.value);
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
