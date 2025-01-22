import { Link } from "react-router-dom";
export default function Dashboard() {
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
      <div id="wd-dashboard-courses">
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1234/Home"
            className="wd-dashboard-course-link"
          >
            <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1234 React JS </h5>
              <p className="wd-dashboard-course-title">
                Full Stack software developer{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          {" "}
          <Link
            to="/Kambaz/Courses/1235/Home"
            className="wd-dashboard-course-link"
          >
             <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1235 Cyber Security </h5>
              <p className="wd-dashboard-course-title">CyberSecurity Course </p>
              <button> Go </button>
            </div>
          </Link>{" "}
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1236/Home"
            className="wd-dashboard-course-link"
          >
            <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1236 Natural Language Processing </h5>
              <p className="wd-dashboard-course-title">
                Natural Language Processing{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>{" "}
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1237/Home"
            className="wd-dashboard-course-link"
          >
             <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1237 Computer Vision Course </h5>
              <p className="wd-dashboard-course-title">
                Computer Vision Course{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>{" "}
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1238/Home"
            className="wd-dashboard-course-link"
          >
            <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1238 Machine Learning Course </h5>
              <p className="wd-dashboard-course-title">
                Machine Learning Course{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1239/Home"
            className="wd-dashboard-course-link"
          >
             <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1239 Java Programming </h5>
              <p className="wd-dashboard-course-title">Java Programming </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          <Link
            to="/Kambaz/Courses/1241/Home"
            className="wd-dashboard-course-link"
          >
             <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1241 Python Programming </h5>
              <p className="wd-dashboard-course-title">
                Python Programing Course{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>
        </div>
        <div className="wd-dashboard-course">
          {" "}
          <Link
            to="/Kambaz/Courses/1242/Home"
            className="wd-dashboard-course-link"
          >
            <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1242 Rust Programming </h5>
              <p className="wd-dashboard-course-title">
                Rust Programming Course{" "}
              </p>
              <button> Go </button>
            </div>
          </Link>{" "}
        </div>
        <div className="wd-dashboard-course"> 
        <Link
            to="/Kambaz/Courses/1243/Home"
            className="wd-dashboard-course-link"
          >
             <img src="public/images/react.png" width={200}/>
            <div>
              <h5> CS1243 SQL Programming </h5>
              <p className="wd-dashboard-course-title">
              SQL Programming Course{" "}
              </p>
              <button> Go </button>
            </div>
          </Link> </div>
      </div>
    </div>
  );
}
