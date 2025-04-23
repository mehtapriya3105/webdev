// import { useState } from "react";
// import { Button, FormControl } from "react-bootstrap";
// import * as client from "./client";
// import { useLocation, useNavigate } from "react-router";
// import { useSelector } from "react-redux";

// export default function Signin() {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   const [credentials, setCredentials] = useState({
//     username: "",
//     password: "",
//   });
//   const navigate = useNavigate();
 
//   const signin = async () => {
//     const user = await client.signin(credentials);

//     if (user == undefined) {
//       alert("Invalid credentials");
//       return;
//     } else {
//       if (currentUser._id == user) {
//         alert("SignIn done");
//         navigate(`${currentUser._id}/${(currentUser.role.toLowerCase())}/QuizzesHome`);
//       }
//     }
//   };
//   return (
//     <div>
//       <h1>Sign in</h1>
//       <FormControl
//         defaultValue={credentials.username}
//         onChange={(e) =>
//           setCredentials({ ...credentials, username: e.target.value })
//         }
//         className="mb-2"
//         placeholder="username"
//         id="wd-username"
//       />
//       <FormControl
//         defaultValue={credentials.password}
//         onChange={(e) =>
//           setCredentials({ ...credentials, password: e.target.value })
//         }
//         className="mb-2"
//         placeholder="password"
//         type="password"
//         id="wd-password"
//       />
//       <Button onClick={signin} id="wd-signin-btn" className="w-100">
//         {" "}
//         Sign in{" "}
//       </Button>
//     </div>
//   );
// }
