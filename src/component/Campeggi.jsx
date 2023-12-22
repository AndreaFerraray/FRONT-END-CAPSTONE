import { Button, Card, CardText, Col, Container, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addFavorite, addFavoriteButton, getCampeggio, removeFavorite, removeFavoriteButton } from "../redux/action";
import { useNavigate } from "react-router-dom";

const Campeggi = () => {
  const token = useSelector((state) => state.login.token);
  const [contenuto, setContenuto] = useState();
  const navigate = useNavigate();
  const preferiti = useSelector((state) => state.login.user?.campeggioPreferito);
  const isButtonClick = useSelector((state) => state.login.user.campeggioPreferito.map((item) => item.id));
  // const [isButtonClick, setIsButtonClick] = useState({});
  const dispatch = useDispatch();

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
    // console.log(isFavorite);
  };
  console.log(isFavoriteList);
  console.log(contenuto);
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
    }
  };
  useEffect(() => {
    tuttiCampeggi();
  }, []);

  return (
    <div className="Home mt-5">
      <NavBar />
      <Container className="mt-5">
        <Row className="mx-auto">
          {contenuto ? (
            contenuto.map((elem) => {
              return (
                <Col sm={6} md={6} lg={4} className="mt-4">
                  <Card>
                    <Button
                      className="position-relative buttonCampeggio "
                      type="submit"
                      onClick={() => clickCampeggio(elem.id)}
                    >
                      <Card.Img
                        className="w-100"
                        variant="top"
                        src={
                          elem.foto.length > 0
                            ? elem.foto[0].foto
                            : "data:image/png;base64,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"
                        }
                      />
                      <Button
                        type="submit"
                        onClick={() => handleClick(elem.id)}
                        className={`favoriteButton position-absolute top-0 start-0  ${
                          isFavoriteList[elem.id] ? "favoriteButtonTrue " : "favoriteButton"
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
                        <CardText>
                          {Array.from({ length: elem.stelle }, (_, index) => (
                            <svg
                              key={index}
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              className="bi bi-star-fill"
                              viewBox="0 0 16 16"
                            >
                              <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
                            </svg>
                          ))}
                        </CardText>

                        <Card.Text
                          className="mb-2"
                          style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-geo-alt-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                          </svg>
                          {elem.indirizzo}
                        </Card.Text>

                        <Card.Text className="mb-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            class="bi bi-envelope-at-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M2 2A2 2 0 0 0 .05 3.555L8 8.414l7.95-4.859A2 2 0 0 0 14 2zm-2 9.8V4.698l5.803 3.546L0 11.801Zm6.761-2.97-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 9.671V4.697l-5.803 3.546.338.208A4.482 4.482 0 0 1 12.5 8c1.414 0 2.675.652 3.5 1.671" />
                            <path d="M15.834 12.244c0 1.168-.577 2.025-1.587 2.025-.503 0-1.002-.228-1.12-.648h-.043c-.118.416-.543.643-1.015.643-.77 0-1.259-.542-1.259-1.434v-.529c0-.844.481-1.4 1.26-1.4.585 0 .87.333.953.63h.03v-.568h.905v2.19c0 .272.18.42.411.42.315 0 .639-.415.639-1.39v-.118c0-1.277-.95-2.326-2.484-2.326h-.04c-1.582 0-2.64 1.067-2.64 2.724v.157c0 1.867 1.237 2.654 2.57 2.654h.045c.507 0 .935-.07 1.18-.18v.731c-.219.1-.643.175-1.237.175h-.044C10.438 16 9 14.82 9 12.646v-.214C9 10.36 10.421 9 12.485 9h.035c2.12 0 3.314 1.43 3.314 3.034zm-4.04.21v.227c0 .586.227.8.581.8.31 0 .564-.17.564-.743v-.367c0-.516-.275-.708-.572-.708-.346 0-.573.245-.573.791Z" />
                          </svg>{" "}
                          {elem.email}
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
    </div>
  );
};
export default Campeggi;
