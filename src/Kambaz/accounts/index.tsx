import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./signin";
import Profile from "./profile";
import SignUp from "./signup";
import AccountNavigation from "./Navigation";

export default function Account() {
  return (
    <div id="wd-account-screen">
      <h2>Account</h2>
      <table>
        <tr>
          <td valign="top">
            <AccountNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/"        element={<Navigate to="/Account/Signin" />} />
              <Route path="/Signin"  element={<SignIn />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Signup"  element={<SignUp />} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
);}
