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
        <div style={{ width: "40%" }}>
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
          {hospitals && requestedData ? (
            <ChatsUI
              hospitals={hospitals}
              requestedData={requestedData}
              getRequests={getRequests}
              getHospitalDetails={getHospitalDetails}
              reason={reason}
            />
          ) : (
            <h1 style={{ textAlign: "center", color: "white" }}>Loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
