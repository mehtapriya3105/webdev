import { BsGripVertical } from "react-icons/bs";
import { IoNewspaperOutline } from "react-icons/io5";
export default function LessonControlButtons() {
  return (
    <div className="float-strart">
        <BsGripVertical className="me-2 fs-3" />
      <IoNewspaperOutline className="fs-4 text-success" />    
    </div>
  );
}