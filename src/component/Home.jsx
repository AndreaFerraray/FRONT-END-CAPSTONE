import {
  Button,
  ButtonGroup,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Carousel,
  Col,
  Container,
  Form,
  FormCheck,
  Image,
  Navbar,
  Row,
} from "react-bootstrap";
import NavBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import MapComponent from "./MapComponent";
import { useEffect, useState } from "react";
import { addFilter, addIndirizzo, removeIndirizzo, resetFilters } from "../redux/action";
import { Navigate, useNavigate } from "react-router-dom";

const Home = () => {
  const numberCount = useSelector((state) => state.count);
  const user = useSelector((state) => state.login.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const [indirizzo, setIndirizzo] = useState("");
  const [post, setPost] = useState("");
  const [open, setOpen] = useState(false);
  const campeggio = useSelector((state) => state.campeggio);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (indirizzo.trim() === "") {
      console.error("campo di ricerca vuoto");
      alert("inserisci un luogo dove vorresti andare");
    } else {
      dispatch(addIndirizzo(indirizzo));
      navigate("/campeggiCercati");
      console.log(indirizzo);
    }
  };

  const [filterOptions, setFilterOptions] = useState({
    wifi: false,
    animaliAmmessi: false,
    piscina: false,
    animazione: false,
    market: false,
    ristorante: false,
  });

  const handleCheckboxChange = (option) => {
    setFilterOptions((prevOptions) => ({
      ...prevOptions,
      [option]: !prevOptions[option],
    }));
  };
  useEffect(() => {
    dispatch(addFilter(filterOptions));
  }, [filterOptions]);

  const handleSearch = () => {
    navigate("/campeggiCercati");
  };

  const handleInputChange = (event) => {
    setIndirizzo(event.target.value);
  };

  const getPost = async (e) => {
    const rispPost = await fetch("http://localhost:3001/users/post", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (rispPost.ok) {
      const post = await rispPost.json();

      setPost(post);
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    dispatch(removeIndirizzo(""));
  }, []);
  return (
    <div className="Home mt-5">
      <NavBar />
      <Container>
        <Form className="d-flex w-50 mx-auto my-5" onSubmit={handleSubmit}>
          <Form.Control
            type="search"
            placeholder="Dove vorresti andare?"
            className="me-2"
            aria-label="Search"
            value={indirizzo}
            onChange={handleInputChange}
          />
          <Button variant="outline-success" type="submit" className="buttonCerca">
            Cerca
          </Button>
        </Form>
        <Row className="justify-content-between">
          <Col xs={4} sm={3} md={3}>
            <Row className="justify-content-column align-items-center ">
              <Form>
                <Row className="mb-3">
                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      label="animazione"
                      checked={filterOptions.animazione}
                      onChange={() => handleCheckboxChange("animazione")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      label="Market"
                      checked={filterOptions.market}
                      onChange={() => handleCheckboxChange("market")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      label="Piscina"
                      checked={filterOptions.piscina}
                      onChange={() => handleCheckboxChange("piscina")}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      label="Wifi"
                      checked={filterOptions.wifi}
                      onChange={() => handleCheckboxChange("wifi")}
                    />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      label="Animali"
                      checked={filterOptions.animaliAmmessi}
                      onChange={() => handleCheckboxChange("animaliAmmessi")}
                    />
                  </Form.Group>
                  <Form.Group as={Col}>
                    <Form.Check
                      type="checkbox"
                      label="Ristorante"
                      checked={filterOptions.ristorante}
                      onChange={() => handleCheckboxChange("ristorante")}
                    />
                  </Form.Group>
                </Row>

                <Button variant="primary" onClick={handleSearch}>
                  Cerca
                </Button>
              </Form>
            </Row>
          </Col>
          <Col xs={10} sm={10} md={8} lg={8}>
            <Row className="cardHome justify-content-center mx-2">
              {post ? (
                post.content.map((post) => {
                  return (
                    <Col key={post.id} className="my-4 " xs={12} sm={10} md={10} lg={6}>
                      <Card>
                        {" "}
                        <Col md={12}>
                          {" "}
                          <CardBody>
                            <Row className="align-items-center ">
                              <Col xs={2} sm={2} md={2}>
                                <a href="/profile">
                                  <Image
                                    src={
                                      post.userPost.imgProfilo && post.userPost.imgProfilo !== 0
                                        ? post.userPost.imgProfilo
                                        : "data:image/png;base64,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"
                                    }
                                    alt="image profile"
                                    roundedCircle
                                    style={{ width: "40px", height: "40px" }}
                                  />
                                </a>
                              </Col>
                              <Col>
                                <h5>
                                  {post.userPost.nome} {post.userPost.cognome}
                                </h5>
                              </Col>
                            </Row>

                            <Card.Text
                              className="mt-1"
                              style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                            >
                              {post.testo}
                            </Card.Text>
                            <Row>
                              <Card.Img
                                src={post.foto}
                                className="w-100 mx-auto clickable  "
                                id="fotoPost"
                                alt="Post"
                              />
                            </Row>
                            <CardText className="mt-1">{post.dataPubblicazione}</CardText>
                          </CardBody>{" "}
                        </Col>{" "}
                      </Card>{" "}
                    </Col>
                  );
                })
              ) : (
                <p>nessun post presente</p>
              )}
            </Row>
          </Col>{" "}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
