import { LockClosedIcon } from "@heroicons/react/20/solid";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../Firebase";
import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function SignInUI(props) {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const navigate = useNavigate();

  async function onSubmitHandlerJ() {
    Cookies.set("emailH", email);
    signInWithEmailAndPassword(auth, email, password)
      .then((u) => {
        console.log("Successful signed In");
        console.log(u);
        Cookies.set("emailH", email);

        navigate("/hospital", { state: { phone: phone } });
      })
      .catch((err) => {
        console.log("Unsuccessful sign In");
        console.log(err);
        navigate("/signin");
      });
  }

  return (
    <>
      <div className="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8 -mt-20">
        <div className="w-full max-w-md space-y-8">
          <div>
            <h2
              className="mt-6 text-center text-3xl font-bold tracking-tight text-white-900"
              style={{ color: "white" }}
            >
              Hospital Login Account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-600 flex justify-center">
              {props.signedUp ? (
                <a href="#" className="font-medium" style={{ color: "white" }}>
                  Signed Up successfully
                </a>
              ) : (
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  style={{ color: "white" }}
                >
                  #We ❤️ Save ❤️ Lives
                </a>
              )}
            </p>
          </div>
          <div className="mt-8 space-y-6">
            <input type="hidden" name="remember" defaultValue="true" />
            <div className="-space-y-px rounded-md shadow-sm">
              <div>
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="    Email address"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </div>
              {/* <div>
                <label htmlFor="email-address" className="sr-only">
                  Phone Number
                </label>
                <input
                  id="phone-no"
                  name="phnum"
                  type="number"
                  required
                  className="relative block w-full rounded-t-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="    Phone Number"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div> */}
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="relative block w-full rounded-b-md border-0 py-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="    Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center"></div>

              <div className="text-sm">
                <a
                  //  href="/otp"
                  className="font-medium text-indigo-600 hover:text-indigo-500"
                  style={{ color: "white", cursor: "pointer" }}
                  onClick={() => {
                    navigate("/signup");
                  }}
                >
                  No account ? Create It
                </a>
              </div>
            </div>

            <div>
              <button
                onClick={onSubmitHandlerJ}
                className="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                style={{ backgroundColor: "white", color: "black" }}
              >
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon
                    className="h-5 w-5 text-black-500 group-hover:text-black-400"
                    aria-hidden="true"
                  />
                </span>
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
