import { Card, Col, Row } from "react-bootstrap";

const Login = () => {
  return (
    <div className="d-flex justify-content-center ">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Benvenuto</Card.Title>

          <Card.Text>Organizza subito la tua prossima avventura, e condividila con la community!</Card.Text>
          <Card.Link href="/">Home</Card.Link>
          <Card.Link href="/discover">Discover</Card.Link>
        </Card.Body>
      </Card>
    </div>
  );
};
export default Login;
