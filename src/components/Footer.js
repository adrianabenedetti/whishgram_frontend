import React from "react";
import "../styles/footer.css";
import { BsInstagram, BsFacebook } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <>
      <footer className="footer-07">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-12 text-center py-4">
              <h2 className="footer-heading py-2">WISHGRAM</h2>
              <p className="menu py-1">
                <a href="#">Home</a>
                <a href="#">About</a>
                <a href="#">Contact</a>
              </p>
              <p className="menuSocial">
                <a href="#">
                  <BsInstagram />
                </a>
                <a href="#">
                  <BsFacebook />
                </a>
                <a href="#">
                  <FiTwitter />
                </a>
              </p>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-md-12 text-center">
              <p className="copyright">
                Copyright ©️ All rights reserved | This website is made with{" "}
                <AiFillHeart /> by Adriana
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
