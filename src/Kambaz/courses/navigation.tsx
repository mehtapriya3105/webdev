import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const location = useLocation();
  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];
  const { cid } = useParams(); 

  return (
    <div
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0 p-2"
    >
      {links.map((link) => (
        <Link
          key={link}
          to={`/Kambaz/Courses/${cid}/${link}`} 
          className={`list-group-item border border-0 ${
            location.pathname === `/Kambaz/Courses/${cid}/${link}`
              ? "active"
              : "text-danger"
          }`}
        >
          {link}
        </Link>
      ))}
    
    </div>
  );
}
