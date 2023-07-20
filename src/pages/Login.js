import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FloatingLabel from 'react-bootstrap/FloatingLabel';


const Login = () => {
  const initialStateData = {
    email: "",
    password: "",
  };
  const [formData, setFormData] = useState(initialStateData);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const response = await data.json();
      if (response.statusCode === 200) {
        localStorage.setItem("session", response.accessToken);
        navigate("/Dashboard");
      } else {
        toast.error("Login failed ❌: invalid email or password");
      }
      resetFields();
    } catch (error) {
      toast.error(Error);
    }
  };

  const resetFields = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const loginForm = {
    card: {
      color: "rgb(40, 38, 34)",
    },
    button: {
      backgroundColor: "rgb(40, 38, 34)",
      width: "12rem",
      height: "3rem",
      border: "none",
      borderRadius: "20px",
      textAlign: "center",
      fontSize: "15pt",
      color: "rgb(234, 234, 234)",
      marginLeft: "0.5rem",
    },
    link: {
      textDecoration: "none",
      color: "rgb(40, 38, 34)",
      fontWeight: "bold",
    },
  };

  return (
    <>
      <Container>
        <Row className="vh-100 d-flex justify-content-center align-items-center">
          <Col md={8} lg={6} xs={12}>
            <Card className="shadow">
              <Card.Body>
                <div className="mb-3 mt-md-4">
                  <h2 className="fw-bold mb-2 text-center">Login</h2>
                  <div className="mb-3"></div>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Email address"
                        className="mb-3"
                      >
                        <Form.Control
                          type="email"
                          placeholder="Enter email"
                          name="email"
                          onChange={handleChange}
                          value={formData.email}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicPassword">
                      <FloatingLabel
                        controlId="floatingInput"
                        label="Password"
                        className="mb-3"
                      >
                        <Form.Control
                          type="password"
                          placeholder="Password"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      </FloatingLabel>
                    </Form.Group>
                    <Form.Group
                      className="mb-3"
                      controlId="formBasicCheckbox"
                    ></Form.Group>
                    <motion.div
                      className="d-flex justify-content-center"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Button
                        className="d-flex justify-content-center"
                        style={loginForm.button}
                        type="submit"
                      >
                        Log in
                      </Button>
                    </motion.div>
                  </Form>
                  <div className="mt-3">
                    <p className="mb-0  text-center">
                      Don't have an account?{" "}
                      <Link style={loginForm.link} to="/SignUp">
                        <span>Sign Up</span>
                      </Link>
                    </p>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Login