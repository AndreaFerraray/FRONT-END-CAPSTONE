import { Button, Card, Col, Container, Row } from "react-bootstrap";
import NavBar from "./Navbar";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addCampeggio } from "../redux/action";
import Map from "./Map";
import Carousel from "react-bootstrap/Carousel";
import TabellaPrenotazione from "./TabellaPrenotazione";
import TipoSistemazione from "./TipoSistemazione";

const Campeggio = () => {
  const token = useSelector((state) => state.login.token);
  const campeggio = useSelector((state) => state.campeggio.campeggio);

  console.log(campeggio);
  useEffect(() => {});

  const images = useSelector((state) => state.campeggio.campeggio?.immagini || []);

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <>
      <NavBar />

      <Container>
        <Row>
          {/* <Col>
            <Carousel activeIndex={index} onSelect={handleSelect} className="w-100 ">
              {images.map((image, idx) => (
                <Carousel.Item key={idx}>
                  <img className="d-block w-100" src={image} alt={`Slide ${idx}`} />
                </Carousel.Item>
              ))}
            </Carousel>{" "}
          </Col> */}
        </Row>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Card.Text>Indirizzo :{campeggio.indirizzo}</Card.Text>
                <Card.Text>Email : {campeggio.email}</Card.Text>
                <Card.Text>Descrizione: {campeggio.descrizione}</Card.Text>
                <Card.Text>Numero di telefono: {campeggio.numeroTelefono}</Card.Text>
                <Card.Text>Cani : {campeggio.caniAmmessi ? "ammessi" : " non ammessi"}</Card.Text>
                <Card.Text>
                  <Card.Text>Piscina: {campeggio.piscina ? "si" : "no"}</Card.Text>
                </Card.Text>
                <Card.Text>
                  <Card.Text>Market: {campeggio.market ? "si" : "no"}</Card.Text>
                </Card.Text>
                <Card.Text>
                  <Card.Text>Ristorante: {campeggio.ristorante ? "si" : "no"}</Card.Text>
                </Card.Text>{" "}
                <Card.Text>
                  <Card.Text>Ristorante: {campeggio.ristorante ? "si" : "no"}</Card.Text>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>{" "}
        </Row>
        <Col>
          <TabellaPrenotazione></TabellaPrenotazione>
        </Col>

        <Row>
          <Col>
            {" "}
            <Map></Map>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default Campeggio;
