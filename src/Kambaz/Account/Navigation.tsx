import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
    const location = useLocation(); 

    return (
        <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
            {links.includes("Signin") && (
                <Link
                    to={`/Kambaz/Account/Signin`}
                    className={`list-group-item border border-0 ${location.pathname.includes("Signin") ? "active text-black" : "text-danger"}`}
                >
                    Signin
                </Link>
            )}
            {links.includes("Signup") && (
                <Link
                    to={`/Kambaz/Account/Signup`}
                    className={`list-group-item border border-0 ${location.pathname.includes("Signup") ? "active text-black" : "text-danger"}`}
                >
                    Signup
                </Link>
            )}
            {links.includes("Profile") && (
                <Link
                    to={`/Kambaz/Account/Profile`}
                    className={`list-group-item border border-0 ${location.pathname.includes("Profile") ? "active text-black" : "text-danger"}`}
                >
                    Profile
                </Link>
            )}
        </div>
    );
}