import { Button, ButtonGroup, Card, Carousel, Col, Container, Form, Image, Navbar, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./MapComponent";
import { useState } from "react";
import { addIndirizzo } from "../redux/action";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const numberCount = useSelector((state) => state.count);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const [indirizzo, setIndirizzo] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (indirizzo.trim() === "") {
      console.error("campo di ricerca vuoto");
    } else {
      dispatch(addIndirizzo(indirizzo));
      navigate("/campeggiCercati");
    }
  };

  const handleInputChange = (event) => {
    console.log("Indirizzo:", event.target.value);
    setIndirizzo(event.target.value);
  };

  return (
    <div className="Home">
      <NavBar />
      <Form className="d-flex" onSubmit={handleSubmit}>
        <Form.Control
          type="search"
          placeholder="Cerca"
          className="me-2"
          aria-label="Search"
          value={indirizzo}
          onChange={handleInputChange}
        />
        <Button variant="outline-success" type="submit">
          Cerca
        </Button>
      </Form>

      <Carousel className="my-5">
        <Carousel.Item>
          <Image text="First slide" src="https://printler.com/media/photo/111779.jpg" className="d-block w-75" />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Image text="Second slide" src="https://printler.com/media/photo/111779.jpg" className="d-block w-75" />
          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item className="">
          <Image text="Third slide" src="https://printler.com/media/photo/111779.jpg" className="d-block w-" />
          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Row className="justify-content-centre">
        <Col>
          <Card style={{ width: "35rem" }}>
            <Card.Img
              variant="top"
              src="https://www.vancoolers.org/it/wp-content/uploads/2022/07/vanlife-cover-1.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card style={{ width: "35rem" }}>
            <Card.Img
              variant="top"
              src="https://www.vancoolers.org/it/wp-content/uploads/2022/07/vanlife-cover-1.jpg"
            />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>
                Some quick example text to build on the card title and make up the bulk of the card's content.
              </Card.Text>
              <Button variant="primary">Go somewhere</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {/* BOTTONE PREFERITI */}
      <Row
        className="d-flex flex-row"
        style={{
          height: "40vh",
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
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
