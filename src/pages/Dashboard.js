import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/button";
import { useState, useEffect } from "react";
import decoder from "../utilities/decoder";
import { ListButton } from "../components/ListButton";
import {useParams, useNavigate} from 'react-router-dom';
import {nanoid} from 'nanoid'


const Dashboard = () => {
  const [lists, setLists] = useState([]);

  const [products, setProducts] = useState([]);

  const [showDiv, setShowDiv] = useState([])
  console.log("showDiv", showDiv)

  const decodedSession = decoder();

  useEffect(() => {
     getLists(decodedSession.id).then((response) => {
      setLists(response);
    }).then(() => {initShowDiv()});
  }, []);
  console.log(lists)
  console.log(products)

  const initShowDiv = () => {
    let arr = new Array(lists.length)
    for (let index = 0; index < arr.length; index++) {
      arr[index] = false
    }
    setShowDiv(arr)
    console.log("init terminato") 
  }

  const session = localStorage.getItem("session");
  const getLists = async (id) => {
    try {
      const response = await fetch(`http://localhost:5050/lists/byUserId/${id}`, {
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

/* 
  const getProducts = async (listId) => {
    try {
      const data = await fetch(`http://localhost:5050/products/${listId}`, {
        headers: {
          authorization: session,
          "Content-Type": "application/json",
        }
      }) 
      const response = await data.json();
      setProducts(response.products)
    } catch (error) {
      console.log(error);
    }
  } */

  const handleClick = (index) => {
      console.log(lists[index].products)
      toggleDiv(index)
  }

  const toggleDiv = (index) => {
    let arr = [...showDiv]
    for (let i = 0; i < arr.length; i++) {
      if(i === index){ 
        arr[i] = !showDiv[i]
      }
    }
    setShowDiv(arr)
  }

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
      {lists && lists.map((list, index) => {
        return (
          <div key={nanoid()}>
          <Button onClick={()=> handleClick(index)}>
            {list.title}
          </Button>
          { showDiv && showDiv[index] && <div>Questo Campetella si comporta male</div>}
          </div>
        )
      })}

    </Container>
  </>
  )
};

export default Dashboard;
