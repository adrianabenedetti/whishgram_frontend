import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { useNavigate, Link } from "react-router-dom";
import { IoIosExit } from "react-icons/io";

const NavbarReservedArea = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const logoutStyle = {
    a: {
      color: "rgb(40, 38, 34)",
      textDecoration: "none",
      width: "6rem",
      height: "3rem",
      border: "none",
      borderRadius: "20px",
      textAlign: "center",
      fontSize: "30pt",
      marginLeft: "0.5rem",
    },
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary shadow">
      <Container>
        <Navbar.Brand
          style={{
            fontSize: "25pt",
            fontWeight: "bold",
            color: "rgb(40, 38, 34)",
          }}
          href="#home"
        >
          WISHGRAM
        </Navbar.Brand>
        <div>
          <Nav className="d-flex justify-content-end">
            <Navbar.Text>
              <a href="#" style={logoutStyle.a} onClick={logOut}>
                <IoIosExit />
              </a>
            </Navbar.Text>
          </Nav>
        </div>
      </Container>
    </Navbar>
  );
};

export default NavbarReservedArea;
