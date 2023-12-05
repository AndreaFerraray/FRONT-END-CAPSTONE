import { useDispatch } from "react-redux";
import { ADD_TOKEN, addToken } from "../redux/action";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { Button, Col, Container, Row } from "react-bootstrap";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handlerSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    console.log("Form data:", Object.fromEntries(data));

    try {
      // Invia la richiesta di registrazione
      const registrazione = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nome: data.get("nome"),
          cognome: data.get("cognome"),
          username: data.get("username"),
          email: data.get("email"),
          password: data.get("password"),
        }),
      });

      if (registrazione.ok) {
        // Se la registrazione è andata a buon fine, effettua il login
        const risposta = await fetch("http://localhost:3001/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: data.get("email"),
            password: data.get("password"),
          }),
        });

        if (risposta.ok) {
          // Se il login è andato a buon fine, ottieni il token e lo aggiungi allo store Redux
          const token = await risposta.json();

          dispatch(addToken(token.accessToken));
          // Naviga verso la pagina di autenticazione
          navigate("/auth/login");
        }
      } else {
        console.error("Errore durante la registrazione ");
      }
    } catch (error) {
      console.error("Errore:", error);
    }
  };

  return (
    <div className="Register">
      <Button variant="success" href="/" className="m-5 registerButton">
        Home
      </Button>
      <Container className="mt-5 d-flex justify-content-center">
        <Row className="d-flex flex-column">
          <Col>
            <h2>Registrati</h2>
          </Col>
          <Col>
            <Form onSubmit={handlerSubmit}>
              <Row>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" name="nome" id="nome" placeholder="Enter your name" />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="text" name="username" id="username" placeholder="username..." />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group className="mb-3">
                    <Form.Label>Cognome</Form.Label>
                    <Form.Control name="cognome" id="cognome" type="text" placeholder="Enter your surname" />
                  </Form.Group>
                </Col>
              </Row>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" id="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control name="password" id="password" type="password" placeholder="Password" />
              </Form.Group>
              <Button type="submit" className="registerButton">
                Invia
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
export default Register;
