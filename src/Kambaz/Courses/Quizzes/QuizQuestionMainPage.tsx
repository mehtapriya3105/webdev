//this is the page that opens when the user clicks on the quiz question- enw button
//it has the options and default view and edi preview
import { useState } from "react";
import { Form } from "react-bootstrap";

export default function QuizQuestionMainPage() {
  const [editPrviewStatus, setEditPreviewStatus] = useState(false);
  return (
    <div id="wd-quiz-question-add-new">
      <div className="d-flex justify-content-center my-3">
        <button
          className="btn btn-secondary d-flex align-items-center gap-2 mt-2"
          onClick={() => {
            setEditPreviewStatus(true);
          }}
        >
          Edit Preview
        </button>
      </div>
      {editPrviewStatus == true && (<Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Question Title"
          className="mb-2"
        />

        <div className="d-flex justify-content-between mb-3">
          <Form.Select style={{ width: "60%" }}>
            <option>True/False</option>
            <option>Multiple Choice</option>
            <option>Essay</option>
            <option>Fill in the Blank</option>
          </Form.Select>

          <div className="d-flex align-items-center">
            <span className="me-2">pts:</span>
            <Form.Control
              type="number"
              defaultValue={3}
              style={{ width: "60px" }}
            />
          </div>
        </div>
      </Form.Group>)}
    </div>
  );
}
