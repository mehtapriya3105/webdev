import { IoEllipsisVertical } from "react-icons/io5";
import { IoAddOutline } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckMark";
export default function LessonControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <IoAddOutline className="fs-4" />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
