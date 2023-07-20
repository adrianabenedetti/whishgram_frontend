import React from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import AOS from "aos";
import "aos/dist/aos.css";

const Header = () => {
  useEffect(() => {
    AOS.init({ duration: 1500 });
  }, []);
  const headerStyle = {
    h1: {
      fontSize: "5vw",
      margin: '4rem',
      color: 'rgb(65, 63, 60)',
    },
    firstDiv: {
    },
    secondDiv: {
      fontSize: '2vw'
    },
    thirdDiv: {
      marginTop: '10rem',
      textAlign: 'right'
    },
  };
  return (
    <Container className="d-flex">
      <div style={headerStyle.firstDiv} data-aos="fade-right">
        <h1 className="justify-content-right" style={headerStyle.h1}>
          WISHGRAM, <br></br>a wishlists organizer
        </h1>
      <div className= "d-flex justify-content-start" data-aos="fade-right">
        <p style={headerStyle.secondDiv}>All of your favourite products, <br />
          <b>In one place.</b>
        </p>
      </div>
      </div>
    <div className= "d-flex justify-content-left"style={headerStyle.thirdDiv} data-aos="fade-left">
        <h4>Let it keep track of your favourite products while you shop online, <br />
         So you (and your browser bookmarks) don't have to.</h4>
      </div>  
    </Container>
  );
};
export default Header;
