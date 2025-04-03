import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import { MdOutlineCancel } from "react-icons/md";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";

export default function ModulesControls({ moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }) {
   const [show, setShow] = useState(false);
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);
  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* Add Module Button */}
      <Button
        variant="danger"
        onClick={handleShow}
        size="lg"
        className="me-1 float-end"
        id="wd-add-module-btn"
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* Publish Dropdown */}
      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
         
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
          <MdOutlineCancel/>
             Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <MdOutlineCancel/>
            Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

    
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-view-progress"
      >
        View Progress
      </Button>

      
      <Button
        variant="secondary"
        size="lg"
        className="float-end me-2"
        id="wd-collapse-all"
      >
        Collapse All
      </Button>
      <ModuleEditor show={show} handleClose={handleClose} dialogTitle="Add Module"
       moduleName={moduleName} setModuleName={setModuleName} addModule={addModule} />
    </div>
  );
}