import { Button, Card, Col, Container, Form, FormControl, Row } from "react-bootstrap";
import NavBar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { addUser } from "../redux/action";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const Profilo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];

  const handleChange = async (file) => {
    const formImage = new FormData();
    formImage.append("avatar", file);
    console.log(formImage.get("avatar"));
    const cambioImg = await fetch("http://localhost:3001/users/upload", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: formImage,
    });

    if (cambioImg.ok) {
      const rispostaSucces = await fetch("http://localhost:3001/users/me", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      if (rispostaSucces.ok) {
        const user = await rispostaSucces.json();
        console.log(user);
        dispatch(addUser(user));
      }
    }
  };
  return (
    <div className="UserPage">
      <NavBar />
      <Row
        className="d-flex flex-row"
        style={{
          height: "70vh",
        }}
      >
        <Col>
          <Container className="mt-5 d-flex justify-content-center">
            <Row>
              <Col>
                {user ? (
                  <>
                    <Card style={{ width: "18rem" }}>
                      <Card.Img variant="top" src={user.imgProfilo} />
                      <Card.Body>
                        <Card.Title>{user.username}</Card.Title>
                        <Card.Text>
                          <p>{user.nome}</p>
                          <p>{user.cognome}</p>
                        </Card.Text>
                      </Card.Body>
                    </Card>
                  </>
                ) : (
                  <p>User not log</p>
                )}
              </Col>
              <Col>
                <FileUploader handleChange={handleChange} name="file" types={fileTypes} />
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default Profilo;
