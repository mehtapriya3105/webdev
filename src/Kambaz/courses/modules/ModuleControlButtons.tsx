import { IoEllipsisVertical } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
export default function LessonControlButtons({
  moduleId,
  deleteModule,
  editModule
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void 
}) {
  return (
    <div className="float-end">
       <FaPencil onClick={() => editModule(moduleId)} className="text-primary me-3" />
    
      <FaTrash
        className="text-danger me-2 mb-1"
        onClick={() => deleteModule(moduleId)}
      />
      <GreenCheckmark />
      <IoAddOutline className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
