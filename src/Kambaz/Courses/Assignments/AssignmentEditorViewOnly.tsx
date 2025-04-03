import { useState, useEffect } from "react";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { RxCross1 } from "react-icons/rx";
import { useNavigate, useParams } from "react-router-dom";

interface AssignmentEditorViewOnlyProps {
  updateAssignment?: (assignment: any) => Promise<any>;
  fetchAssignment?: () => Promise<any[]>;
  assignments?: any[]; // Optional: If we want to pass assignments directly
}

export default function AssignmentEditorViewOnly({
  fetchAssignment,
  assignments = []
}: AssignmentEditorViewOnlyProps) {
  const { cid, aid } = useParams();
  const navigate = useNavigate();
  
  // State for loading and assignments
  const [loading, setLoading] = useState(false);
  const [currentAssignments, setCurrentAssignments] = useState(assignments);
  const [assignment, setAssignment] = useState<any>(null);

  // Fetch assignments if needed
  useEffect(() => {
    const loadData = async () => {
      // If we don't have assignments and there's a fetchAssignment function
      if (currentAssignments.length === 0 && fetchAssignment) {
        setLoading(true);
        try {
          const fetchedAssignments = await fetchAssignment();
          setCurrentAssignments(fetchedAssignments);
        } catch (error) {
          console.error("Error fetching assignments:", error);
        } finally {
          setLoading(false);
        }
      }
      
      // Find the current assignment
      const foundAssignment = currentAssignments.find(
        (a: any) => a.course === cid && a._id === aid
      );
      
      if (foundAssignment) {
        setAssignment(foundAssignment);
      }
    };

    loadData();
  }, [aid, cid, fetchAssignment, currentAssignments]);

  const handleNavigation = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-assignments-editor">
      <Row>
        <Col sm={10}>
          <Form>
            <Form.Group controlId="wd-name">
              <Form.Label>Assignment Name</Form.Label>
              <Form.Control type="text" defaultValue={assignment?._id || ""} disabled/>
            </Form.Group>

            <Form.Group controlId="wd-name">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" defaultValue={assignment?.description || ""} disabled/>
            </Form.Group>

            <Row className="mt-3">
              <Col sm={6}>
              </Col>
              <Col sm={1} className="float-end pl-5">
                <Form.Label>Points</Form.Label>
              </Col>
              <Col sm={5}>
                <Form.Control type="number" defaultValue={assignment?.points || ""} disabled/>
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
                  <Form.Select id="wd-group" disabled>
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
                <Form.Select id="wd-grade" disabled>
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
                        <Form.Select id="wd-submission-type" disabled>
                          <option>Online</option>
                          <option>Offline</option>
                        </Form.Select>
                        <div style={{ marginTop: "10px" }}>
                          <span style={{ marginRight: "5px" }}><strong>Online Entry Options</strong></span>
                          <br />
                          <Form.Check 
                            id="wd-text-entry"
                            type="checkbox"
                            label="Text Entry"
                            style={{ marginRight: "5px", marginTop:"5px" }}
                            disabled />
                          <Form.Check 
                            id="wd-website-url"
                            type="checkbox"
                            label="Website URL"
                            style={{ marginRight: "5px", marginTop:"5px" }}
                            disabled />
                          <Form.Check 
                            id="wd-media-recordings"
                            type="checkbox"
                            label="Media Recordings"
                            style={{ marginRight: "5px", marginTop:"5px" }}
                            disabled />
                          <Form.Check 
                            id="wd-student-annotation"
                            type="checkbox"
                            label="Student Annotation"
                            style={{ marginRight: "5px", marginTop:"5px" }}
                            disabled />
                          <Form.Check 
                            id="wd-file-upload"
                            type="checkbox"
                            label="File Uploads"
                            style={{ marginRight: "5px", marginTop:"5px" }}
                            disabled />
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
                      <Form.Control type="date" defaultValue={assignment?.dueDate || assignment?.editorDueDate || ""} disabled/>
                    </Form.Group>
                  </Col>
                </Row>
                <Row className="mb-3">
                  <Col sm={6}>
                    <Form.Group controlId="wd-available-from">
                      <Form.Label><strong>Available From</strong></Form.Label>
                      <Form.Control type="date" defaultValue={assignment?.availableFrom || assignment?.editorAvailableFrom || ""} disabled/>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group controlId="wd-available-until">
                      <Form.Label><strong>Until</strong></Form.Label>
                      <Form.Control type="date" defaultValue={assignment?.availableUntil || assignment?.editorDueDate || ""} disabled/>
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>
            
            <hr />
            <Row className="mt-4">
              <Col className="d-flex justify-content-end">
                <Button variant="secondary" id="wd-button-cancel" className="me-3" onClick={handleNavigation}> 
                  Cancel
                </Button>
                <Button variant="danger" id="wd-button-save" onClick={handleNavigation}>
                  Save
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