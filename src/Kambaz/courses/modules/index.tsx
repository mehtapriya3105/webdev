export default function Modules() {
    return (
      <div>
        <table>
          <tr>
            <td>
        <button id = "wd-button-collapseAll">Collapse All</button>
        </td>
        <td>
        <button id = "wd-button-viewProgress">View Progress</button>
        </td>
        <td>
        <select id="wd-PublishStatus">
          <option value="">Publish </option>
          <option value="">Hide</option>
        </select>
        </td>
        <td>
        <button id = "wd-button-addMoule">+Modules</button>
        </td>
        </tr>
        </table>
        <ul id="wd-modules">
          <li className="wd-module">
            <div className="wd-title">Week 1</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to the course</li>
                  <li className="wd-content-item">Learn what is Web Development</li>
                </ul>
                <span className="wd-title">READINGS</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 -Introduction</li>
                  <li className="wd-content-item">Full Stack Developer - Chapter 1 -Introduction</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to Web Development</li>
                  <li className="wd-content-item">Creating HTTP Server with Node.js</li>
                  <li className="wd-content-item">Creating React Application</li>
                </ul>
              </li>
            </ul>
          </li>
          <li className="wd-module">
            <div className="wd-title">Week 2</div>
            <ul className="wd-lessons">
              <li className="wd-lesson">
                <span className="wd-title">LEARNING OBJECTIVES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Learn how to interface with HTML</li>
                  <li className="wd-content-item">Deploy the assignment on Netlify</li>
                </ul>
                <span className="wd-title">SLIDES</span>
                <ul className="wd-content">
                  <li className="wd-content-item">Introduction to HTML and the DOM</li>
                  <li className="wd-content-item">Formatting Web contents with Headings and</li>
                  <li className="wd-content-item">Formatting content with Lists and Tables</li>
                </ul>
              </li>
            </ul>
          </li>
          

        </ul>
      </div>
  );}
  