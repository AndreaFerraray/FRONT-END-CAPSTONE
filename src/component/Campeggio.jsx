import { Button, Card, CardHeader, CardImg, Col, Container, Form, Image, Row } from "react-bootstrap";
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
  const dispatch = useDispatch();
  console.log(campeggio);
  useEffect(() => {});

  const images = useSelector((state) => state.campeggio.campeggio?.immagini || []);
  const [foto, setFoto] = useState(null);
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const caricaFile = (event) => {
    const foto = event.target.files[0];
    setFoto(foto);
  };

  const caricaFoto = async (e) => {
    e.preventDefault();
    const datiPost = new FormData();
    datiPost.append("foto", foto);
    datiPost.append("idCampeggio", campeggio.id);
    console.log(campeggio.id);
    const rispPost = await fetch("http://localhost:3001/fotoCampeggio", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: datiPost,
    });
    if (rispPost.ok) {
      const campeggio = await rispPost.json();
      dispatch(addCampeggio(campeggio));
    }
  };

  return (
    <>
      <NavBar />
      <Row className="mx-auto justify-content-center">
        <Row className=" w-75 mt-3 mx-auto ">
          <h2>{campeggio.nome}</h2>
          <Col>
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
            {campeggio.indirizzo}
          </Col>

          <Col>
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
            {campeggio.email}
          </Col>

          <Col>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-telephone-fill"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"
              />
            </svg>
            {campeggio.numeroTelefono}
          </Col>
        </Row>
        <Row>
          {campeggio.foto && campeggio.foto.length > 0 ? (
            <Carousel className="my-5">
              {campeggio.foto.map((fotoObj, index) => (
                <Carousel.Item className="justify-content-center" key={index}>
                  <Image
                    src={fotoObj.foto}
                    className="d-block w-100"
                    style={{ maxWidth: "600px", height: "400px", margin: "auto" }}
                    alt={`Slide ${index + 1}`}
                  />
                </Carousel.Item>
              ))}
            </Carousel>
          ) : (
            <p>Non ci sono immagini disponibili per questo campeggio.</p>
          )}
        </Row>
        <Row>
          <Col>
            <Row className=" my-2 " xs={12} sm={12} md={8} lg={3}>
              <Col>
                <Card>
                  <Form className="d-none" onSubmit={caricaFoto}>
                    <Col>
                      <Form.Group className="mb-3">
                        <Form.Control type="file" name="foto" onChange={caricaFile} />
                      </Form.Group>
                    </Col>
                    <Button className="buttonCondividi" type="submit ">
                      aggiungi
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>{" "}
          </Col>
        </Row>
        <Row>
          <Col>Descrizione: {campeggio.descrizione}</Col>
        </Row>{" "}
        <Row className="my-4 justify-content-between">
          <Col xs={12} sm={12} md={8} lg={3}>
            <Card className="cardCampInfo">Cani : {campeggio.caniAmmessi ? "ammessi" : " non ammessi"}</Card>
          </Col>
          <Col xs={12} sm={12} md={8} lg={3}>
            <Card className="cardCampInfo">Piscina: {campeggio.piscina ? "si" : "no"}</Card>
          </Col>

          <Col xs={12} sm={12} md={8} lg={3}>
            <Card className="cardCampInfo">
              {campeggio.market ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-shop mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M2.97 1.35A1 1 0 0 1 3.73 1h8.54a1 1 0 0 1 .76.35l2.609 3.044A1.5 1.5 0 0 1 16 5.37v.255a2.375 2.375 0 0 1-4.25 1.458A2.371 2.371 0 0 1 9.875 8 2.37 2.37 0 0 1 8 7.083 2.37 2.37 0 0 1 6.125 8a2.37 2.37 0 0 1-1.875-.917A2.375 2.375 0 0 1 0 5.625V5.37a1.5 1.5 0 0 1 .361-.976l2.61-3.045zm1.78 4.275a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0 1.375 1.375 0 1 0 2.75 0V5.37a.5.5 0 0 0-.12-.325L12.27 2H3.73L1.12 5.045A.5.5 0 0 0 1 5.37v.255a1.375 1.375 0 0 0 2.75 0 .5.5 0 0 1 1 0M1.5 8.5A.5.5 0 0 1 2 9v6h1v-5a1 1 0 0 1 1-1h3a1 1 0 0 1 1 1v5h6V9a.5.5 0 0 1 1 0v6h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1V9a.5.5 0 0 1 .5-.5M4 15h3v-5H4zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1zm3 0h-2v3h2z" />
                </svg>
              ) : (
                "no"
              )}
            </Card>
          </Col>

          <Col xs={12} sm={12} md={8} lg={3}>
            {" "}
            <Card className="cardCampInfo">Ristorante: {campeggio.ristorante ? "si" : "no"}</Card>
          </Col>
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
      </Row>
    </>
  );
};
export default Campeggio;
