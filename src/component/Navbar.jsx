import { Image } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  const user = useSelector((state) => state.login.user);
  return (
    <Navbar expand="lg" className=" NavBar ">
      <Container fluid>
        <Navbar.Brand href="#">CampiLife</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/campeggi">Campeggi</Nav.Link>
            <Nav.Link href="/prenotazioni">Prenotazioni</Nav.Link>
            <NavDropdown title="Trova" id="navbarScrollingDropdown">
              <NavDropdown.Item href="/campeggi">Campeggi</NavDropdown.Item>
              <NavDropdown.Item href="avventure">Avventure</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
            </NavDropdown>
          </Nav>

          <Nav>
            {user ? (
              <>
                <a href="/profile">
                  <Image
                    src={user.imgProfilo}
                    alt="image profile"
                    roundedCircle
                    style={{ width: "40px", height: "40px", marginInline: "1rem" }}
                  />
                </a>
                <NavDropdown id="basic-nav-dropdown">
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/campeggi">Campeggi</Nav.Link>
                  <NavDropdown.Divider />
                  <Nav.Link href="/logout">Logout</Nav.Link>
                </NavDropdown>
              </>
            ) : (
              <>
                <Nav.Link href="/register">Registrati</Nav.Link>
                <Nav.Link href="/auth/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
