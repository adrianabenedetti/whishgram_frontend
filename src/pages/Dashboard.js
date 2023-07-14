import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";
import { useState, useEffect } from "react";
import decoder from "../utilities/decoder";
import { ListButton } from "../components/ListButton";

const Dashboard = () => {
  const [lists, setLists] = useState([]);
  const decodedSession = decoder();
  console.log(lists)
  useEffect(() => {
     getLists(decodedSession.id).then((response) => {
      setLists(response);
    }); 
  }, []);


  const getLists = async (id) => {
    try {
      const session = localStorage.getItem("session");
      const response = await fetch(`http://localhost:5050/lists/${id}`, {
        headers: {
          authorization: session,
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data.lists;
    } catch (error) {
      console.log(error);
    }
  };

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
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
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
      {lists && lists.map((list) => {
        return <ListButton list= {list} />
      })}

    </Container>
  </>
  )
};

export default Dashboard;
