import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Navbar";
import { Button, Card, CardBody, CardImg, CardImgOverlay, Col, Container, Image, Row } from "react-bootstrap";
import { useState } from "react";
import { addUser, getCampeggio } from "../redux/action";
import { useNavigate } from "react-router-dom";

const Prenotazioni = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.login.token);
  const prenotazioni = useSelector((state) => state.login.user.prenotazioni);
  const dispatch = useDispatch();
  console.log(prenotazioni);

  const deleteBooking = async (prenotazioneId) => {
    const risp = await fetch(`http://localhost:3001/prenotazioni/deleteOneBooking/me/${prenotazioneId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const user = await risp.json();
    if (risp.ok) {
      dispatch(addUser(user));
    }
  };

  const clickCampeggio = (campeggioId) => {
    dispatch(getCampeggio(campeggioId, token));
    console.log(campeggioId);
    navigate("/campeggio");
  };

  return (
    <div className="Home mt-5">
      <NavBar />
      <Container className="mx-auto mt-5 justify-content-center">
        <Row>
          {prenotazioni ? (
            prenotazioni.map((prenotazione) => {
              return (
                <Col sm={6} md={6} lg={4} key={prenotazione.id}>
                  <Card>
                    <CardBody>
                      <Button
                        className="position-relative buttonCampeggio "
                        type="submit"
                        onClick={() => clickCampeggio(prenotazione.campeggio.id)}
                      >
                        <CardImg src={prenotazione.campeggio.foto[0].foto}></CardImg>
                      </Button>
                      <Card.Text className="mt-2">
                        <h5> {prenotazione.campeggio.nome}</h5>
                      </Card.Text>
                      <Card.Text>
                        <p>
                          {" "}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-person-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                          </svg>{" "}
                          {prenotazione.ospiti}
                        </p>
                      </Card.Text>
                      <Card.Text>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          fill="currentColor"
                          class="bi bi-house-gear-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M7.293 1.5a1 1 0 0 1 1.414 0L11 3.793V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v3.293l2.354 2.353a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708z" />
                          <path d="M11.07 9.047a1.5 1.5 0 0 0-1.742.26l-.02.021a1.5 1.5 0 0 0-.261 1.742 1.5 1.5 0 0 0 0 2.86 1.504 1.504 0 0 0-.12 1.07H3.5A1.5 1.5 0 0 1 2 13.5V9.293l6-6 4.724 4.724a1.5 1.5 0 0 0-1.654 1.03Z" />
                          <path d="m13.158 9.608-.043-.148c-.181-.613-1.049-.613-1.23 0l-.043.148a.64.64 0 0 1-.921.382l-.136-.074c-.561-.306-1.175.308-.87.869l.075.136a.64.64 0 0 1-.382.92l-.148.045c-.613.18-.613 1.048 0 1.229l.148.043a.64.64 0 0 1 .382.921l-.074.136c-.306.561.308 1.175.869.87l.136-.075a.64.64 0 0 1 .92.382l.045.149c.18.612 1.048.612 1.229 0l.043-.15a.64.64 0 0 1 .921-.38l.136.074c.561.305 1.175-.309.87-.87l-.075-.136a.64.64 0 0 1 .382-.92l.149-.044c.612-.181.612-1.049 0-1.23l-.15-.043a.64.64 0 0 1-.38-.921l.074-.136c.305-.561-.309-1.175-.87-.87l-.136.075a.64.64 0 0 1-.92-.382ZM12.5 14a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                        </svg>
                        <span> </span>
                        {prenotazione.tipoSistemazione.nomeSistemazione}
                      </Card.Text>
                      <Card.Text>
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-calendar-check"
                            viewBox="0 0 16 16"
                          >
                            <path d="M10.854 7.146a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7.5 9.793l2.646-2.647a.5.5 0 0 1 .708 0z" />
                            <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z" />
                          </svg>
                          <span> </span>
                          {prenotazione.data_check_in}
                        </p>
                      </Card.Text>
                      <Card.Text>
                        <p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="currentColor"
                            class="bi bi-calendar-x-fill"
                            viewBox="0 0 16 16"
                          >
                            <path d="M4 .5a.5.5 0 0 0-1 0V1H2a2 2 0 0 0-2 2v1h16V3a2 2 0 0 0-2-2h-1V.5a.5.5 0 0 0-1 0V1H4zM16 14V5H0v9a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2M6.854 8.146 8 9.293l1.146-1.147a.5.5 0 1 1 .708.708L8.707 10l1.147 1.146a.5.5 0 0 1-.708.708L8 10.707l-1.146 1.147a.5.5 0 0 1-.708-.708L7.293 10 6.146 8.854a.5.5 0 1 1 .708-.708z" />
                          </svg>
                          <span> </span>
                          {prenotazione.data_check_out}
                        </p>
                      </Card.Text>
                      <Card.Text>
                        <p>Costo totale: {prenotazione.costoTotale}€</p>
                      </Card.Text>
                      <Button
                        className="favoriteButton w-50 position-relative"
                        type="submit"
                        onClick={() => deleteBooking(prenotazione.id)}
                      >
                        {" "}
                        Cancella
                      </Button>{" "}
                    </CardBody>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>Nessuna prenotazione</p>
          )}
        </Row>
      </Container>
    </div>
  );
};
export default Prenotazioni;
