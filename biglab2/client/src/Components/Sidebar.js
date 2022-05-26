import { Nav } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
function MySideBar(props) {
  const navigate = useNavigate();
  const { activeFilter } = useParams();

  let currentFilter = activeFilter ? activeFilter.replace("%20", " ") : "All";
  let filters = ["All", "Favorites", "Best Rated", "Seen Last Month", "Unseen"];
  let navLinks = [];

  filters.forEach((item, index) => {
    if (currentFilter === item)
      navLinks.push(
        <Nav.Link
          key={index}
          eventKey={index}
          className="bg-primary"
          onClick={() => {
            props.setFilter(currentFilter);
            navigate(`/filter/${currentFilter}`);
          }}
        >
          <span className="text-light">{item}</span>
        </Nav.Link>
      );
    else
      navLinks.push(
        <Nav.Link
          key={index}
          eventKey={index}
          onClick={() => {
            props.setFilter(item);
            navigate(`/filter/${item}`);
          }}
        >
          <span className="text-dark">{item}</span>
        </Nav.Link>
      );
  });

  return (
    <Nav defaultActiveKey="/home" className="flex-column m-3">
      {navLinks}
    </Nav>
  );
}

export default MySideBar;
