import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form'
import NavDropdown  from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'

const NavbarReservedArea = () => {

    const navigate = useNavigate()

    const logOut = () => {
        localStorage.clear();
        navigate("/");
      };

    const button = {
        button: {
          backgroundColor:'rgb(40, 38, 34)',
          width:'6rem', 
          height:'3rem', 
          border: 'none',
          borderRadius: '20px',
          textAlign: 'center',
          fontSize: '12pt',
          color: 'rgb(234, 234, 234);',
          marginLeft: '0.5rem'
        }
      }

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
    <Container>
      <Navbar.Brand style={{fontSize:'25pt', fontWeight:'bold', color:'rgb(40, 38, 34)'}} href="#home">WISHGRAM</Navbar.Brand>
      <div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
{/*       <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Search</Button>
          </Form> */}
      <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end" >
      <Navbar.Text className="px-2">Welcome,</Navbar.Text>
            <NavDropdown title="Username" id="basic-nav-dropdown">
            <NavDropdown.Item onClick={logOut} href="#action/3.1">
                Log out
              </NavDropdown.Item>
              </NavDropdown>
      </Navbar.Collapse>
      </div>
    </Container>
  </Navbar>
  )
}

export default NavbarReservedArea