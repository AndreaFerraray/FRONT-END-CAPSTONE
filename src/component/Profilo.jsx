import {
  Button,
  Card,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  FormControl,
  FormGroup,
  FormLabel,
  Image,
  Row,
} from "react-bootstrap";
import NavBar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { addUser } from "../redux/action";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useState } from "react";
import CaricatoreFileDropDown from "./DropDown";

const Profilo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [file, setFile] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const handleToggleUploader = () => {
    setShowUploader(!showUploader);
  };

  const caricaFile = (file) => {
    console.log(file);
    setFile(file);
  };

  const handleChange = async (file) => {
    const formImage = new FormData();
    formImage.append("avatar", file);
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

  const createPost = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const datiPost = new FormData();
    datiPost.append("file", file);
    datiPost.append("testo", e.testo);
    console.log(file);
    console.log(datiPost);

    const rispPost = await fetch("http://localhost:3001/users/addPost/me", {
      method: "PATCH",
      headers: {
        Authorization: "Bearer " + token,
      },
      body: datiPost,
    });

    if (rispPost.ok) {
      const post = await rispPost.json();
      dispatch(addUser(post));
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
                <Dropdown show={showUploader} onClose={() => setShowUploader(false)}>
                  <DropdownToggle as={Button} onClick={handleToggleUploader}>
                    <DropdownMenu>
                      <DropdownItem>
                        <FileUploader handleChange={handleChange} name="file" types={fileTypes} id="file" />
                      </DropdownItem>
                    </DropdownMenu>
                  </DropdownToggle>
                </Dropdown>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card>
                  <Form onSubmit={createPost}>
                    <Form.Group className="mb-3">
                      <Form.Label>CONDIVI</Form.Label>
                      <Form.Control type="text" name="testo" id="testo" placeholder="scrivi qui..." />
                    </Form.Group>
                    <Col>
                      <Form.Group controlId="formFile" className="mb-3">
                        <Form.Label>Carica file</Form.Label>
                        <Form.Control type="file" name="file" onChange={caricaFile} />
                      </Form.Group>
                      {/* <FileUploader handleChange={caricaFile} name="file" id="file" /> */}
                    </Col>
                    <Button type="submit">Condividi</Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
    </div>
  );
};
export default Profilo;
