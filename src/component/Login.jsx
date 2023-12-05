import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken } from "../redux/action";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log("Form data:", data);
    const risposta = await fetch("http://localhost:3001/auth/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email: data.get("email"),
        password: data.get("password"),
      }),
    });
    console.log(data.get("email"));
    if (risposta.ok) {
      const token = await risposta.json();
      console.log(token.accessToken);
      dispatch(addToken(token.accessToken));

      navigate("/auth");
    } else {
      console.error("login non riuscito riprova con credenziali valide");
    }
  };

  return (
    <>
      <Row className="w-50 justify-content-centre">
        <Col>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" name="email" id="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control name="password" id="password" type="password" placeholder="Password" />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Col>
      </Row>
      {/* <div className="d-flex justify-content-center ">
        <Card style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>Benvenuto</Card.Title>

            <Card.Text>Organizza subito la tua prossima avventura, e condividila con la community!</Card.Text>
            <Card.Link href="/">Home</Card.Link>
            <Card.Link href="/discover">Discover</Card.Link>
          </Card.Body>
        </Card>
      </div> */}
    </>
  );
};
export default Login;
