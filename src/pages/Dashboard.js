import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";
import {Row, Col} from "react-bootstrap"
import { useState, useEffect } from "react";
import decoder from "../utilities/decoder";
import { useParams, useNavigate } from "react-router-dom";
import { nanoid } from "nanoid";
import Card from "react-bootstrap/Card";
import Stack from 'react-bootstrap/Stack';
import {motion} from 'framer-motion';
import {AiFillPlusCircle, AiOutlineDelete} from 'react-icons/ai'
import NewListModal from "../components/NewListModal";
import Footer from "../components/Footer"
import { toast } from 'react-toastify';
import NavbarReservedArea from "../components/NavbarReservedArea";

const Dashboard = () => {
  //useStates
  const [lists, setLists] = useState([]);

  const [products, setProducts] = useState([]);

  const [showDiv, setShowDiv] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);

  const session = localStorage.getItem("session");

  //utility
  const decodedSession = decoder();
  const navigate = useNavigate();

  //functions

  const initShowDiv = (length) => {
    let arr = new Array(length);
    for (let index = 0; index < arr.length; index++) {
      arr[index] = false;
    }
    setShowDiv(arr);
  };

  const reloadPage = () => {
    window.location.reload(false);
  };

  const getLists = async (id) => {
    try {
      const data = await fetch(`http://localhost:5050/lists/byUserId/${id}`, {
        headers: {
          authorization: session,
          "Content-Type": "application/json",
        },
      });
      const response = await data.json();
      return response.lists;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteList = async (index) => {
    try {
      console.log(lists[index]);
      const id = lists[index]._id;
      const data = await fetch(`http://localhost:5050/lists/delete/${id}`, {
        method: "DELETE",
      });
      const response = await data.json();
      reloadPage();
    } catch (error) {
      toast.error("Couldn't delete list ❗️ ");
    }
  };

  const handleClick = () => {
    navigate("/Products");
  };

  const cardStyle = {
    card: {
      width: "16rem",
      height: "20rem",
      marginTop: "1rem",
    },
    button: {
      width: "7rem",
      height: "2.5rem",
      backgroundColor: "rgb(40, 38, 34)",
      border: "none",
      borderRadius: "20px",
      textAlign: "center",
      margin: "0.3rem",
    },
    deleteButton: {
      width: "2.5rem",
      height: "2.5rem",
      backgroundColor: "rgb(40, 38, 34)",
      border: "none",
      borderRadius: "20px",
      textAlign: "center",
      margin: "0.3rem",
    },
    img: {
      width: "30%",
      objectFit: "cover",
    },
    plusButton: {
      position: "fixed",
      fontSize: "7rem",
      top: "7rem",
      right: "2rem",
      color: " rgb(40, 38, 34)",
      zIndex: 10,
    },
  };

  //useEffects
  useEffect(() => {
    getLists(decodedSession.id).then((data) => {
      setLists(data);
      initShowDiv(data.length);
    });
  }, []);

  return (
    <>
    <NavbarReservedArea />
      <Container>
        <>
          <p>
            <AiFillPlusCircle
              style={cardStyle.plusButton}
              onClick={() => setModalShow(true)}
            />
          </p>{" "}
          {/* pulsante creazione lista */}
          <NewListModal show={modalShow} onHide={() => setModalShow(false)} />
          <Row className="d-flex py-5 justify-content-center">
            {lists &&
              lists.map((list, index) => {
                return (
                  <Col md={6} lg={3} xs={12}>
                    <Stack direction="horizontal" gap={2}>
                      <div key={nanoid()}>
                        <Card className="shadow" style={cardStyle.card}>
                          {list.products.map((product, index) => {
                            if (index <= 6) {
                              return (
                                <img style={cardStyle.img} src={product.img} />
                              );
                            }
                          })}
                          <Card.Body className="d-flex justify-content-center align-item-center ">
                            <motion.div
                              className="d-flex align-item-end"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                className="d-flex justify-content-center"
                                style={cardStyle.button}
                                onClick={() => handleClick(index)}
                              >
                                {list.title}
                              </Button>
                            </motion.div>
                            <motion.div
                              className="d-flex"
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                onClick={() => deleteList(index)}
                                style={cardStyle.deleteButton}
                              >
                                <AiOutlineDelete />
                              </Button>
                            </motion.div>
                          </Card.Body>
                        </Card>
                      </div>
                    </Stack>
                  </Col>
                );
              })}
          </Row>
        </>
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
