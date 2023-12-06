import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFavorite, removeFavorite } from "../redux/action";

const Campeggi = () => {
  const token = useSelector((state) => state.login.token);
  const [contenuto, setContenuto] = useState();

  const preferiti = useSelector((state) => state.favorite.preferiti);
  const dispatch = useDispatch();

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const handleClick = (campeggio) => {
    if (isButtonClicked) {
      dispatch(removeFavorite(campeggio));
    } else {
      dispatch(addFavorite(campeggio));
    }
    setIsButtonClicked(!isButtonClicked);
  };

  console.log(preferiti);

  const tuttiCampeggi = async () => {
    const risp = await fetch("http://localhost:3001/campeggi", {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (risp.ok) {
      const data = await risp.json();
      setContenuto(data.content);
      console.log(data);
    }
  };
  useEffect(() => {
    tuttiCampeggi();
  }, []);

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          {contenuto ? (
            contenuto.map((elem) => {
              return (
                <Col
                  sm={6}
                  md={4}
                  lg={3}
                  className="w-25
              "
                >
                  <Card>
                    <Card.Img variant="top" src={elem.logo} className="position-relative" />
                    <Button
                      type="submit"
                      onClick={() => handleClick(elem)}
                      className={`position-absolute top-0 start-0 ${isButtonClicked ? "bg-danger" : "bg-secondary"}`}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        class="bi bi-heart"
                        viewBox="0 0 16 16"
                      >
                        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"></path>
                      </svg>
                      <span class="visually-hidden">Button</span>
                    </Button>
                    <Card.Body>
                      <Card.Text>
                        <h3>
                          {" "}
                          {elem.nome}
                          <br />{" "}
                        </h3>
                      </Card.Text>
                      <Card.Text>
                        Indirizzo:{elem.indirizzo} <br />
                      </Card.Text>
                      <Card.Text>
                        Posti disponi: <br /> {elem.postiDisp}
                      </Card.Text>
                      <Card.Text>
                        Email: <br /> {elem.email}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>nessun cliente</p>
          )}
        </Row>
      </Container>
    </>
  );
};
export default Campeggi;
