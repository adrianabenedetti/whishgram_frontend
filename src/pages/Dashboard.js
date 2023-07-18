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


const Dashboard = () => {
  //useStates
  const [lists, setLists] = useState([]);

  const [products, setProducts] = useState([]);

  const [showDiv, setShowDiv] = useState([]);

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

  const getLists = async (id) => {
    try {
      const response = await fetch(
        `http://localhost:5050/lists/byUserId/${id}`,
        {
          headers: {
            authorization: session,
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      return data.lists;
    } catch (error) {
      console.log(error);
    }
  };

  const handleClick = (index) => {
    toggleDiv(index);
  };

  const toggleDiv = (index) => {
    let arr = [...showDiv];
    for (let i = 0; i < arr.length; i++) {
      if (i === index) {
        arr[i] = !showDiv[i];
      }
    }
    setShowDiv(arr);
  };

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const cardStyle = {
    card: {
      width:'16rem', 
      height:'20rem'
    },
    button: {
      width:'7rem', 
      height:'3rem', 
      backgroundColor:'#C0C0C0',
      border: 'none',
      borderRadius: '20px',
      textAlign: 'center'
    }
  }

  //useEffects
  useEffect(() => {
    getLists(decodedSession.id).then((response) => {
      setLists(response);
      initShowDiv(response.length);
    });
  }, []);

  return (
    <>
      <Navbar className="bg-body-tertiary">
        <Container>
          <Navbar.Brand href="#home">Wishgram</Navbar.Brand>
          <Navbar.Toggle />
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className="px-2">Welcome,</Navbar.Text>
            <NavDropdown title="Username" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={logOut} href="#action/3.1">
                Log out
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Separated link
              </NavDropdown.Item>
            </NavDropdown>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Row className="d-flex py-5 justify-content-center">
          {lists &&
            lists.map((list, index) => {
              return (
                <Col md={6} lg={3} xs={12}>
                  <Stack direction="horizontal" gap={2}>
                    <div key={nanoid()}>
                      <Card className="shadow" style={cardStyle.card}>
                        <Card.Body className="d-flex justify-content-center ">
                          <motion.div whileTap={{ scale: 0.9 }}>
                            <Button
                              className="d-flex"
                              style={cardStyle.button}
                              onClick={() => handleClick(index)}
                            >
                              {list.title}
                            </Button>
                          </motion.div>
                        </Card.Body>
                      </Card>
                    </div>
                  </Stack>
                </Col>
              );
            })}
{/*           {showDiv && showDiv[index] && (
            <div>Questo Campetella si comporta male 😈</div>
          )} */}
        </Row>
      </Container>
    </> 
  );
};

export default Dashboard;
