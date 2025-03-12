import { Button, Card, Col, FormControl, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProtectedRoute from "../ProtectedRoutes";
import { useState } from "react";
import ToggleButton from "./ToggleButton";
import { addCourse, deleteCourse, editCourse } from "./reducer";

export default function Dashboard() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { courses, enrollments } = useSelector(
    (state: any) => state.coursesReducer
  );
  // const { enrollments } = useSelector((state: any) => state.enrollmentReducer);

  const dispatch = useDispatch();

  const [course, setCourse] = useState({ _id: "", name: "", description: "" });
  const [showAllCourses, setShowAllCourses] = useState(false);

  const handleAddNewCourse = () => {
    const newCourse = {
      user: currentUser._id,
      name: course.name,
      description: course.description,
    };

    dispatch(addCourse(newCourse));
    setCourse({ _id: "", name: "", description: "" }); // Clear the form fields after submission
  };

  const handleDeleteCourse = (courseId: any) => {
    dispatch(deleteCourse(courseId));
  };

  const handleUpdateCourse = () => {
    const updatedCourse = {
      _id: course._id, // Use the ID of the course set in the state
      name: course.name,
      description: course.description,
    };
    dispatch(editCourse(updatedCourse)); // Dispatch to update the course
    setCourse({ _id: "", name: "", description: "" }); // Clear the form after submission
  };

  const isEnrolled = (courseId: any) => {
    return enrollments.some(
      (enrollment: { user: any; course: any }) =>
        enrollment.user === currentUser._id && enrollment.course === courseId
    );
  };

  return (
    <div id="wd-dashboard">
     {currentUser.role == "STUDENT" && 
        <Button
          variant={showAllCourses ? "primary" : "primary"}
          onClick={() => setShowAllCourses(!showAllCourses)}
          className="mb-3 float-end"
        >
          {showAllCourses ? "Show Enrolled Courses" : "Show All Courses"}
        </Button>
      }
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <ProtectedRoute>
        <h5>
          New Course
          <button
            className="btn btn-primary float-end"
            id="wd-add-new-course-click"
            onClick={handleAddNewCourse}
          >
            Add
          </button>
          <button
            className="btn btn-warning float-end me-2"
            onClick={() => {
              handleUpdateCourse();
            }}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
        <br />
        <FormControl
          value={course.name}
          className="mb-2"
          placeholder="Course Name"
          onChange={(e) => setCourse({ ...course, name: e.target.value })}
        />
        <FormControl
          value={course.description}
          className="mb-2"
          placeholder="Course Description"
          as="textarea"
          rows={3}
          onChange={(e) =>
            setCourse({ ...course, description: e.target.value })
          }
        />
      </ProtectedRoute>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses{" "}
        {
          courses
            .map((course: { _id: any }) =>
              enrollments.some(
                (enrollment: { user: any; course: any }) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              )
            )
            .filter((value: boolean) => value === true).length
        }
      </h2>
      <hr />
      <Row xs={1} md={2} lg={4} className="g-4 px-3">
        {(showAllCourses
          ? courses
          : courses.filter((cr) => isEnrolled(cr._id))
        ).map((cr) => (
          <Col key={cr._id}>
            <Card>
              <Link
                to={`/Kambaz/Courses/${cr._id}/Home`}
                className="text-decoration-none text-dark"
              >
                <Card.Img
                  variant="top"
                  src="/images/react.png"
                  width="100%"
                  height={160}
                />
              </Link>
              <Card.Body>
                <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                  {cr.name}
                </Card.Title>
                <Card.Text
                  className="wd-dashboard-course-description overflow-hidden"
                  style={{ height: "100px" }}
                >
                  {cr.description}
                </Card.Text>
                <div className="d-flex justify-content-between">
                  <Link to={`/Kambaz/Courses/${cr._id}/Home`}>
                    <Button variant="primary">Go</Button>
                  </Link>
                  <ProtectedRoute>
                    <Button
                      variant="warning"
                      onClick={() => {
                        setCourse(cr);
                      }} // ✅ Uses prop function
                      id="wd-edit-course-click"
                    >
                      Edit
                    </Button>
                  </ProtectedRoute>
                  <ProtectedRoute>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteCourse(cr._id)}
                      id="wd-delete-course-click"
                    >
                      Delete
                    </Button>
                  </ProtectedRoute>
                 { currentUser.role == "STUDENT" &&  <ToggleButton userId={currentUser._id} courseId={cr._id} />}
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
