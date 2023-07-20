import React from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/Container";
import AOS from "aos";
import "aos/dist/aos.css";
import Screen1 from '../styles/screenshot/1.png';
import Screen2 from '../styles/screenshot/2.png';
import Screen3 from '../styles/screenshot/3.png';
import Screen4 from '../styles/screenshot/4.png';
import Screen5 from '../styles/screenshot/5.png';
import Screen6 from '../styles/screenshot/6.png';
import Screen7 from '../styles/screenshot/7.png';
import Screen8 from '../styles/screenshot/8.png';

const Body = () => {
    const bodyStyle = {
        h2: {
            textAlign: 'right',
            marginRight: '30rem',
            marginTop: '4rem'
        },
        img: {
            width: '40%',
            marginTop: '4rem',
            borderRadius: '5%'
        },
        pRight: {
            marginTop: '15rem',
            marginRight: '2rem',
            fontSize: '1.5vw',

        },
        pLeft: {
            marginTop: '15rem',
            marginLeft: '2rem',
            fontSize: '1.5vw'
        }
    }
    useEffect(() => {
        AOS.init({ duration: 1500 });
      }, []);
  return (
    <Container className="dflex justify-content-center">
        <hr></hr>
        <h2 data-aos="fade-up" style={bodyStyle.h2}>How does it work?</h2>
        <div className="d-flex justify-content-end">
        <p data-aos="fade-right" style={bodyStyle.pRight}><b>Step 1:</b> Create a new list</p>
        <img data-aos="fade-left" style={bodyStyle.img} src={Screen2} />
        </div>
        <div className="d-flex justify-content-start">
        <img data-aos="fade-right" style={bodyStyle.img} src={Screen3} />
        <p data-aos="fade-left" style={bodyStyle.pLeft}><b>Step 2:</b> Give your list a name and save</p>
        </div>
        <div className="d-flex justify-content-end">
        <p data-aos="fade-right" style={bodyStyle.pRight}><b>Step 3:</b> Now it's time to save your product</p>
        <img data-aos="fade-left" style={bodyStyle.img} src={Screen4} />
        </div>
        <div className="d-flex justify-content-start">
        <img data-aos="fade-right" style={bodyStyle.img} src={Screen5} />
        <p data-aos="fade-left" style={bodyStyle.pLeft}><b>Step 4:</b> Give your product a name (you can name it whatever you like!) and paste the product's URL.</p>
        </div>
        <div className="d-flex justify-content-end">
        <p data-aos="fade-right" style={bodyStyle.pRight}><b>Step 5:</b> Press "Send" and let the website works its magic... ✨</p>
        <img data-aos="fade-left" style={bodyStyle.img} src={Screen6} />
        </div>
        <div className="d-flex justify-content-start">
        <img data-aos="fade-right" style={bodyStyle.img} src={Screen7} />
        <p data-aos="fade-left" style={bodyStyle.pLeft}><b>Step 6:</b> Choose a picture to save...</p>
        </div>
        <div className="d-flex justify-content-end">
        <p data-aos="fade-right" style={bodyStyle.pRight}><b>Step 7:</b> ...and that's it! Product saved.</p>
        <img data-aos="fade-left" style={bodyStyle.img} src={Screen8} />
        </div>

    </Container>
  )
}

export default Body