
// import { Link } from "react-router-dom";
// import { Row, Col, Card, FormControl, Button } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { useState, useEffect } from "react";
// import { unenroll, enroll } from "./enrollmentReducer";
// import { v4 as uuidv4 } from "uuid";
// import { fetchAllCourses } from "./Courses/client";

// interface DashboardProps {
//   courses: any[];
//   addNewCourse: (course: any) => Promise<any>;
//   deleteCourse: (courseId: any) => Promise<any>;
//   updateCourse: (course: any) => Promise<any>;
//   enrolling: boolean;
//   setEnrolling: (enrolling: boolean) => void;
//   updateEnrollment: (courseId: string, enrolled: boolean) => void;
// }

// export default function Dashboard({
//   courses,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
//   enrolling,
//   setEnrolling,
//   updateEnrollment
// }: DashboardProps) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
//   const dispatch = useDispatch();

//   const newCourse = {
//     _id: uuidv4(),
//     title: "New Course",
//     number: "New Number",
//     startDate: "2023-09-10",
//     endDate: "2023-12-15",
//     description: "New Description",
//     image: "images/reactjs.jpg",
//   };

//   const [course, setCourse] = useState(newCourse);
//   const [allCourses, setAllCourses] = useState<any[]>(courses || []);

//   // Fetch courses initially
//   useEffect(() => {
//     fetchCourses();
//   }, []);

//   // Update courses with enrollment status whenever enrollments change
//   useEffect(() => {
//     if (allCourses.length > 0 && enrollments && currentUser) {
//       const coursesWithEnrollmentStatus = allCourses.map(course => ({
//         ...course,
//         enrolled: enrollments.some(
//           (enrollment: any) => 
//             enrollment.user === currentUser._id && 
//             enrollment.course === course._id
//         )
//       }));
//       setAllCourses(coursesWithEnrollmentStatus);
//     }
//   }, [enrollments, currentUser, allCourses.length]);

//   const isAdminOrFaculty =
//     currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

//   const handleAddCourse = async () => {
//     const updatedCourse = { ...course, _id: uuidv4(), image: "images/reactjs.png" };
//     setCourse(updatedCourse);
//     const newCourseData = await addNewCourse(updatedCourse);
//     await fetchCourses();
    
//     // Auto-enroll the creator in the new course
//     if (newCourseData) {
//       dispatch(enroll({ user: currentUser, course: newCourseData }));
//     }
//   };

//   const handleUpdateCourse = async () => {
//     await updateCourse(course);
//     await fetchCourses();
//   };

//   const handleDeleteCourse = async (courseId: string) => {
//     await deleteCourse(courseId);
//     await fetchCourses();
//   };

//   const fetchCourses = async () => {
//     try {
//       const updatedCourses = await fetchAllCourses();
//       // Filter out any null or undefined courses
//       const validCourses = updatedCourses.filter((course: any) => course !== null && course !== undefined);
      
//       // Add enrollment status to each course
//       if (validCourses.length > 0 && enrollments && currentUser) {
//         const coursesWithEnrollmentStatus = validCourses.map((course: any) => ({
//           ...course,
//           enrolled: enrollments.some(
//             (enrollment: any) => 
//               enrollment.user === currentUser._id && 
//               enrollment.course === course._id
//           )
//         }));
//         setAllCourses(coursesWithEnrollmentStatus);
//       } else {
//         setAllCourses(validCourses);
//       }
//     } catch (error) {
//       console.error("Error fetching courses:", error);
//       setAllCourses([]); // Set to empty array on error
//     }
//   };

//   // Direct enrollment/unenrollment handler
//   const handleEnrollmentChange = (e: React.MouseEvent, course: any, shouldEnroll: boolean) => {
//     e.preventDefault();
    
//     // First, update local state for immediate feedback
//     const updatedCourses = allCourses.map(c => 
//       c._id === course._id ? { ...c, enrolled: shouldEnroll } : c
//     );
//     setAllCourses(updatedCourses);
    
//     // Then call the parent's updateEnrollment function
//     updateEnrollment(course._id, shouldEnroll);
    
//     // Also dispatch directly to Redux for guaranteed state update
//     if (shouldEnroll) {
//       dispatch(enroll({ user: currentUser, course }));
//     } else {
//       dispatch(unenroll({ user: currentUser, course }));
//     }
//   };
  
//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">
//         Dashboard
//         <button
//           onClick={() => setEnrolling(!enrolling)}
//           className="float-end btn btn-primary"
//         >
//           {enrolling ? "My Courses" : "All Courses"}
//         </button>
//       </h1>
//       <hr />
//       {isAdminOrFaculty && (
//         <>
//           <h5>
//             New Course
//             <button
//               className="btn btn-primary float-end"
//               id="wd-add-new-course-click"
//               onClick={handleAddCourse}
//             >
//               Add
//             </button>
//             <button
//               className="btn btn-warning float-end me-2"
//               onClick={handleUpdateCourse}
//               id="wd-update-course-click"
//             >
//               Update
//             </button>
//           </h5>
//           <br />
//           <FormControl
//             value={course.title}
//             className="mb-2"
//             onChange={(e) => setCourse({ ...course, title: e.target.value })}
//           />
//           <FormControl
//             value={course.description}
//             as="textarea"
//             rows={1}
//             onChange={(e) => setCourse({ ...course, description: e.target.value })}
//           />
//           <hr />
//         </>
//       )}

//       <h2 id="wd-dashboard-published">
//         {enrolling ? "All Courses" : "My Courses"} ({
//           enrolling 
//           ? allCourses.length 
//           : allCourses.filter(course => course && course.enrolled).length
//         })
//       </h2>
//       <hr />
//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {allCourses
//             .filter(course => course)
//             .filter(course => enrolling || (course.enrolled || false))
//             .map((course: any) => (
//               <Col
//                 className="wd-dashboard-course"
//                 style={{ width: "300px" }}
//                 key={course._id}
//               >
//                 <Card>
//                   <Link
//                     to={`/Kambaz/Courses/${course._id}/Home`}
//                     className="wd-dashboard-course-link text-decoration-none text-dark"
//                   >
//                     <Card.Img
//                       variant="top"
//                       src={course.image || "images/reactjs.jpg"}
//                       width="100%"
//                       height={160}
//                     />
//                     <br />
//                     <div className="card-body">
//                       <h5 className="wd-dashboard-course-title card-title overflow-hidden text-nowrap">
//                         {enrolling && (
//                           <button 
//                             onClick={(event) => {
//                               handleEnrollmentChange(event, course, !course.enrolled);
//                             }}
//                             className={`btn ${
//                               course.enrolled ? "btn-danger" : "btn-success"
//                             } float-end`}
//                           >
//                             {course.enrolled ? "Unenroll" : "Enroll"}
//                           </button>
//                         )}
//                         {course.title}
//                       </h5>
//                       <p
//                         className="wd-dashboard-course-title card-text overflow-y-hidden"
//                         style={{ maxHeight: 50 }}
//                       >
//                         {course.description}
//                       </p>
//                       <button className="btn btn-primary wd-go-button">Go</button>
//                       {isAdminOrFaculty && (
//                         <>
//                           <Button
//                             onClick={(event) => {
//                               event.preventDefault();
//                               handleDeleteCourse(course._id);
//                             }}
//                             className="btn btn-danger wd-card-delete-button float-end"
//                             id="wd-delete-course-click"
//                           >
//                             Delete
//                           </Button>
//                           <Button
//                             id="wd-edit-course-click"
//                             onClick={(event) => {
//                               event.preventDefault();
//                               setCourse(course);
//                             }}
//                             className="btn btn-warning me-2 wd-card-edit-button float-end"
//                           >
//                             Edit
//                           </Button>
//                         </>
//                       )}
//                     </div>
//                   </Link>
//                 </Card>
//               </Col>
//             ))}
//         </Row>
//       </div>
//     </div>
//   );
// }

import { Link } from "react-router-dom";
import { Row, Col, Card, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { unenroll, enroll } from "./enrollmentReducer";
import { v4 as uuidv4 } from "uuid";
import { fetchAllCourses } from "./Courses/client";

interface DashboardProps {
  courses: any[];
  addNewCourse: (course: any) => Promise<any>;
  deleteCourse: (courseId: any) => Promise<any>;
  updateCourse: (course: any) => Promise<any>;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}

export default function Dashboard({
  courses,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();

  const newCourse = {
    _id: uuidv4(),
    title: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image: "images/reactjs.jpg",
  };

  const [course, setCourse] = useState(newCourse);
  const [allCourses, setAllCourses] = useState<any[]>(courses || []);
  const [addState,setAddState] = useState(false);

  // Fetch courses initially
  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    setAllCourses(courses);
  }, [addState]);



  // Update courses with enrollment status whenever enrollments change
  useEffect(() => {
    if (allCourses.length > 0 && enrollments && currentUser) {
      const coursesWithEnrollmentStatus = allCourses.map(course => ({
        ...course,
        enrolled: enrollments.some(
          (enrollment: any) => 
            enrollment.user === currentUser._id && 
            enrollment.course === course._id
        )
      }));
      setAllCourses(coursesWithEnrollmentStatus);
    }
  }, [enrollments, currentUser, allCourses.length]);

  const isAdminOrFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  const handleAddCourse = async () => {
    addState ? setAddState(false) : setAddState(true);
    const updatedCourse = { ...course, _id: uuidv4(), image: "images/reactjs.jpg" };
    setCourse(updatedCourse);
    const newCourseData = await addNewCourse(updatedCourse);
    await fetchCourses();
    
    // Auto-enroll the creator in the new course
    if (newCourseData) {
      dispatch(enroll({ user: currentUser, course: newCourseData }));
    }
  };

  const handleUpdateCourse = async () => {
    await updateCourse(course);
    await fetchCourses();
  };

  const handleDeleteCourse = async (courseId: string) => {
    await deleteCourse(courseId);
    await fetchCourses();
  };

  const fetchCourses = async () => {
    try {
      const updatedCourses = await fetchAllCourses();
      // Filter out any null or undefined courses
      const validCourses = updatedCourses.filter((course: any) => course !== null && course !== undefined);
      
      // Add enrollment status to each course
      if (validCourses.length > 0 && enrollments && currentUser) {
        const coursesWithEnrollmentStatus = validCourses.map((course: any) => ({
          ...course,
          enrolled: enrollments.some(
            (enrollment: any) => 
              enrollment.user === currentUser._id && 
              enrollment.course === course._id
          )
        }));
        setAllCourses(coursesWithEnrollmentStatus);
      } else {
        setAllCourses(validCourses);
      }
    } catch (error) {
      console.error("Error fetching courses:", error);
      setAllCourses([]); // Set to empty array on error
    }
  };

  // Direct enrollment/unenrollment handler
  const handleEnrollmentChange = (e: React.MouseEvent, course: any, shouldEnroll: boolean) => {
    e.preventDefault();
    
    // First, update local state for immediate feedback
    const updatedCourses = allCourses.map(c => 
      c._id === course._id ? { ...c, enrolled: shouldEnroll } : c
    );
    setAllCourses(updatedCourses);
    
    // Then call the parent's updateEnrollment function
    updateEnrollment(course._id, shouldEnroll);
    
    // Also dispatch directly to Redux for guaranteed state update
    if (shouldEnroll) {
      dispatch(enroll({ user: currentUser, course }));
    } else {
      dispatch(unenroll({ user: currentUser, course }));
    }
  };
  
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {!isAdminOrFaculty && (
          <button
            onClick={() => setEnrolling(!enrolling)}
            className="float-end btn btn-primary"
          >
            {enrolling ? "My Courses" : "All Courses"}
          </button>
        )}
      </h1>
      <hr />
      {isAdminOrFaculty && (
        <>
          <h5>
            New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}
            >
              Add
            </button>
            <button
              className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse}
              id="wd-update-course-click"
            >
              Update
            </button>
          </h5>
          <br />
          <FormControl
            value={course.title}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, title: e.target.value })}
          />
          <FormControl
            value={course.description}
            as="textarea"
            rows={1}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
          <hr />
        </>
      )}

      <h2 id="wd-dashboard-published">
        {enrolling ? "All Courses" : "My Courses"} ({
          enrolling 
          ? allCourses.length 
          : allCourses.filter(course => course && course.enrolled).length
        })
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {allCourses
            .filter(course => course)
            .filter(course => enrolling || (course.enrolled || false))
            .map((course: any) => (
              <Col
                className="wd-dashboard-course"
                style={{ width: "300px" }}
                key={course._id}
              >
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      variant="top"
                      src={course.image || "images/reactjs.jpg"}
                      width="100%"
                      height={160}
                    />
                    <br />
                    <div className="card-body">
                      <h5 className="wd-dashboard-course-title card-title overflow-hidden text-nowrap">
                        
                        {course.title}
                      </h5>
                      <p
                        className="wd-dashboard-course-title card-text overflow-y-hidden"
                        style={{ maxHeight: 50 }}
                      >
                        {course.description}
                      </p>
                      <button className="btn btn-primary wd-go-button">Go</button>
                      {!isAdminOrFaculty && (
                          <button 
                            onClick={(event) => {
                              handleEnrollmentChange(event, course, !course.enrolled);
                            }}
                            className={`btn ${
                              course.enrolled ? "btn-danger" : "btn-success"
                            } float-end`}
                          >
                            {course.enrolled ? "Unenroll" : "Enroll"}
                          </button>
                        )}
                      {isAdminOrFaculty && (
                        <>
                          <Button
                            onClick={(event) => {
                              event.preventDefault();
                              handleDeleteCourse(course._id);
                            }}
                            className="btn btn-danger wd-card-delete-button float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </Button>
                          <Button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 wd-card-edit-button float-end"
                          >
                            Edit
                          </Button>
                        </>
                      )}
                    </div>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}