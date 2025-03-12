import { Routes, Route, Navigate } from "react-router";
import Account from "./accounts";
import Dashboard from "../Kambaz/dashboard/dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
import "./style.css";
import ProtectedRoute from "./accounts/ProtectedRoute";
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route
            path="/Dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/Navigation" element={<KambazNavigation />} />
          <Route
            path="/Courses/:cid/*"
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
