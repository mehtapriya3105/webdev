import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as db from "./Database";
export default function Dashboard() {
  // console.log("db");
  const course = db.courses;
  // console.log(course);
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">Published Courses {course.length}</h2>
      <hr />

      <Row xs={1} md={2} lg={4} className="g-4 px-3">
        {course.map((cr) => (
          <Col>
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
                  <Button variant="primary">Go</Button>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
