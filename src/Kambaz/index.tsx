// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { Routes, Route, Navigate } from "react-router";
// import Account from "./Account/index";
// import Dashboard from "./Dashboard";
// import Session from "./Account/Session";
// import Courses from "./Courses";
// import KambazNavigation from "./Navigation";
// import "./styles.css"
// import * as courseClient from "./Courses/client";
// import * as userClient from "./Account/client";

// import { useState, useEffect } from "react";
// import ProtectedRoute from "./Account/ProtectedRoute";

// import { useSelector } from "react-redux";
// export default function Kambaz() {
//   const [courses, setCourses] = useState<any[]>([]);
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const [enrolling, setEnrolling] = useState<boolean>(false);

//   const findCoursesForUser = async () => {
//     try {
//       const courses = await userClient.findCoursesForUser(currentUser._id);
//       setCourses(courses);
//     } catch (error) {
//       console.error(error);
//     }
//   };
 
//   const fetchCourses = async ()=> {
//     try {
//       const allCourses = await courseClient.fetchAllCourses();
//       const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
//       const courses = allCourses.map((course: any) => {
//         if (enrolledCourses.find((c: any) => c._id === course._id)) {
//           return { ...course, enrolled: true };
//         } else {
          
//           return course;
//         }
//       });
//       setCourses(courses);
//       return courses; 
//     } catch (error) {
//       console.error(error);
//       return [];
//     }
//   };
  
//   const addNewCourse = async (course: any) => {
//     const newCourse = await courseClient.createCourse(course, {userId : currentUser._id});
//     setCourses([...courses, newCourse]);
//     return newCourse;
//   };

//   const deleteCourse = async (courseId: string) => {
//     const status = await courseClient.deleteCourse(courseId);
//     setCourses(courses.filter((course) => course._id !== courseId));
//     return status;
//   };

//   useEffect(() => {
//     if (enrolling) {
//       fetchCourses();
//     } else {
//       findCoursesForUser();
//     }
//   }, [currentUser, enrolling]);
 

//   const updateCourse = async (course: any) => {
//     const updatedCourse = await courseClient.updateCourse(course);
//     setCourses(courses.map((c) => {
//       if (c._id === course._id) {
//         return updatedCourse || course;
//       } else {
//         return c;
//       }
//     }));
   
//     return updatedCourse;

//   };
//   const updateEnrollment = async (courseId: string, enrolled: boolean) => {
//     if (enrolled) {
//       await userClient.enrollIntoCourse(currentUser._id, courseId);
//     } else {
//       await userClient.unenrollFromCourse(currentUser._id, courseId);
//     }
//     setCourses(
//       courses.map((course) => {
//         if (course._id === courseId) {
//           return { ...course, enrolled: enrolled };
//         } else {
//           return course;
//         }
//       })
//     );
//   };
 

  
//   return (
//     <Session>
//       <div id="wd-kambaz">
//         <KambazNavigation />
//         <div className="wd-main-content-offset p-3">
//           <Routes>
//             <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
//             <Route path="/Account/*" element={<Account />} />
//             <Route path="/Dashboard" element={
//               <ProtectedRoute>
//                 <Dashboard
//                   courses={courses}
//                   addNewCourse={addNewCourse}
//                   deleteCourse={deleteCourse}
//                   updateCourse={updateCourse}
//                   fetchCourses={fetchCourses}
//                   enrolling={enrolling} setEnrolling={setEnrolling}
//                   updateEnrollment = {updateEnrollment}
//                 />
//               </ProtectedRoute>
//             } />
//             <Route path="/Courses/:cid/*" element={
//               <ProtectedRoute>
//                 <Courses courses={courses} />
//               </ProtectedRoute>
//             } />
//             <Route path="/Calendar" element={<h1>Calendar</h1>} />
//             <Route path="/Inbox" element={<h1>Inbox</h1>} />
//           </Routes>
//         </div>
//       </div>
//     </Session>
//   );
// }

import { Routes, Route, Navigate } from "react-router-dom";
import Account from "./Account/index";
import Dashboard from "./Dashboard";
import Session from "./Account/Session";
import Courses from "./Courses";
import KambazNavigation from "./Navigation";
import "./styles.css";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as assignmentClient from "./Courses/Assignments/client";

import { useState, useEffect } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";

import { useSelector } from "react-redux";
import People from "./Courses/People";
import Assignments from "./Courses/Assignments";
import AssignmentEditor from "./Courses/Assignments/Editor";

export default function Kambaz() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const [courses, setCourses] = useState<any[]>([]);
  const [enrolling, setEnrolling] = useState<boolean>(false);
  const [assignments, setAssignments] = useState<any[]>([]);

  // Course-related functions
  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    if (enrolled) {
      await userClient.enrollIntoCourse(currentUser._id, courseId);
    } else {
      await userClient.unenrollFromCourse(currentUser._id, courseId);
    }
    setCourses(
      courses.map((course) => {
        if (course._id === courseId) {
          return { ...course, enrolled: enrolled };
        } else {
          return course;
        }
      })
    );
  };

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(
        currentUser._id
      );
      const courses = allCourses.map((course: any) => {
        if (enrolledCourses.find((c: any) => c._id === course._id)) {
          return { ...course, enrolled: true };
        } else {
          return course;
        }
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const addNewCourse = async (course: any) => {
    const newCourse = await courseClient.createCourse(course, {userId : currentUser._id});
    setCourses([...courses, newCourse]);
    return newCourse;
  };

  const deleteCourse = async (courseId: string) => {
    // const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async (course: any) => {
    const updatedCourse = await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return updatedCourse || course;
        } else {
          return c;
        }
      })
    );
    return updatedCourse;
  };

  // Assignment-related functions
  const fetchAllAssignments = async () => {
    try {
      const fetchedAssignments = await assignmentClient.fetchAllAssignments();
      setAssignments(fetchedAssignments);
      return fetchedAssignments;
    } catch (error) {
      console.error("Error fetching assignments:", error);
      return [];
    }
  };

  const createNewAssignment = async (assignment: any) => {
    try {
      const newAssignment = await assignmentClient.createNewAssignment(assignment);
      setAssignments([...assignments, newAssignment]);
      return newAssignment;
    } catch (error) {
      console.error("Error creating assignment:", error);
      throw error;
    }
  };

  const updateAssignment = async (assignment: any) => {
    try {
      const updatedAssignment = await assignmentClient.updateAssignment(assignment);
      setAssignments(
        assignments.map((a) => {
          if (a._id === assignment._id) {
            return updatedAssignment;
          } else {
            return a;
          }
        })
      );
      return updatedAssignment;
    } catch (error) {
      console.error("Error updating assignment:", error);
      throw error;
    }
  };

  const deleteAssignment = async (assignmentId: string) => {
    try {
      await assignmentClient.deleteAssignment(assignmentId);
      setAssignments(assignments.filter((a) => a._id !== assignmentId));
      return true;
    } catch (error) {
      console.error("Error deleting assignment:", error);
      throw error;
    }
  };

  // Load user courses when component mounts
  useEffect(() => {
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  // Load assignments when component mounts
  useEffect(() => {
    if (currentUser) {
      fetchAllAssignments();
    }
  }, [currentUser]);

  return (
    <Session>
      <div id="wd-kambaz">
        <KambazNavigation />
        <div className="wd-main-content-offset p-3">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account" />} />
            <Route path="/Account/*" element={<Account />} />
            <Route
              path="/Dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard
                    courses={courses}
                    addNewCourse={addNewCourse}
                    deleteCourse={deleteCourse}
                    updateCourse={updateCourse}
                    enrolling={enrolling}
                    setEnrolling={setEnrolling}
                    updateEnrollment={updateEnrollment}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/*"
              element={
                <ProtectedRoute>
                  <Courses courses={courses} />
                </ProtectedRoute>
              }
            />
            <Route
              path="/Courses/:cid/People"
              element={
                <ProtectedRoute>
                  <People />
                </ProtectedRoute>
              }
            />
            {/* Updated Assignment Routes */}
            <Route
              path="/Courses/:cid/Assignments"
              element={
                <ProtectedRoute>
                  <Assignments 
                    assignments={assignments}
                    createNewAssignment={createNewAssignment}
                    deleteAssignment={deleteAssignment}
                    updateAssignment={updateAssignment}
                    fetchAssignment={fetchAllAssignments}
                  />
                </ProtectedRoute>
              }
            />
            {/* Route for creating a new assignment */}
            <Route
              path="/Courses/:cid/AssignmentEditor"
              element={
                <ProtectedRoute>
                  <AssignmentEditor 
                    assignments={assignments}
                    createNewAssignment={createNewAssignment}
                    updateAssignment={updateAssignment}
                    fetchAssignment={fetchAllAssignments}
                  />
                </ProtectedRoute>
              }
            />
            {/* Route for editing an existing assignment */}
            <Route
              path="/Courses/:cid/Assignments/:aid/edit"
              element={
                <ProtectedRoute>
                  <AssignmentEditor 
                    assignments={assignments}
                    createNewAssignment={createNewAssignment}
                    updateAssignment={updateAssignment}
                    fetchAssignment={fetchAllAssignments}
                  />
                </ProtectedRoute>
              }
            />
            <Route path="/Calendar" element={<h1>Calendar</h1>} />
            <Route path="/Inbox" element={<h1>Inbox</h1>} />
          </Routes>
        </div>
      </div>
    </Session>
  );
}