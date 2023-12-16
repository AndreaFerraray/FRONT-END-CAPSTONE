import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Navbar";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { addFavorite, addFavoriteButton, getCampeggio, removeFavorite, removeFavoriteButton } from "../redux/action";
import { useNavigate } from "react-router-dom";

const CampeggiCercati = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const indirizzo = useSelector((state) => state.campeggio.indirizzoCercato);
  console.log(indirizzo);
  const [contenuto, setContenuto] = useState();
  const preferiti = useSelector((state) => state.login.user?.campeggioPreferito);
  const isButtonClick = useSelector((state) => state.login.user.campeggioPreferito.map((item) => item.id));

  const campeggiCercati = async (event) => {
    const risp = await fetch(`http://localhost:3001/campeggi/cerca/${indirizzo}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const contenuto = await risp.json();
    if (risp.ok) {
      setContenuto(contenuto);
    } else {
      console.error("Errore nella risposta del server");
    }
  };

  const [isFavoriteList, setIsFavoriteList] = useState(() => {
    const initialFavorites = {};
    preferiti.forEach((item) => {
      initialFavorites[item.id] = true;
    });
    return initialFavorites;
  });

  const clickCampeggio = (campeggioId) => {
    dispatch(getCampeggio(campeggioId, token));
    console.log(campeggioId);
    navigate("/campeggio");
  };

  const handleClick = (campeggio) => {
    const updatedFavorites = { ...isFavoriteList };
    console.log(isFavoriteList);
    const isFavorite = isButtonClick.includes(campeggio);
    updatedFavorites[campeggio] = isFavorite;
    setIsFavoriteList(updatedFavorites);
    if (isFavorite === true) {
      dispatch(removeFavorite(campeggio, token));
      dispatch(removeFavoriteButton());
    } else {
      dispatch(addFavorite(campeggio, token));
      dispatch(addFavoriteButton());
    }
    updatedFavorites[campeggio] = !isFavorite;
  };

  useEffect(() => {
    campeggiCercati();
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
                    <Button
                      className="position-relative buttonCampeggio"
                      type="submit"
                      onClick={() => clickCampeggio(elem.id)}
                    >
                      <Card.Img variant="top" src={elem.immagini} />
                      <Button
                        type="submit"
                        onClick={() => handleClick(elem.id)}
                        className={`position-absolute top-0 start-0  ${
                          isFavoriteList[elem.id] ? "bg-danger" : "bg-secondary"
                        }`}
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
                    </Button>
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

export default CampeggiCercati;
