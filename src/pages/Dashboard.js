import React from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import {Row, Col} from "react-bootstrap"
import { useState, useEffect } from "react";
import decoder from "../utilities/decoder";
import { useNavigate } from "react-router-dom";
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
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/lists/byUserId/${id}`, {
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
      const id = lists[index]._id;
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/lists/delete/${id}`, {
        method: "DELETE",
      });
      const response = await data.json();
      reloadPage();
    } catch (error) {
      toast.error("Couldn't delete list ❗️ ");
    }
  };

  const handleClick = (index) => {
    const listId = lists[index]._id;
    navigate(`/Products/${listId}`);
  };

  const cardStyle = {
    card: {
      width: "20rem",
      height: "30rem",
      marginTop: "1rem",
    },
    button: {
      width: "8rem",
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
      width: "50%",
      height: "50%",
      objectFit: "cover",
      padding: "1rem",
      paddingBottom: "0"
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
        <h4 className="pt-5">Your Lists:</h4>
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
                          <Card.Body>
                          {list.products.map((product, index) => {
                            if (index <= 3) {
                              return (
                                <img style={cardStyle.img} src={product.img} />
                              );
                            }
                          })}
                          </Card.Body>
                          <Card.Body className="d-flex justify-content-center align-items-end ">
                            <motion.div
                              className="d-flex align-items-end"
                              whileTap={{ scale: 0.9 }}
                              whileHover={{scale: 1.1}}
                            >
                              <Button
                                className="d-flex justify-content-center"
                                style={cardStyle.button}
                                onClick={() => handleClick(index)}
                              >
                                {list.title.toUpperCase()}
                              </Button>
                            </motion.div>
                            <motion.div
                              className="d-flex"
                              whileTap={{ scale: 0.9 }}
                              whileHover={{scale: 1.1}}
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
        
      </Container>
      <Footer />
    </>
  );
};

export default Dashboard;
