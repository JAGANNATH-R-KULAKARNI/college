import { useNavigate } from "react-router-dom";
import { supabase } from "../../Supabase";
import Cookies from "js-cookie";
import ModalUI from "./Modal";
import React from "react";

export default function Example(props) {
  const navigate = useNavigate();
  const [curHospital, setCurHospital] = React.useState(false);
  const [modal, setModal] = React.useState(false);

  async function requestHospital(em) {
    if (props.reason) {
    } else {
      alert("Choose a reason");
      return;
    }

    const { data, error } = await supabase
      .from("requests")
      .insert([
        {
          phnum: Cookies.get("phnumH"),
          hospital: em,
          accept: 1,
          reason: props.reason,
        },
      ])
      .then((u) => {
        console.log("Pushed");
        props.getRequests();
        props.getHospitalDetails();
      })
      .catch((err) => {
        alert("Unsuccessful push. Try again :(");
      });
  }

  return (
    <ul role="list" className="divide-y divide-gray-100">
      {modal && curHospital && (
        <ModalUI setModal={setModal} data={curHospital} />
      )}
      {props.hospitals &&
        props.hospitals.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.logo}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p
                  className="text-md font-semibold leading-6 text-gray-900"
                  style={{ color: "white" }}
                >
                  {person.name}
                </p>
                <p
                  className="mt-1 truncate text-xs leading-5 text-gray-500"
                  style={{ color: "white" }}
                >
                  (+91) {person.contact}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {props.requestedData && (
                <button
                  type="button"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  style={{
                    backgroundColor:
                      props.requestedData[person.email] &&
                      props.requestedData[person.email] == 0
                        ? "#1F2937"
                        : props.requestedData[person.email] &&
                          props.requestedData[person.email] == 1
                        ? "#E3A008"
                        : props.requestedData[person.email] &&
                          props.requestedData[person.email] == 2
                        ? "white"
                        : props.requestedData[person.email] &&
                          props.requestedData[person.email] == 3
                        ? "#C81E1E"
                        : "#1F2937",

                    color:
                      props.requestedData[person.email] &&
                      props.requestedData[person.email] == 0
                        ? "white"
                        : props.requestedData[person.email] &&
                          props.requestedData[person.email] == 1
                        ? "black"
                        : props.requestedData[person.email] &&
                          props.requestedData[person.email] == 2
                        ? "black"
                        : props.requestedData[person.email] &&
                          props.requestedData[person.email] == 3
                        ? "black"
                        : "white",
                  }}
                  onClick={() => {
                    if (
                      props.requestedData[person.email] &&
                      props.requestedData[person.email] == 0
                    ) {
                      requestHospital(person.email);
                    } else if (!props.requestedData[person.email]) {
                      requestHospital(person.email);
                    }

                    if (
                      props.requestedData[person.email] &&
                      props.requestedData[person.email] == 2
                    ) {
                      setCurHospital(person);
                      setModal(true);
                    }
                  }}
                >
                  {props.requestedData[person.email] &&
                  props.requestedData[person.email] == 0
                    ? "Request"
                    : props.requestedData[person.email] &&
                      props.requestedData[person.email] == 1
                    ? "Requested"
                    : props.requestedData[person.email] &&
                      props.requestedData[person.email] == 2
                    ? "(Accepted) Chat Now"
                    : props.requestedData[person.email] &&
                      props.requestedData[person.email] == 3
                    ? "Rejected"
                    : "Request"}
                </button>
              )}
            </div>
          </li>
        ))}
    </ul>
  );
}
