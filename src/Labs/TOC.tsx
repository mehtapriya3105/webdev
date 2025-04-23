import Nav from "react-bootstrap/Nav";
import { Link, useLocation } from "react-router";
export default function TOC() {
    const { pathname } = useLocation();
    return (
        <Nav variant="pills" id="wd-toc"> 
            {/* <Nav.Item> 
                <Nav.Link href="#/Labs">Default Lab</Nav.Link> 
            </Nav.Item> */}

            <Nav.Item> 
                <Nav.Link as={Link} to="/Labs/Lab1" id="wd-a1"active={pathname.includes("Lab1")}> 
                    Lab 1 
                </Nav.Link> 
            </Nav.Item>
             
            <Nav.Item> 
                <Nav.Link as={Link} to="/Labs/Lab2" id="wd-a2"active={pathname.includes("Lab2")}> 
                    Lab 2 
                </Nav.Link> 
            </Nav.Item>

            <Nav.Item> 
                <Nav.Link as={Link} to="/Labs/Lab3" id="wd-a3"active={pathname.includes("Lab3")}> 
                    Lab 3 
                </Nav.Link> 
            </Nav.Item>

            <Nav.Item> 
                <Nav.Link as={Link} to="/Labs/Lab4" id="wd-a4"active={pathname.includes("Lab4")}> 
                    Lab 4 
                </Nav.Link> 
            </Nav.Item>

            <Nav.Item> 
                <Nav.Link as={Link} to="/Labs/Lab5" id="wd-a5"active={pathname.includes("Lab5")}> 
                    Lab 5 
                </Nav.Link> 
            </Nav.Item>

            <Nav.Item>
                <Nav.Link as={Link} to="/Kambaz" id="wd-a6">
                    Kambaz 
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="https://github.com/Trivedi-s/webd-react-web-app-cs5610-sp25/tree/a5" target="_blank" active={false}>
                    My React GitHub 
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="https://github.com/Trivedi-s/webd-node-web-app-cs5610-sp25" target="_blank" active={false}>
                    My Node GitHub 
                </Nav.Link>
            </Nav.Item>

            <Nav.Item>
                <Nav.Link href="https://webd-node-web-app-cs5610-sp25.onrender.com" target="_blank" active={false}>
                    Render Server
                </Nav.Link>
            </Nav.Item>

            {/* <Nav.Item> 
                <Nav.Link href="#/Labs/Lab1">Lab 1</Nav.Link>
            </Nav.Item> 
            <Nav.Item> 
                <Nav.Link href="#/Labs/Lab2">Lab 2</Nav.Link> 
            </Nav.Item> 
            <Nav.Item> 
                <Nav.Link href="#/Labs/Lab3">Lab 3</Nav.Link> 
            </Nav.Item> 
            <Nav.Item> 
                <Nav.Link href="#/Kambaz">Kambaz</Nav.Link> 
            </Nav.Item> 
            <Nav.Item> 
                <Nav.Link href="https://github.com/Trivedi-s/webd-react-web-app-cs5610-sp25/tree/a2" id="wd-github" target="_blank" rel="noopener noreferrer">My GitHub</Nav.Link> 
            </Nav.Item>  */}
        </Nav> 
    );
}