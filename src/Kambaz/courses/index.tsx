import { Navigate, Route, Routes } from "react-router-dom";
import CourseNavigation from "./navigation";
import Modules from "./modules";
import Home from "./home";
import Assignments from "./assignments";
import AssignmentEditor from "./assignments/editor";
export default function Courses() {
    return (
      <div id="wd-courses">
        <h2>Course 1234</h2>
        <hr />
      <table>
        <tr>
          <td valign="top">
            <CourseNavigation />
          </td>
          <td valign="top">
            <Routes>
              <Route path="/" element={<Navigate to="Home" />} />
              <Route path="Home" element= {<Home/>}/>
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments/>} />
              <Route path="Assignments/:aid" element={<AssignmentEditor/>} />
              <Route path="People" element={<h2>People</h2>} />
           
            </Routes>
          </td>
        </tr>
      </table>

      </div>
  );}
  