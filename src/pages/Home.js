import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';

const Home = () => {
  return (
    <>
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Navbar.Brand href="#home">Wishgram</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="">
            <Link to= "/SignUp"><Button className="my-2 mx-3" variant="dark">Sign up</Button></Link>
            <Link to= "/Login"><Button className="my-2 mx-3" variant="dark">Login</Button></Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    <Container>
    <hr class="dropdown-divider"></hr>
    </Container>
    </>
  )
}

export default Home