import { IoEllipsisVertical } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import GreenCheckmark from "./GreenChecks";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import {  useLocation, useNavigate } from "react-router-dom";

export default function LessonControlButtons({
  assignmentId,
  deleteAssignment,
}: {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => void;
}) {
  const handleDeleteAssignment = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      deleteAssignment(assignmentId);
    }
  };

  const handleEditAssignemnt = () => {
    navigate(`${location.pathname}/${assignmentId}`);
  };

  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="float-end">
      <GreenCheckmark 
      />
      <FaTrash
      className="text-danger me-2 mb-1 ml-1 mr-1"
        onClick={() => {
          handleDeleteAssignment(assignmentId);
        }}
      />
      <FaPencil  className="text-primary me-2 mb-1 ml-1 mr-1"
        onClick={() => {
          console.log("Edit assignments", assignmentId);
          handleEditAssignemnt();
        }}
      >
        {/* Add a React.Fragment or a div here */}
        <></>
      </FaPencil>
      <IoAddOutline className="fs-4  me-2 mb-1 ml-1 mr-1" />
      <IoEllipsisVertical className="fs-4  me-2 mb-1 ml-1 mr-1" />
    </div>
  );
}

