// export default function People() {
//     return (
//         <div>
//             <h2>people</h2>
//         </div>
//     );
// }
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PeopleTable from "./Table";
import * as coursesClient from "../client";
import * as peopleClient from "./client";

export default function People() {
  const { cid } = useParams();
  const [users, setUsers] = useState([]);
  
  useEffect(() => {
    const fetchEnrolledUsers = async () => {
      if (cid) {
        const enrolledUsers = await peopleClient.fetchPeopleForCourse(cid);
        console.log(enrolledUsers);
        setUsers(enrolledUsers);
      }
    };
    fetchEnrolledUsers();
  }, [cid]);

  return (
    <div>
      <h2>People</h2>
      <PeopleTable users={users} />
    </div>
  );
}