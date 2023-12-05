import { AccordionButton, Button, Card, Col, Container, Row, SplitButton } from "react-bootstrap";
import NavBar from "./Navbar";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Campeggi = () => {
  const token = useSelector((state) => state.login.token);
  const [contenuto, setContenuto] = useState();
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
    <>
      <NavBar />
      <Container>
        <Button variant="success" href="/" className="m-5 registerButton">
          Home
        </Button>
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
                    <Card.Img variant="top" src={elem.logo} />
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
