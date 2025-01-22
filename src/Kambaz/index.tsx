import { Routes, Route, Navigate } from "react-router";
import Account from "./accounts";
import Dashboard from "./dashboard";
import KambazNavigation from "./navigation";
import Courses from "./courses";
export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <h1>Kambaz</h1>
      <table>
        <tr>
          <td valign="top">
            <KambazNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="Account" />} />
              <Route path="/Account/*" element={<Account />} />
              <Route path="/Dashboard" element={<Dashboard />} />
              <Route path="/Navigation" element={<KambazNavigation />} />
              <Route path="/Courses/:cid/*" element={<Courses />} />
              <Route path="/Calendar" element={<h1>Calendar</h1>} />
              <Route path="/Inbox" element={<h1>Inbox</h1>} />
            </Routes>
          </td>
        </tr>
      </table>
    </div>
  );
}
