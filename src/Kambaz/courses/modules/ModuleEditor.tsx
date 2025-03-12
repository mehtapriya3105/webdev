import { Modal, Button, FormControl } from "react-bootstrap";

export default function ModuleEditor({
  show,
  handleClose,
  dialogTitle,
  moduleName,
  setModuleName,
  addModule,
}: {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  moduleName: string;
  setModuleName: (title: string) => void;
  addModule: () => void;
}) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FormControl
          value={moduleName}
          onChange={(e) => setModuleName(e.target.value)}
          placeholder="Module Name"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={addModule}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}