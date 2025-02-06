import { Link, useLocation } from "react-router-dom";

export default function AccountNavigation() {
  const location = useLocation();

  return (
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
      <Link
        to="/Kambaz/Account/Signin"
        id="account-navigation-signin"
        className={`list-group-item border border-0  ${location.pathname === "/Kambaz/Account/Signin" ? "active text-danger" : ""}`}
      >
        Signin
      </Link>
      <br />
      <Link
        to="/Kambaz/Account/Signup"
        id="account-navigation-signup"
        className={`list-group-item border border-0  ${location.pathname === "/Kambaz/Account/Signup" ? "active text-danger" : ""}`}
      >
        Signup
      </Link>
      <br />
      <Link
        to="/Kambaz/Account/Profile"
        id="account-navigation-profile"
        className={`list-group-item border border-0  ${location.pathname === "/Kambaz/Account/Profile" ? "active text-danger" : ""}`}
      >
        Profile
      </Link>
      <br />
    </div>
  );
}
