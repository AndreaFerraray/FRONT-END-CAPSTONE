import {
  Button,
  Card,
  CardBody,
  CardText,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Form,
  Image,
  Row,
} from "react-bootstrap";
import NavBar from "./Navbar";

import { useDispatch, useSelector } from "react-redux";
import { FileUploader } from "react-drag-drop-files";
import { addUser } from "../redux/action";
import { useNavigate } from "react-router";

import { useEffect, useState } from "react";

const Profilo = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  const token = useSelector((state) => state.login.token);
  const fileTypes = ["JPG", "PNG", "GIF", "JPEG"];
  const [file, setFile] = useState(null);
  const [showUploader, setShowUploader] = useState(false);
  const post = useSelector((state) => state.login.user.post);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const openLightbox = () => {
    setLightboxOpen(true);
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
  };

  const deletePost = async (postId) => {
    console.log(postId);
    const risp = await fetch(`http://localhost:3001/users/deletePost/me/${postId}`, {
      method: "DELETE",
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    const user = await risp.json();
    if (risp.ok) {
      dispatch(addUser(user));
    }
  };

  const handleToggleUploader = () => {
    setShowUploader(!showUploader);
  };

  const caricaFile = (event) => {
    const file = event.target.files[0];
    console.log("ciao");
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
    const data = new FormData(e.target);

    const datiPost = new FormData();
    datiPost.append("file", file);
    datiPost.append("testo", data.get("testo"));
    console.log(data.get("testo"));

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
      alert("POST CREATO CON SUCCESSO");
    }
  };

  return (
    <div className="justify-content-center containerHome">
      <NavBar />
      <Container className="mt-5 ">
        <Row className="d-flex flex-row">
          <Col>
            <Container className="my-5 d-flex justify-content-start">
              <Row>
                <Col>
                  {user ? (
                    <>
                      <Card style={{ width: "18rem" }}>
                        <Card.Img variant="top" src={user.imgProfilo} />
                        <Card.Body>
                          <Card.Text>
                            <h5>
                              {user.nome} {user.cognome}
                            </h5>
                          </Card.Text>
                        </Card.Body>
                        <Dropdown
                          show={showUploader}
                          onClose={() => setShowUploader(false)}
                          className="position-absolute buttonCambiaImgProfilo"
                        >
                          <DropdownToggle as={Button} onClick={handleToggleUploader} className="buttonCambiaImgProfilo">
                            <DropdownMenu>
                              <DropdownItem>
                                <FileUploader
                                  className="buttonCambiaImgProfilo"
                                  handleChange={handleChange}
                                  name="file"
                                  types={fileTypes}
                                  id="file"
                                />
                              </DropdownItem>
                            </DropdownMenu>
                          </DropdownToggle>
                        </Dropdown>
                      </Card>
                    </>
                  ) : (
                    <p>User not log</p>
                  )}
                </Col>
              </Row>
            </Container>
            <Row className=" my-2 " xs={12} sm={12} md={12} lg={3}>
              <Col>
                <Card>
                  <Form onSubmit={createPost}>
                    <Form.Group className="mb-1">
                      <Form.Label className="my-2 mx-2">CREA UN NUOVO POST</Form.Label>
                      <Form.Control
                        type="text"
                        name="testo"
                        id="testo"
                        placeholder="scrivi qui..."
                        className="w-75 mb-3 mx-2"
                      />
                    </Form.Group>
                    <Col>
                      <Form.Group className="mb-3 mx-2 w-75">
                        <Form.Control type="file" name="file" onChange={caricaFile} />
                      </Form.Group>
                    </Col>
                    <Button className="buttonCondividi mx-2  " type="submit ">
                      Condividi
                    </Button>
                  </Form>
                </Card>
              </Col>
            </Row>
          </Col>

          <Container className="justify-content-between">
            <Row>
              {post ? (
                post.map((post) => {
                  return (
                    <Col key={post.id} xs={12} md={6} lg={4} className="my-4 ">
                      <Card className="cardPost">
                        {" "}
                        <Row>
                          <Col md={12}>
                            {" "}
                            <CardBody>
                              <Row className="align-items-center ">
                                <Col xs={6} sm={4} md={3}>
                                  <a href="/profile">
                                    <Image
                                      src={user.imgProfilo}
                                      alt="image profile"
                                      roundedCircle
                                      style={{ width: "40px", height: "40px", marginInline: "1rem" }}
                                    />
                                  </a>
                                </Col>
                                <Col>
                                  <CardTitle>{user.nome}</CardTitle>
                                </Col>
                              </Row>

                              <Card.Text className="my-1">{post.testo}</Card.Text>

                              <Card.Img
                                src={post.foto}
                                className="  clickable  "
                                id="fotoPost"
                                alt="Post"
                                onClick={openLightbox}
                              />

                              {lightboxOpen && (
                                <div className="lightbox-overlay" onClick={closeLightbox}>
                                  <div className="lightbox-content">
                                    <img src={post.foto} alt="Post" />
                                  </div>
                                </div>
                              )}
                            </CardBody>{" "}
                          </Col>{" "}
                        </Row>{" "}
                        <CardText className=" mx-3 mt-auto">{post.dataPubblicazione}</CardText>
                        <Button className=" buttonDelete " type="submit" onClick={() => deletePost(post.id)}>
                          Elimina
                        </Button>
                      </Card>{" "}
                    </Col>
                  );
                })
              ) : (
                <p>Condividi usbito qualcosa con la community</p>
              )}
            </Row>
          </Container>
        </Row>
      </Container>
    </div>
  );
};
export default Profilo;
