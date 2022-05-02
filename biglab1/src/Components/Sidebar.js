import { Nav } from "react-bootstrap";

function MySideBar(props) {
   return (
      <Nav variant="pills" defaultActiveKey="link-0" className="flex-column">
         <Nav.Link eventKey="link-0" onClick={()=> props.setNewFilter("All")} >All</Nav.Link>
         <Nav.Link eventKey="link-1" onClick={()=> props.setNewFilter("Favorites")} >Favorites</Nav.Link>
         <Nav.Link eventKey="link-2" onClick={()=> props.setNewFilter("Best Rated")} >Best Rated</Nav.Link>
         <Nav.Link eventKey="link-3" onClick={()=> props.setNewFilter("Seen Last Month")} >Seen Last Month</Nav.Link>
         <Nav.Link eventKey="link-4" onClick={()=> props.setNewFilter("Unseen")} >Unseen</Nav.Link>
      </Nav>
   )
}

export default MySideBar;
