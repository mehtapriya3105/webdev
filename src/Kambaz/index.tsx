import { Routes, Route, Navigate } from "react-router";
import Account from "./Account/index";
import Dashboard from "./Dashboard";
import Session from "./Account/Session";
import Courses from "./Courses";
import KambazNavigation from "./Navigation";
import "./styles.css"
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";

import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";

import { useSelector } from "react-redux";
export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const addNewCourse = async (course: any) => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
    return newCourse;
  };

  const deleteCourse = async (courseId: any) => {
    const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
    return status;
  };

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      // console.log(courses);
      setCourses(courses);
      return courses;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  const updateCourse = async (course: any) => {
    const updatedCourse = await courseClient.updateCourse(course);
    setCourses(courses.map((c) => {
      if (c._id === course._id) {
        return updatedCourse || course;
      } else {
        return c;
      }
    }));
    return updatedCourse;
  };

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route path="/Dashboard" element={
              <ProtectedRoute>
                <Dashboard
                  courses={courses}
                  addNewCourse={addNewCourse}
                  deleteCourse={deleteCourse}
                  updateCourse={updateCourse}
                  fetchCourses={fetchCourses}
                />
              </ProtectedRoute>
            } />
            <Route path="/Courses/:cid/*" element={
              <ProtectedRoute>
                <Courses courses={courses} />
              </ProtectedRoute>
            } />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}