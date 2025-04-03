import { Link, useParams, useLocation } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = pathname.includes(link);
        return (
          <Link
            key={link}
            to={linkPath}
            id={`wd-course-${link.toLowerCase()}-link`}
            className={`list-group-item border border-0 ${isActive ? 'active' : 'text-danger'}`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}