import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToken, addUser } from "../redux/action";
import NavBar from "./Navbar";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
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
      dispatch(addUser());
      navigate("/auth");
    } else {
      console.error("login non riuscito riprova con credenziali valide");
    }
  };

  return (
    <>
      <NavBar></NavBar>
      <Container className=" my-5 align-items-center">
        <Row className="containerForm align-items-center ">
          <Form onSubmit={handleSubmit} className="formLogin justify-content-center mx-auto">
            <Col xs={8} md={6}>
              <Form.Group>
                <Form.Control type="email" name="email" id="email" placeholder="Enter email" className="emaiLogin" />
              </Form.Group>
            </Col>
            <Col xs={8} md={6}>
              <Form.Group className="mb-3">
                <Form.Control
                  name="password"
                  id="password"
                  type="password"
                  placeholder="Password"
                  className="passwordLogin"
                />{" "}
              </Form.Group>
            </Col>
            <Col xs={8} md={6}>
              <Button variant="primary" type="submit" className="buttonLogin">
                Login
              </Button>
            </Col>
          </Form>
        </Row>
      </Container>
    </>
  );
};
export default Login;
