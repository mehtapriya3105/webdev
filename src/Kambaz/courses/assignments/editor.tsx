export default function AssignmentEditor() {
  return (
    <div id="wd-assignments-editor">
      <label htmlFor="wd-name">Assignment Name</label>
      <input id="wd-name" value="A1 - ENV + HTML" />
      <br />
      <br />
      <textarea id="wd-description">
        The assignment is available online Submit a link to the landing page of
      </textarea>
      <br />
      <table width={120}>
        <tr>
          <td align="right" valign="top">
            <label htmlFor="wd-points">Points</label>
          </td>
          <td>
            <input id="wd-points" value={100} />
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="wd-group">Assignment Group</label>
          </td>
          <td>
            <select name="wd-group" id="wd-group">
              Assignment Group
              <option value="1">ASSIGNMENT</option>
              <option value="2">None</option>
            </select>
          </td>
        </tr>
        <tr>
          <td>Display Grade as</td>
          <td>
            <select name="wd-grade" id="wd-grade">
              <option value="1">Percentage</option>
              <option value="2">Points</option>
            </select>
          </td>
        </tr>
        <tr>
          <td valign="top">Submission Type</td>
          <td>
            <select name="wd-submission" id="wd-submission">
              <option value="1">Online</option>
              <option value="2">On Paper</option>
            </select>
            <p>Online Entry Option</p>
            <tr>
              <input
                type="checkbox"
                name="wd-online"
                value="1"
                id="wd-submission-type"
              />
              Text Entry
              <br />
              <input
                type="checkbox"
                name="wd-online"
                value="2"
                id="wd-submission-type"
              />
              Website URL
              <br />
              <input
                type="checkbox"
                name="wd-online"
                value="3"
                id="wd-submission-type"
              />
              Media Recording
              <br />
              <input
                type="checkbox"
                name="wd-online"
                value="4"
                id="wd-submission-type"
              />
              Student Annotation
              <br />
              <input
                type="checkbox"
                name="wd-online"
                value="4"
                id="wd-submission-type"
              />
              File Upload
            </tr>
          </td>
        </tr>
        <tr>
          <td>
            <label htmlFor="wd-assign-to" id="wd-assign">
              {" "}
              Assign
            </label>
          </td>
          <td>
            <tr>
              <label htmlFor="wd-assign-to" id="wd-assign">
                Assign To
              </label>
            </tr>
            <tr>
              <input
                type="text"
                name="assign"
                id="wd-assign-to"
                defaultValue={"Everyone"}
              />
            </tr>
            <br />
            <tr>
              <label htmlFor="wd-due" id="wd-due">
                Due Date
              </label>
            </tr>
            <tr>
              <input type="date" id="wd-due-date" value="2022-05-13" />
            </tr>
            <tr>
              <td>
                <tr>
                  <label htmlFor="wd-available" id="wd-available">
                    Available From
                  </label>
                </tr>
                <tr>
                  <input
                    type="date"
                    id="wd-available-from"
                    value="2022-05-06"
                  />
                </tr>
              </td>
              <td>
                <tr>
                  <label htmlFor="wd-until" id="wd-until">
                    Until
                  </label>
                </tr>
                <tr>
                  <input
                    type="date"
                    id="wd-available-until"
                    value="2022-05-13"
                  />
                </tr>
              </td>
            </tr>
          </td>
        </tr>
        <hr />
        <tr>
          <td align="right" colSpan={2}>
            <button type="button" id="wd-button-save">
              Save
            </button>
            <button type="button" id="wd-button-cancel">
              Cancel
            </button>
          </td>
        </tr>
      </table>
    </div>
  );
}
