import { Button, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import { IoEllipsisVerticalOutline } from "react-icons/io5";
import { IoAddSharp } from "react-icons/io5";
import AssignmentControll1 from "./AssignmentControlRight";
import AssignmentControll from "./AssignmentControlLeft";
import { FaCaretDown, FaPlus } from "react-icons/fa";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useLocation, useNavigate, useParams } from "react-router";
import ProtectedRoute from "../../ProtectedRoutes";
import { deleteAssignment } from "./reducer";
import { useDispatch, useSelector } from "react-redux";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const handleAddAssignment = () => {
    console.log(`${location.pathname}/add`)
    navigate(`${location.pathname}/add`);
  };
  return (
    <div id="wd-assignments">
      <div className="row justify-content-between mb-3">
        <div className="position-relative col-md-8">
          <HiMagnifyingGlass
            className="position-absolute ms-2"
            style={{ margin: "0 auto", height: "100%", left: "12px" }}
          />
          <input
            type="text"
            placeholder="Search..."
            className="form-control wd-search-bar"
            style={{ paddingLeft: "30px", height: "48px" }}
          />
        </div>
        <div className="col-md-4">
          <ProtectedRoute>
            <Button
              variant="danger"
              size="lg"
              className="me-1 float-end"
              id="wd-add-assignment"
              onClick={handleAddAssignment}
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>
          </ProtectedRoute>
          <Button
            variant="secondary"
            size="lg"
            className="me-1 float-end"
            id="wd-add-module-btn"
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
        </div>
      </div>

      <div id="wd-asignment-main-section" className="wd-title p-0 w-100 mt-5">
        <ListGroup className="rounded-0 w-100" id="wd-modules">
          <ListGroup.Item className="wd-module p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between align-items-center w-100">
              <div className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" />
                <FaCaretDown /> ASSIGNMENTS
              </div>
              <div className="d-flex align-items-center">
                <button className="rounded-pill me-3 bg-secondary border-opacity-50">
                  40% of total
                </button>
                <button className="border-0 bg-secondary">
                  <IoAddSharp />
                </button>
                <IoEllipsisVerticalOutline />
              </div>
            </div>
          </ListGroup.Item>
        </ListGroup>

        <div className="w-100">
          {assignments
            .filter((assignments: any) => assignments.course === cid)
            .map((item: any, index: number) => (
              <ListGroup.Item
                key={item._id}
                className="wd-assignment-multiple d-flex justify-content-between align-items-center p-3 list-group-item border-top-0 w-100"
              >
                <div className="d-flex align-items-center">
                  <AssignmentControll />
                  <div className="ms-3 border-gray">
                    <a
                      href={`#/Kambaz/Courses/${item.course}/Assignments/${item._id}`}
                      className="wd-assignment-link text-black text-decoration-none"
                    >
                      {item._id}
                    </a>
                    <p className="wd-assignment-details mb-0">
                      <span className="text-danger"> Multiple Modules</span> |{" "}
                      <b>Not Available until</b> {item.available_from} |<br />
                      <b>Due </b> {item.due_date} | {item.points} pts
                    </p>
                  </div>
                </div>
                <AssignmentControll1
                  assignmentId={item._id}
                  deleteAssignment={(assignmentId) => {
                    dispatch(deleteAssignment(assignmentId));
                  }}
                  
                />
              </ListGroup.Item>
            ))}
        </div>
      </div>
    </div>
  );
}
