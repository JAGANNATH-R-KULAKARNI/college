import React from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import SignInUI from "./Components/SignIn/SignIn";
import SignUpUI from "./Components/SignUp/SignUp";
import "./index.css";
import OTPUI from "./Components/OTP/Otp";
import HospitalUI from "./Components/Hospital/Hospital";
import UserUI from "./Components/User/User";
import LandingPageUI from "./Components/LandingPage";
import useMediaQuery from "@mui/material/useMediaQuery";

function App() {
  const [signedUp, setSignedUp] = React.useState(false);
  const m1 = useMediaQuery("(min-width:600px)");

  return (
    <div className="bg-[#10B981]">
      <div style={{ height: "200px" }}></div>
      <Routes>
        <Route path="/" element={<LandingPageUI />} />
        <Route path="/otp" element={<OTPUI />} />
        <Route
          path="/signup"
          element={<SignUpUI setSignedUp={setSignedUp} />}
        />
        <Route path="/signin" element={<SignInUI signedUp={signedUp} />} />
        <Route path="/hospital" element={<HospitalUI />} />
        <Route path="/user" element={<UserUI />} />
      </Routes>
      <div style={{ height: m1 ? "198px" : "300px" }}></div>
    </div>
  );
}

export default App;
