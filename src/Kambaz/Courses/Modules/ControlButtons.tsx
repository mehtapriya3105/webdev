import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaPlus } from "react-icons/fa";
// import { IoApps } from "react-icons/io5";
export default function ControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <FaPlus className="fs-4 me-2" /> 
      <IoEllipsisVertical className="fs-4" />
    </div> );}