import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <Navbar expand="lg" className=" NavBar">
      <Container fluid>
        <Navbar.Brand href="#">CampiLife</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/campeggi">Campeggi</Nav.Link>
            <Nav.Link href="/prenotazioni">Prenotazioni</Nav.Link>
            <NavDropdown title="Trova" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Per luogo</NavDropdown.Item>
              <NavDropdown.Item href="#action4">Per recensioni</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav.Link className="mx-2" href="/login">
            Login
          </Nav.Link>
          <Nav.Link className="mx-2" href="/register">
            Registrati
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
