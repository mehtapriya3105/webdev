import Nav from "react-bootstrap/Nav";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
export default function TOC() {
  const { pathname } = useLocation();
  return (
    <Nav variant="pills" id="wd-toc">
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab1" id="wd-a1"
          active={pathname.includes("Lab1")}> Lab 1 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab2" id="wd-a2"
          active={pathname.includes("Lab2")}> Lab 2 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab3" id="wd-a3"
          active={pathname.includes("Lab3")}> Lab 3 </Nav.Link> </Nav.Item>
          <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab4" id="wd-a3"
          active={pathname.includes("Lab4")}> Lab 4 </Nav.Link> </Nav.Item>
           <Nav.Item> <Nav.Link as={Link} to="/Labs/Lab5" id="wd-a3"
          active={pathname.includes("Lab5")}> Lab 5 </Nav.Link> </Nav.Item>
      <Nav.Item> <Nav.Link as={Link} to="/Kambaz" id="wd-a3"> Kambaz </Nav.Link> </Nav.Item>
     <Nav.Item>
       <Nav.Link href="https://github.com/mehtapriya3105/webdev.git">My GitHub</Nav.Link>
     </Nav.Item>
   </Nav>
);}
