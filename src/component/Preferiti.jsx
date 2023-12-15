import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addBooking, getCampeggio } from "../redux/action";
import { useNavigate } from "react-router-dom";

const Preferiti = () => {
  const token = useSelector((state) => state.login.token);

  const preferiti = useSelector((state) => state.login.user?.campeggioPreferito || []);
  const isButtonCick = useSelector((state) => state.login.isButtonClicked);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const clickCampeggio = (campeggioId) => {
    dispatch(getCampeggio(campeggioId, token));
    console.log(campeggioId);
    navigate("/campeggio");
  };
  // OTTENGO I PREFERITI DELL'UTENTE

  //++++++++++++++++++++ RENDERIZZO ++++++++++++++
  return (
    <>
      <NavBar />
      <Container>
        <Row>
          {preferiti.length > 0 ? (
            preferiti.map((elem) => {
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
                      {" "}
                      <Card.Img variant="top" src={elem.logo} className="position-relative" />
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
            <p>NESSUN PREFERITO AL MOMENTO</p>
          )}
        </Row>
      </Container>
    </>
  );
};
export default Preferiti;
