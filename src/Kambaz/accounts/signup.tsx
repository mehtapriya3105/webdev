import { FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
export default function Signup() {
  return (
    <div id="wd-signup-screen">
      <h3>Sign up</h3>
      <FormControl id="wd-username"
           placeholder="username"
           className="mb-2"/><br />
    <FormControl id="wd-password"
           placeholder="password" type="password"
           className="mb-2"/><br />
           <FormControl id="wd-password-verify"
           placeholder="password" type="password"
           className="mb-2"/><br />
      
      <br />
      <Link to="/Kambaz/Account/Profile" className="btn btn-primary w-100 mb-2"> Sign up </Link>
      <br />
      <Link to="/Kambaz/Account/Signin">Sign in</Link>
    </div>
   

  );
}
