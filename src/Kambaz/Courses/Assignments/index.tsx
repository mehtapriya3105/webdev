import { Button, ListGroup } from "react-bootstrap";
import { FaCaretDown } from "react-icons/fa6";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import AssignmentControll1 from "./AssignmentControlLeft";
import AssignmentControll2 from "./AssignmentControlButtons";
import { Link, useNavigate, useParams } from "react-router";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { FaPlus } from "react-icons/fa";
import ProtectedRoute from "../../ProtectedRoutes";
import { useEffect } from "react";

interface AssignmentProps {
  assignments: any[];
  createNewAssignment: (assignment: any) => Promise<any>;
  deleteAssignment: (assignmentId: any) => Promise<any>;
  updateAssignment: (assignment: any) => Promise<any>;
  fetchAssignment: () => Promise<any[]>;
}

export default function Assignments({
  assignments,
  deleteAssignment,
  updateAssignment,
  fetchAssignment
}: AssignmentProps) {
  console.log("here 1");
  
  const { cid } = useParams();
  const navigate = useNavigate();
  
  // Use useEffect to fetch assignments when component mounts
  useEffect(() => {
    const loadAssignments = async () => {
      try {
        await fetchAssignment();
      } catch (error) {
        console.error("Error fetching assignments:", error);
      }
    };
    
    loadAssignments();
  }, []);
  
  const handleAddAssignment = () => {
    // Navigate to the editor page
    navigate(`/Kambaz/Courses/${cid}/AssignmentEditor`);
    
    // Note: The actual addNewAssignment function would be called 
    // in the AssignmentEditor component after the form submission
  };
  
  return (
    <div id="wd-assignments">
 
      <div className="row justify-content-between">
        <div className="position-relative col-md-8">
          <HiMagnifyingGlass className="position-absolute ms-2" style={{ margin: "0 auto", height: "100%", left: "12px" }} />
          <input
            type="text"
            placeholder="Search..."
            className="form-control wd-search-bar"
            style={{ paddingLeft: "30px", height: "48px" }}
          />
        </div>
        <div className="col-md-4">
          <ProtectedRoute>
            <Button variant="danger" size="lg" className="me-1 float-end" id="wd-add-assignment" onClick={handleAddAssignment} >
              <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
              Assignment
            </Button>
          </ProtectedRoute>
          <Button variant="secondary" size="lg" className="me-1 float-end" id="wd-add-module-btn">
            <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
            Group
          </Button>
        </div>
      </div>

      <div id="wd-asignment-main-section" className="wd-title p-3 ps-2 ">
        <ListGroup className="rounded-0" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-center">
              <div className="ms-3">
                <BsGripVertical className="me-2 fs-3" /><FaCaretDown /> ASSIGNMENTS
              </div>
              <div className="ms-3 align-items-center">
                <button className="rounded-pill me-3 bg-secondary border-opacity-50">
                  40% of total
                </button>
                <button className="border-0 bg-secondary">
                  <IoAddSharp></IoAddSharp>
                </button>
                <IoEllipsisVerticalOutline></IoEllipsisVerticalOutline>
              </div>
            </div>
          </ListGroup.Item>
          {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) => (
              <ListGroup.Item key={assignment._id} className="d-flex justify-content-between align-items-center p-3 wd-lesson">
                <div className="d-flex align-items-center">
                  <AssignmentControll1 />
                  <div className="mt-3">
                    <div className="ms-3 assignment-item">
                      <Link
                        to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}/EditAssignment`}
                        className="wd-assignment-link text-black text-decoration-none"
                      >
                        <strong>{assignment._id}</strong>
                      </Link>
                      <p className="wd-assignment-details mb-0">
                        <span className="text-danger">{assignment.title}</span> |{" "}
                        <b>Not Available until</b> {assignment.availableFrom} |
                        <br />
                        <b>Due </b>{assignment.dueDate} | {assignment.points} pts
                      </p>
                    </div>
                  </div>
                </div>
                <AssignmentControll2 
                  assignmentId={assignment._id}
                  deleteAssignment={deleteAssignment}
                  updateAssignment={updateAssignment}
                />
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    </div>
  );
}