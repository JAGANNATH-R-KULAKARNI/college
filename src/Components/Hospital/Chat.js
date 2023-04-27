import { useNavigate } from "react-router-dom";
import { supabase } from "../../Supabase";
import Cookies from "js-cookie";

export default function Example(props) {
  async function requestHospital(pn, status, hos) {
    const { data, error } = await supabase
      .from("requests")
      .update({ accept: status })
      .eq("phnum", pn)
      .eq("hospital", hos)
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
      {props.requests &&
        props.requests.map((person) => (
          <li key={person.email} className="flex justify-between gap-x-6 py-5">
            <div className="flex gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__340.png"
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p
                  className="text-sm font-semibold leading-6 text-gray-900"
                  style={{ color: "white" }}
                >
                  (+91) {person.phnum}
                </p>
                <p
                  className="mt-1 truncate text-xs leading-5 text-gray-500"
                  style={{ color: "white" }}
                >
                  {person.reason}
                </p>
              </div>
            </div>
            <div className="hidden sm:flex sm:flex-col sm:items-end">
              {person.accept != 2 && person.accept != 3 && (
                <div class="inline-flex rounded-md shadow-sm" role="group">
                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-l-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                    style={{ backgroundColor: "white" }}
                    onClick={() => {
                      requestHospital(person.phnum, 2, person.hospital);
                    }}
                  >
                    Accept
                  </button>

                  <button
                    type="button"
                    class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-r-md hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-blue-500 dark:focus:text-white"
                    style={{ backgroundColor: "#9B1C1C", color: "white" }}
                    onClick={() => {
                      requestHospital(person.phnum, 3, person.hospital);
                    }}
                  >
                    Reject
                  </button>
                </div>
              )}

              {person.accept == 2 ? (
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  style={{ backgroundColor: "white", color: "black" }}
                >
                  Chat Now
                </button>
              ) : null}
              {person.accept == 3 ? (
                <button
                  type="button"
                  class="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Rejected
                </button>
              ) : null}
            </div>
          </li>
        ))}
    </ul>
  );
}
