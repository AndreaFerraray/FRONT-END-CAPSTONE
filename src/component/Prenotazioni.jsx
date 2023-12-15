import { useDispatch, useSelector } from "react-redux";
import NavBar from "./Navbar";
import { Button, Card, CardBody, Col, Container, Row } from "react-bootstrap";
import { useState } from "react";
import { addUser } from "../redux/action";

const Prenotazioni = () => {
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

  return (
    <>
      <NavBar />
      <Container>
        <Row>
          {prenotazioni ? (
            prenotazioni.map((prenotazione) => {
              return (
                <Col sm={6} md={4} lg={3} key={prenotazione.id}>
                  <Card>
                    <CardBody>
                      <Card.Text>
                        <p> {prenotazione.campeggio.nome}</p>
                      </Card.Text>
                      <Card.Text>
                        <p> persone: {prenotazione.ospiti}</p>
                      </Card.Text>
                      <Card.Text>
                        <p> {prenotazione.tipoSistemazione.nomeSistemazione}</p>
                      </Card.Text>
                      <Card.Text>
                        <p>Check-in: {prenotazione.data_check_in}</p>
                      </Card.Text>
                      <Card.Text>
                        <p>Check-out: {prenotazione.data_check_out}</p>
                      </Card.Text>
                    </CardBody>
                    <Button type="submit" onClick={() => deleteBooking(prenotazione.id)}></Button>
                  </Card>
                </Col>
              );
            })
          ) : (
            <p>Nessuna prenotazione</p>
          )}
        </Row>
      </Container>
    </>
  );
};
export default Prenotazioni;
