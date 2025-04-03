import { Link } from "react-router-dom";
import { Row, Col, Card, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { unenroll, enroll, setEnrollments } from "./enrollmentReducer";
import * as enrollmentClient from "./Courses/People/client";
import { v4 as uuidv4 } from 'uuid';

interface DashboardProps {
  courses: any[];
  addNewCourse: (course: any) => Promise<any>;
  deleteCourse: (courseId: any) => Promise<any>;
  updateCourse: (course: any) => Promise<any>;
  fetchCourses: () => Promise<any[]>;
}

export default function Dashboard({
  courses,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: DashboardProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentReducer);
  const dispatch = useDispatch();
  const fetchEnrollments = async () => {
    let enrollments = [];
    try {
      enrollments = await enrollmentClient.fetchAllEnrollments();
    } catch (error) {
      console.error(error);
    }
    dispatch(setEnrollments(enrollments));
  };
  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

  const removeEnrollment = async (enrollment: any) => {
    await enrollmentClient.deleteEnrollment(enrollment._id);
    dispatch(unenroll({ user: currentUser, course: enrollment }));
  }

  const makeEnrollment = async (enrollment: any) => {
    await enrollmentClient.createNewEnrollment(enrollment);
    console.log(enrollment);
    dispatch(enroll({ user: currentUser, course: enrollment }));
  }

  // const getEnrollmentId = (userId: string, courseId: string): string | null => {
  //   const enrollment = enrollments.find(
  //     (enrollment: any) =>
  //       enrollment.user === userId &&
  //       enrollment.course === courseId
  //   );

  //   return enrollment ? enrollment._id : null;
  // };

  const newCourse = {
    _id: uuidv4(),
    title: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
    image: "images/reactjs.jpg",
  };

  const isAdminOrFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
  const [course, setCourse] = useState(newCourse);
  const [showAll, setShowAll] = useState(false);
  // console.log(courses);

  const handleAddCourse = async () => {
    const updatedCourse = { ...course, _id: uuidv4(), image: "images/reactjs.jpg" };
    setCourse(updatedCourse);
    const newCourseData = await addNewCourse(updatedCourse);
    dispatch(enroll({ user: currentUser, course: newCourseData || updatedCourse }));
  };

  const handleUpdateCourse = async () => {
    await updateCourse(course);
  };

  const handleDeleteCourse = async (courseId: string) => {
    await deleteCourse(courseId);
  };
  console.log(currentUser)
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
        {!isAdminOrFaculty && <Button className="float-end" onClick={() => setShowAll(!showAll)}>Enrollments</Button>}</h1>
      <hr />
      {isAdminOrFaculty && (
        <>
          <h5>New Course
            <button className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={handleAddCourse}> Add </button>
            <button className="btn btn-warning float-end me-2"
              onClick={handleUpdateCourse} id="wd-update-course-click">
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
        Published Courses ({
          showAll
            ? courses.length
            : courses.filter((course: any) =>
              enrollments.some(
                (enrollment: any) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              )
            ).length
        })
      </h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course: any) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }} key={course._id}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark" >
                  <Card.Img variant="top" src={course.image} width="100%" height={160} /><br />
                  <div className="card-body">
                    <h5 className="wd-dashboard-course-title card-title overflow-hidden text-nowrap">
                      {course.title} </h5>
                    <p className="wd-dashboard-course-title card-text overflow-y-hidden" style={{ maxHeight: 50 }}>
                      {course.description} </p>
                    <button className="btn btn-primary wd-go-button"> Go </button>
                    {isAdminOrFaculty &&
                      <>
                        <Button onClick={(event) => {
                          event.preventDefault();
                          handleDeleteCourse(course._id);
                        }} className="btn btn-danger wd-card-delete-button float-end"
                          id="wd-delete-course-click">
                          Delete
                        </Button>
                        <Button id="wd-edit-course-click"
                          onClick={(event) => {
                            event.preventDefault();
                            setCourse(course);
                          }}
                          className="btn btn-warning me-2 wd-card-edit-button float-end" >
                          Edit
                        </Button>
                      </>}
                    {!isAdminOrFaculty && (
                      enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === course._id) ?
                        <Button className="btn btn-danger wd-card-delete-button" onClick={(e) => {
                          e.preventDefault();
                          removeEnrollment(course);
                        }
                        }>Unenroll</Button>
                        :
                        <Button className="btn btn-success wd-card-delete-button" onClick={(e) => {
                          e.preventDefault();
                          makeEnrollment(course);
                        }}>Enroll</Button>
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