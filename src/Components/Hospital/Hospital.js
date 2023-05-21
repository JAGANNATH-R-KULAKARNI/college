import {
  CloudArrowUpIcon,
  LockClosedIcon,
  ServerIcon,
} from "@heroicons/react/20/solid";
import ChatUI from "./Chat";
import { supabase } from "../../Supabase";
import Cookies from "js-cookie";
import React from "react";
import { useNavigate } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function Hospital() {
  const [hData, setHData] = React.useState(null);
  const [requests, setRequests] = React.useState(null);
  const navigate = useNavigate();
  const m1 = useMediaQuery("(min-width:600px)");

  React.useEffect(() => {
    console.log("Email H");
    console.log(Cookies.get("emailH"));

    if (Cookies.get("emailH")) {
      getHospitalDetails();
      getRequests();
    } else {
      navigate("/signin");
    }
  }, []);

  async function getRequests() {
    const { data, error } = await supabase
      .from("requests")
      .select("*")
      .eq("hospital", Cookies.get("emailH"));

    if (data) {
      console.log("Requests");
      console.log(data);
      setRequests(data);
    }
  }

  async function getHospitalDetails() {
    const { data, error } = await supabase
      .from("hospital")
      .select("*")
      .eq("email", Cookies.get("emailH"));

    if (data) {
      console.log("Hospital Data");
      console.log(data);
      setHData(data[0]);
    }

    if (error) {
      console.log(error);
    }
  }

  return (
    <div
      className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:overflow-visible lg:px-0"
      style={{
        backgroundColor: "#10B981",
        color: "white",
        marginTop: m1 ? "-200px" : "-250px",
      }}
    >
      <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2 lg:items-start lg:gap-y-10">
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-1 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            <div className="lg:max-w-lg">
              <p
                className="text-base font-semibold leading-7 text-indigo-600"
                style={{ color: "white" }}
              >
                Admins only
              </p>
              <h1
                className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
                style={{ color: "white" }}
              >
                {hData && hData.name}
              </h1>
              <p
                className="mt-6 text-xl leading-8 text-gray-700 font-italic"
                style={{ color: "white", fontStyle: "italic" }}
              >
                "Healthcare is not just about diagnosing, treating and curing
                patients. It is about understanding their fears, hopes and
                dreams"
              </p>
            </div>
          </div>
        </div>
        <div className="-ml-12 -mt-12 p-12 lg:sticky lg:top-4 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:overflow-hidden">
          {hData && (
            <img
              className="w-[48rem] max-w-none rounded-xl bg-gray-900 shadow-xl ring-1 ring-gray-400/10 sm:w-[57rem]"
              // src="https://tailwindui.com/img/component-images/dark-project-app-screenshot.png"
              src={hData.logo}
              alt=""
              style={{
                width: "100%",
                height: "auto",
                marginTop: m1 ? "0px" : "-30px",
              }}
            />
          )}
        </div>
        <div className="lg:col-span-2 lg:col-start-1 lg:row-start-2 lg:mx-auto lg:grid lg:w-full lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
          <div className="lg:pr-4">
            {requests ? (
              <div className="max-w-xl text-base leading-7 text-gray-700 lg:max-w-lg">
                {requests && requests.length > 0 && (
                  <h1
                    style={{
                      color: "white",
                      fontSize: "25px",
                      fontWeight: 700,
                      marginBottom: "20px",
                      marginTop: m1 ? "0px" : "-80px",
                    }}
                  >
                    Emergency Requests
                  </h1>
                )}
                {requests && (
                  <ChatUI
                    requests={requests}
                    getRequests={getRequests}
                    getHospitalDetails={getHospitalDetails}
                  />
                )}
              </div>
            ) : (
              <h1 style={{ textAlign: "center", color: "white" }}>
                Loading...
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
