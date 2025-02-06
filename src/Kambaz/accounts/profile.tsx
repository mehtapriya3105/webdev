import { Link } from "react-router-dom";
import { Dropdown, FormControl } from "react-bootstrap";
export default function Profile() {
  return (
    <div id="wd-profile-screen">
      <h3>Profile</h3>
      <FormControl
        id="wd-username"
        defaultValue="alice"
        placeholder="username"
        className="mb-2"
      />
      <br />
      <FormControl
        id="wd-password"
        placeholder="password"
        type="password"
        className="mb-2"
      />
      <br />
      <FormControl
        defaultValue="Alice"
        placeholder="First Name"
        id="wd-firstname"
      />
      <br />
      <FormControl
        defaultValue="Wonderland"
        placeholder="Last Name"
        id="wd-lastname"
      />
      <br />
      <FormControl defaultValue="2000-01-01" type="date" id="wd-dob" />
      <br />
      <FormControl defaultValue="alice@wonderland" type="email" id="wd-email" />
      <br />
      <Dropdown className="wd-choosetype">
        <Dropdown.Toggle variant="secondary" id="wd-user-type">
          Select User Type
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-dropdown-user">User</Dropdown.Item>
          <Dropdown.Item id="wd-dropdown-Faculty">Faculty</Dropdown.Item>
          <Dropdown.Item id="wd-dropdown-Admin">Admin</Dropdown.Item>
          <Dropdown.Item id="wd-dropdown-Student">Student</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <br/>
      <Link id="wd-signin-btn"
            to="/Kambaz/Account/Signin"
            className="btn btn-danger w-100 mb-2">
           Sign Out</Link><br />
      
    </div>
  );
}
