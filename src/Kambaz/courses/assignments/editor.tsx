import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";

export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <Row>
        <Col sm={10}>
          <Form>
            <Form.Group controlId="wd-name">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control type="text" defaultValue="A1" />
            </Form.Group>

            <div className="border w-100 p-2 rounded float-end mb-3 mt-3" style={{borderColor:"#dee2e6"}}>
              <p className="mt-3 mb-2">
                The assignment is <span style={{color:"red"}}>available online.</span>
              </p>
              <p className="mb-2">Submit a link to the landing page of your Web application running on Netlify.</p>
              <p className="mb-2">The landing page should include the following:</p>
              <ul className="mb-2">
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>Link to the Kambaz application</li>
              <li>Links to all relevant source code repositories</li>
              </ul>
              <p>The Kanbas application should include a link to navigate back to the landing page.</p>
            </div>

            <Row className="mt-3">
              <Col sm={6}>
              </Col>
              <Col sm={1} className="float-end pl-5">
                <Form.Label>Points</Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Control type="number" defaultValue={100} />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col sm={5}></Col>
              <Col sm={2}>
                <Form.Group controlId="wd-group">
                  <Form.Label>Assignment Group</Form.Label>
                </Form.Group>
              </Col>
              
              <Col sm={5}>
                <Form.Group controlId="wd-group">
                  <Form.Select id="wd-group">
                    <option>Assignment Group</option>
                    <option value="1">ASSIGNMENT</option>
                    <option value="2">None</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
            <Col sm={5}></Col>
              <Col sm={2}>
                <Form.Group controlId="wd-grade">
                  <Form.Label>Display Grade as</Form.Label>
                </Form.Group>
              </Col>
              
              <Col sm={5}>
                <Form.Group controlId="wd-grade">
                <Form.Select id="wd-grade">
                    <option value="1">Percentage</option>
                    <option value="2">Points</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col sm={5}></Col>
              <Col sm={2}>
                <Form.Group controlId="wd-submission">
                  <Form.Label>Submission Type</Form.Label>
                </Form.Group>
              </Col>
              
              <Col sm={5} className="border rounded">
                <Table borderless>
                  <tbody>
                    <tr>
                      <td>
                        <Form.Select id="wd-submission-type">
                          <option>Online</option>
                          <option>Offline</option>
                        </Form.Select>
                        <div style={{ marginTop: "10px" }}>
                          <span style={{ marginRight: "5px" }}>Online Entry Options</span>
                          <br />
                          <Form.Check 
                            id="wd-text-entry"
                            type="checkbox"
                            label="Text Entry"
                            style={{ marginRight: "5px" }}
                          />
                          <Form.Check 
                            id="wd-website-url"
                            type="checkbox"
                            label="Website URL"
                            style={{ marginRight: "5px" }}
                          />
                          <Form.Check 
                            id="wd-media-recordings"
                            type="checkbox"
                            label="Media Recordings"
                            style={{ marginRight: "5px" }}
                          />
                          <Form.Check 
                            id="wd-student-annotation"
                            type="checkbox"
                            label="Student Annotation"
                            style={{ marginRight: "5px" }}
                          />
                          <Form.Check 
                            id="wd-file-upload"
                            type="checkbox"
                            label="File Uploads"
                            style={{ marginRight: "5px" }}
                          />
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </Col>
            </Row>

            <Row className="mt-3">
              <Col sm={6}></Col>
              <Col sm={1}>
                <Form.Group controlId="wd-assign-to">
                  <Form.Label>Assign</Form.Label>
                </Form.Group>
              </Col>
              <Col sm={5} className="border rounded">
                <Row>
                  <Col>
                    <Form.Group controlId="wd-assign-to">
                      <Form.Label><strong>Assign to</strong></Form.Label>
                      <div className="d-flex align-items-center border rounded p-2">
                        <div className="d-flex align-items-center border rounded p-2" style={{ whiteSpace: 'nowrap', backgroundColor:"#f0f0f0" }}>
                          <span>Everyone</span>
                          <RxCross1 />
                        </div>
                      </div>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="wd-due-date">
                      <Form.Label><strong>Due </strong></Form.Label>
                      <Form.Control type="datetime-local" defaultValue="2022-05-13T12:30" />
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group controlId="wd-available-from">
                      <Form.Label><strong>Available From</strong></Form.Label>
                      <Form.Control type="datetime-local" defaultValue="2022-05-13T12:30" />
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="wd-available-until">
                      <Form.Label><strong>Until</strong></Form.Label>
                      <Form.Control type="datetime-local" defaultValue="2022-05-13T12:30" />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            
            <hr />
            <Row className="mt-4">
              <Col className="d-flex justify-content-end">
                <Button variant="secondary" id="wd-button-save" className="me-3">
                  Save
                </Button>
                <Button variant="danger" id="wd-button-cancel">
                  Cancel
                </Button>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col sm={2}></Col>
      </Row>
    </div>
  );
}