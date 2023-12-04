import { Button, ButtonGroup, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./MapComponent";

const Home = () => {
  const numberCount = useSelector((state) => state.cart.count);
  const dispatch = useDispatch();
  return (
    <div className="Home">
      <NavBar />
      <Row
        className="d-flex flex-row"
        style={{
          height: "70vh",
        }}
      >
        <Col>
          <Container>
            {" "}
            <Row>
              <Col>
                <div>
                  <h2>{numberCount}</h2>
                  <ButtonGroup
                    size="lg"
                    className="mb-2"
                    onClick={() => {
                      dispatch({
                        type: "INCREMENTA",
                        payload: 1,
                      });
                    }}
                  >
                    <Button type="button" className="btn btn-secondary">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-bookmark-heart"
                        viewBox="0 0 16 16"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M8 4.41c1.387-1.425 4.854 1.07 0 4.277C3.146 5.48 6.613 2.986 8 4.412z"
                        ></path>
                        <path d="M2 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v13.5a.5.5 0 0 1-.777.416L8 13.101l-5.223 2.815A.5.5 0 0 1 2 15.5zm2-1a1 1 0 0 0-1 1v12.566l4.723-2.482a.5.5 0 0 1 .554 0L13 14.566V2a1 1 0 0 0-1-1z"></path>
                      </svg>
                    </Button>
                  </ButtonGroup>
                </div>{" "}
                <Form className="d-flex">
                  <Form.Control type="search" placeholder="Search" className="me-2 " aria-label="Search" />
                  <Button variant="outline-success">Search</Button>
                </Form>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <MapComponent />
    </div>
  );
};

export default Home;
