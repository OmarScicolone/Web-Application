import { Container, Button, Form, FormControl, Col, Navbar, Nav } from "react-bootstrap";

function MySideBar() {
   return (
      <Nav variant="pills" defaultActiveKey="/home" className="flex-column">
         <Nav.Link href="/home">All</Nav.Link>
         <Nav.Link eventKey="link-1">Favourites</Nav.Link>
         <Nav.Link eventKey="link-2">Best Rated</Nav.Link>
         <Nav.Link eventKey="link-3">Seen Last Month</Nav.Link>
         <Nav.Link eventKey="link-4">Unseen</Nav.Link>
      </Nav>

   )
}

export default MySideBar;
