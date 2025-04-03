
import { Button } from 'react-bootstrap';
import { FaCheckCircle, FaFileImport, FaHome, FaStream, FaBullhorn, FaChartBar, FaBell } from 'react-icons/fa';
import { MdDoNotDisturbAlt } from "react-icons/md";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: '350px', padding: '10px' }}>
    <h2>Course Status</h2>
    <div className="d-flex justify-content-between mb-2">
      <Button variant="secondary" size="lg" className="w-50 pe-1 d-flex align-items-center justify-content-center">
        <MdDoNotDisturbAlt className="me-2 fs-5" />
        <span>Unpublish</span>
      </Button>
      <Button variant="success" size="lg" className="w-50 d-flex align-items-center justify-content-center">
        <FaCheckCircle className="me-2 fs-5" />
        <span>Publish</span>
      </Button>
    </div>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaFileImport className="me-2 fs-5" /> Import Existing Content
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaFileImport className="me-2 fs-5" /> Import from Commons
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaHome className="me-2 fs-5" /> Choose Home Page
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaStream className="me-2 fs-5" /> View Course Stream
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaBullhorn className="me-2 fs-5" /> New Announcement
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaChartBar className="me-2 fs-5" /> New Analytics
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mb-1 text-nowrap">
        <FaBell className="me-2 fs-5" /> View Course Notifications
      </Button>
    </div>
  );
}
