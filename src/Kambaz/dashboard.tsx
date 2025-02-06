import { Button, Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> 
      <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> 
      <hr />

      <Row xs={1} md={2} lg={4} className="g-4 px-3">
        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1234/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1234 React JS</Card.Title>
                <Card.Text>Full Stack software developer</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1235/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1235 Cyber Security</Card.Title>
                <Card.Text>CyberSecurity Course</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1236/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1236 Natural Language Processing</Card.Title>
                <Card.Text>Large Language Model</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1237/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1237 Computer Vision</Card.Title>
                <Card.Text>Image Processing</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1238/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1238 Machine Learning</Card.Title>
                <Card.Text>Basic Course</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1239/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1239 Java Programming</Card.Title>
                <Card.Text>Basic Java Course</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1240/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1240 Python Programming</Card.Title>
                <Card.Text>Basic Python Course</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1241/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1241 Rust Programming</Card.Title>
                <Card.Text>Basic Rust Course</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>

        <Col>
          <Card>
            <Link to="/Kambaz/Courses/1242/Home" className="text-decoration-none text-dark">
              <Card.Img variant="top" src="public/images/react.png" width="100%" height={160} />
              <Card.Body>
                <Card.Title>CS1242 Go Programming</Card.Title>
                <Card.Text>Basic Go Course</Card.Text>
                <Button variant="primary">Go</Button>
              </Card.Body>
            </Link>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
