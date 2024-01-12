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
    <div className="Home mt-5 containerHome">
      <NavBar />
      <Row className="mx-auto mt-5 mb-5 justify-content-center">
        <Row className=" w-75 mt-3 mx-auto ">
          <h2>{campeggio.nome}</h2>
          <Col sm={6} md={6} lg={4}>
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

          <Col sm={6} md={6} lg={4}>
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
            </svg>
            {campeggio.email}
          </Col>

          <Col sm={6} md={6} lg={4}>
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
        <Row className="justify-content-center">
          {campeggio.foto && campeggio.foto.length > 0 ? (
            <Carousel className="my-5 w-75">
              {campeggio.foto.map((fotoObj, index) => (
                <Carousel.Item className="justify-content-center" key={index}>
                  <Image
                    src={
                      fotoObj.foto.length > 0
                        ? fotoObj.foto
                        : "data:image/png;base64,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"
                    }
                    className="d-block w-100 fotoCarosello"
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
          <Col>Descrizione: {campeggio.descrizione}</Col>
        </Row>{" "}
        <Row className="my-4 mx-auto justify-content-center align-items-center ">
          <Col xs={12} sm={3} md={6} lg={4}>
            <Card className="cardCampInfo my-2">Cani : {campeggio.caniAmmessi ? "si" : " no"}</Card>
          </Col>
          <Col xs={12} sm={3} md={6} lg={4}>
            <Card className="cardCampInfo">Piscina: {campeggio.piscina ? "si" : "no"}</Card>
          </Col>

          <Col xs={12} sm={3} md={6} lg={4}>
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
          <Col xs={12} sm={3} md={6} lg={4}>
            <Card className="cardCampInfo">
              {campeggio.wifi ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-wifi mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M15.384 6.115a.485.485 0 0 0-.047-.736A12.444 12.444 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c2.507 0 4.827.802 6.716 2.164.205.148.49.13.668-.049z" />
                  <path d="M13.229 8.271a.482.482 0 0 0-.063-.745A9.455 9.455 0 0 0 8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065A8.46 8.46 0 0 1 8 7a8.46 8.46 0 0 1 4.576 1.336c.206.132.48.108.653-.065zm-2.183 2.183c.226-.226.185-.605-.1-.75A6.473 6.473 0 0 0 8 9c-1.06 0-2.062.254-2.946.704-.285.145-.326.524-.1.75l.015.015c.16.16.407.19.611.09A5.478 5.478 0 0 1 8 10c.868 0 1.69.201 2.42.56.203.1.45.07.61-.091zM9.06 12.44c.196-.196.198-.52-.04-.66A1.99 1.99 0 0 0 8 11.5a1.99 1.99 0 0 0-1.02.28c-.238.14-.236.464-.04.66l.706.706a.5.5 0 0 0 .707 0l.707-.707z" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  class="bi bi-wifi-off mx-auto"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.706 3.294A12.545 12.545 0 0 0 8 3C5.259 3 2.723 3.882.663 5.379a.485.485 0 0 0-.048.736.518.518 0 0 0 .668.05A11.448 11.448 0 0 1 8 4c.63 0 1.249.05 1.852.148l.854-.854zM8 6c-1.905 0-3.68.56-5.166 1.526a.48.48 0 0 0-.063.745.525.525 0 0 0 .652.065 8.448 8.448 0 0 1 3.51-1.27zm2.596 1.404.785-.785c.63.24 1.227.545 1.785.907a.482.482 0 0 1 .063.745.525.525 0 0 1-.652.065 8.462 8.462 0 0 0-1.98-.932zM8 10l.933-.933a6.455 6.455 0 0 1 2.013.637c.285.145.326.524.1.75l-.015.015a.532.532 0 0 1-.611.09A5.478 5.478 0 0 0 8 10m4.905-4.905.747-.747c.59.3 1.153.645 1.685 1.03a.485.485 0 0 1 .047.737.518.518 0 0 1-.668.05 11.493 11.493 0 0 0-1.811-1.07zM9.02 11.78c.238.14.236.464.04.66l-.707.706a.5.5 0 0 1-.707 0l-.707-.707c-.195-.195-.197-.518.04-.66A1.99 1.99 0 0 1 8 11.5c.374 0 .723.102 1.021.28zm4.355-9.905a.53.53 0 0 1 .75.75l-10.75 10.75a.53.53 0 0 1-.75-.75z" />
                </svg>
              )}
            </Card>
          </Col>

          <Col xs={12} sm={3} md={6} lg={4}>
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
    </div>
  );
};
export default Campeggio;
