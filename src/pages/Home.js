import React from 'react'
import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Body from '../components/Body';

const Home = () => {

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
    <>
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Navbar.Brand style={{fontSize:'25pt', fontWeight:'bold', color:'rgb(40, 38, 34)'}} href="#home">WISHGRAM</Navbar.Brand>
        <div>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" >
          <Nav className="d-flex justify-content-end">
            <Link to= "/SignUp"><Button style={button.button}>Sign up</Button></Link>
            <Link to= "/Login"><Button style={button.button} >Login</Button></Link>
          </Nav>
        </Navbar.Collapse>
        </div>
      </Container>
    </Navbar>
    <Container>
      <Header />
      <Body />
    </Container>
    <Footer />
    </>
  )
}

export default Home