import React, { useEffect, useState } from "react";
import { Form, Button, FormGroup, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBooking, addUser } from "../redux/action";

const TabellaPrenotazione = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.login.token);
  const campeggio = useSelector((state) => state.campeggio.campeggio);
  const campeggioId = campeggio.id;

  const currentDate = new Date().toISOString().split("T")[0];

  const [cani, setCani] = useState(false);

  const handleSwitchChange = async () => {
    console.log("Stato attuale di 'cani':", cani);
    setCani(!cani);
  };

  const [sistemazione, setSistemazione] = useState();
  console.log(sistemazione);
  const sistemazioni = async () => {
    const risp = await fetch(`http://localhost:3001/sistemazioni/${campeggioId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "Application/json",
      },
    });
    console.log(campeggioId);
    if (risp.ok) {
      const data = await risp.json();
      setSistemazione(data);
    } else {
      console.error("Errore nella risposta del server");
    }
  };

  const [selezionate, setSelezionate] = useState([]);

  const handleSwitchChangeSelected = (id) => {
    if (selezionate.includes(id)) {
      setSelezionate(selezionate.filter((item) => item !== id));
    } else {
      setSelezionate([id]);
    }
  };

  useEffect(() => {
    sistemazioni();
  }, []);

  const handleSubmit = async (event) => {
    if (sistemazione != 0) event.preventDefault();
    const data = new FormData(event.currentTarget);
    const risp = await fetch("http://localhost:3001/prenotazioni/addBooking/me", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },

      body: JSON.stringify({
        campeggioId: campeggioId,
        dataPrenotazione: currentDate,
        data_check_in: data.get("data_check_in"),
        data_check_out: data.get("data_check_out"),
        ospiti: parseInt(data.get("ospiti")),
        cani: cani,
        tipoSistemazioneId: sistemazione[0].id,
      }),
    });

    const userBooking = await risp.json();
    const rispCampeggio = await fetch(`http://localhost:3001/campeggi/${campeggioId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + token,
        "content-type": "application/json",
      },
    });
    const campBooking = await rispCampeggio.json();

    if (risp.ok) {
      console.log(userBooking);
      dispatch(addUser(userBooking));
      dispatch(addBooking(campBooking));
      navigate("/prenotazioni");
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Data di check-in:</Form.Label>
        <Form.Control type="date" name="data_check_in" id="data_check_in" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Data di check-out:</Form.Label>
        <Form.Control type="date" name="data_check_out" id="data_check_out" />
      </Form.Group>

      <Form.Group>
        <Form.Label>Numero di ospiti:</Form.Label>
        <Form.Control type="number" min="0" max="4" name="ospiti" id="ospiti" />
      </Form.Group>
      <FormGroup>
        <Form.Check type="switch" id="cani" label="cani" onChange={handleSwitchChange} checked={cani} />
      </FormGroup>
      <Button variant="primary" type="submit">
        Invia
      </Button>
      <>
        {sistemazione ? (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Sistemazione</th>
                <th>Persone ammesse</th>
                <th>Prezzo/notte</th>
                <th>Seleziona</th>
              </tr>
            </thead>
            <tbody>
              {sistemazione.map((elem) => (
                <tr key={elem.id}>
                  <td>
                    <h6 className="text-success">{elem.nomeSistemazione} </h6>

                    {elem.areaCondizionata ? (
                      <p>
                        area condizionata &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-wind"
                          viewBox="0 0 16 16"
                        >
                          <path d="M12.5 2A2.5 2.5 0 0 0 10 4.5a.5.5 0 0 1-1 0A3.5 3.5 0 1 1 12.5 8H.5a.5.5 0 0 1 0-1h12a2.5 2.5 0 0 0 0-5m-7 1a1 1 0 0 0-1 1 .5.5 0 0 1-1 0 2 2 0 1 1 2 2h-5a.5.5 0 0 1 0-1h5a1 1 0 0 0 0-2M0 9.5A.5.5 0 0 1 .5 9h10.042a3 3 0 1 1-3 3 .5.5 0 0 1 1 0 2 2 0 1 0 2-2H.5a.5.5 0 0 1-.5-.5" />
                        </svg>
                      </p>
                    ) : (
                      <p> area condizionata non presente</p>
                    )}
                    {elem.bagnoPrivato ? (
                      <p>
                        bagno privato &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-badge-wc"
                          viewBox="0 0 16 16"
                        >
                          <path d="M10.348 7.643c0-1.112.488-1.754 1.318-1.754.682 0 1.139.47 1.187 1.108H14v-.11c-.053-1.187-1.024-2-2.342-2-1.604 0-2.518 1.05-2.518 2.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727v-.742zM4.457 11l1.02-4.184h.045L6.542 11h1.006L9 5.001H7.818l-.82 4.355h-.056L5.97 5.001h-.94l-.972 4.355h-.053l-.827-4.355H2L3.452 11z" />
                          <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z" />
                        </svg>
                      </p>
                    ) : (
                      <p> </p>
                    )}

                    {elem.correnteElettrica ? (
                      <p>
                        corrente 12A &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-lightning-charge-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M11.251.068a.5.5 0 0 1 .227.58L9.677 6.5H13a.5.5 0 0 1 .364.843l-8 8.5a.5.5 0 0 1-.842-.49L6.323 9.5H3a.5.5 0 0 1-.364-.843l8-8.5a.5.5 0 0 1 .615-.09z" />
                        </svg>
                      </p>
                    ) : (
                      <p> </p>
                    )}

                    {elem.frigo ? (
                      <p>
                        frigorifero &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-snow3"
                          viewBox="0 0 16 16"
                        >
                          <path d="M8 7.5a.5.5 0 1 0 0 1 .5.5 0 0 0 0-1" />
                          <path d="M8 16a.5.5 0 0 1-.5-.5v-1.293l-.646.647a.5.5 0 0 1-.707-.708L7.5 12.793v-1.51l-2.053-1.232-1.348.778-.495 1.85a.5.5 0 1 1-.966-.26l.237-.882-1.12.646a.5.5 0 0 1-.5-.866l1.12-.646-.883-.237a.5.5 0 1 1 .258-.966l1.85.495L5 9.155v-2.31l-1.4-.808-1.85.495a.5.5 0 1 1-.259-.966l.884-.237-1.12-.646a.5.5 0 0 1 .5-.866l1.12.646-.237-.883a.5.5 0 1 1 .966-.258l.495 1.849 1.348.778L7.5 4.717v-1.51L6.147 1.854a.5.5 0 1 1 .707-.708l.646.647V.5a.5.5 0 0 1 1 0v1.293l.647-.647a.5.5 0 1 1 .707.708L8.5 3.207v1.51l2.053 1.232 1.348-.778.495-1.85a.5.5 0 1 1 .966.26l-.236.882 1.12-.646a.5.5 0 0 1 .5.866l-1.12.646.883.237a.5.5 0 1 1-.26.966l-1.848-.495-1.4.808v2.31l1.4.808 1.849-.495a.5.5 0 1 1 .259.966l-.883.237 1.12.646a.5.5 0 0 1-.5.866l-1.12-.646.236.883a.5.5 0 1 1-.966.258l-.495-1.849-1.348-.778L8.5 11.283v1.51l1.354 1.353a.5.5 0 0 1-.707.708l-.647-.647V15.5a.5.5 0 0 1-.5.5zm2-6.783V6.783l-2-1.2-2 1.2v2.434l2 1.2z" />
                        </svg>
                      </p>
                    ) : (
                      <p> </p>
                    )}

                    {elem.lavanderia ? (
                      <p>
                        lavanderia &nbsp;
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-water"
                          viewBox="0 0 16 16"
                        >
                          <path d="M.036 3.314a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 3.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 6.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0L.314 9.964a.5.5 0 0 1-.278-.65zm0 3a.5.5 0 0 1 .65-.278l1.757.703a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.014-.406a2.5 2.5 0 0 1 1.857 0l1.015.406a1.5 1.5 0 0 0 1.114 0l1.757-.703a.5.5 0 1 1 .372.928l-1.758.703a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.014-.406a1.5 1.5 0 0 0-1.114 0l-1.015.406a2.5 2.5 0 0 1-1.857 0l-1.757-.703a.5.5 0 0 1-.278-.65z" />
                        </svg>
                      </p>
                    ) : (
                      <p> </p>
                    )}
                  </td>

                  <td>
                    <Row className="align-items-centre">
                      <Col>
                        {elem.personeAmmesse}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-person-fill"
                          viewBox="0 0 16 16"
                        >
                          <path d="M3 14s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zm5-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6" />
                        </svg>
                      </Col>
                    </Row>
                  </td>
                  <td>{elem.prezzoNotte}€/notte</td>
                  <td>
                    <Form.Check
                      type="switch"
                      id={`switch-${elem.id}`}
                      label="seleziona"
                      onChange={() => handleSwitchChangeSelected(elem.id)}
                      checked={selezionate.includes(elem.id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          <p>nessun cliente</p>
        )}
      </>
    </Form>
  );
};

export default TabellaPrenotazione;
