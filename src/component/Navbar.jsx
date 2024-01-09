import React, { useEffect, useState } from "react";
import { Col, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logoutUser } from "../redux/action";

const NavBar = () => {
  const dispatch = useDispatch();
  const numeroPreferiti = useSelector((state) =>
    state.login.user ? state.login.user.campeggioPreferito.length || 0 : 0
  );
  const numeroPrenotazioni = useSelector((state) => (state.login.user ? state.login.user.prenotazioni.length || 0 : 0));
  const user = useSelector((state) => state.login.user);

  const [isNavbarVisible, setNavbarVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;

      setNavbarVisible(scrollTop <= 0);
    };

    // Aggiungi l'event listener per lo scroll
    window.addEventListener("scroll", handleScroll);

    // Pulisci l'event listener quando il componente si smonta
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <Container fluid className={`main-content ${isNavbarVisible ? "navbar-visible" : "navbar-hidden"}`}>
      <Navbar
        expand="lg"
        className={`p-3 NavBar fixed-top main-content ${isNavbarVisible ? "navbar-visible" : "navbar-hidden"}`}
      >
        <Navbar.Brand href="/home">CampOk</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: "100px" }} navbarScroll>
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/campeggi">Campeggi</Nav.Link>
            <Nav.Link href="/prenotazioni">Prenotazioni</Nav.Link>
          </Nav>

          <Nav>
            {user ? (
              <>
                <Row>
                  <Col>
                    <Link to="/preferiti">
                      <Button type="button" className="position-relative bg-secondary buttonNavbar">
                        <i className="position-absolute top-0 start-0 bg-danger numberNavbar ">{numeroPreferiti}</i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-heart"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                        </svg>
                      </Button>
                    </Link>
                  </Col>
                  <Col>
                    <Link to="/prenotazioni">
                      <Button type="button" className="position-relative bg-secondary buttonNavbar">
                        <i className="position-absolute top-0 start-0 bg-danger numberNavbar">{numeroPrenotazioni}</i>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          className="bi bi-book-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783" />
                        </svg>
                      </Button>
                    </Link>
                  </Col>
                </Row>
                <a href="/profile">
                  <Image
                    src={user.imgProfilo}
                    alt="image profile"
                    roundedCircle
                    style={{ width: "40px", height: "40px", marginInline: "1rem" }}
                  />
                </a>
                <NavDropdown id="dropdown-button-drop-start" drop="start" variant="secondary">
                  <Nav.Link href="/profile">Profilo</Nav.Link>
                  <Nav.Link href="/campeggi">Campeggi</Nav.Link>
                  <NavDropdown.Divider />
                  <Nav.Link href="/auth/login" onClick={handleLogout}>
                    Logout
                  </Nav.Link>
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
      </Navbar>
    </Container>
  );
};

export default NavBar;
