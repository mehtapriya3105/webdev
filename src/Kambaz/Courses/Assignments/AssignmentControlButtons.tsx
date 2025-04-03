import { BsPlus } from "react-icons/bs";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { useNavigate, useParams } from "react-router";
import { useSelector } from "react-redux";

interface AssignmentControlButtonsProps {
  assignmentId: string;
  deleteAssignment: (assignmentId: string) => Promise<any>;
  updateAssignment?: (assignment: any) => Promise<any>;
}

export default function AssignmentControlButtons({
  assignmentId,
  deleteAssignment
}: AssignmentControlButtonsProps) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { cid } = useParams();
  const navigate = useNavigate();
  const isAdminOrFaculty = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
  
  const handleEditAssignment = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments/${assignmentId}`);
  };
  
  const handleDeleteAssignment = async (assignmentId: string) => {
    if (window.confirm('Do you want to delete this assignment?')) {
      try {
        await deleteAssignment(assignmentId);
        // Optional: Show success message
      } catch (error) {
        console.error("Failed to delete assignment:", error);
        // Optional: Show error message
      }
    }
  };

  return (
    <div className="float-end d-flex align-items-center gap-2">
      {isAdminOrFaculty && (
        <>
          <FaPencil onClick={() => handleEditAssignment()} className="text-primary me-3" />
          <FaTrash className="text-danger me-2 mb-1" onClick={() => handleDeleteAssignment(assignmentId)} />
        </>
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      <BsPlus className="fs-4" />
    </div>
  );
}