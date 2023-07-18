import React from "react";
import { useState } from "react";
import { Link } from 'react-router-dom';
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import FloatingLabel from "react-bootstrap/FloatingLabel";

const SignUp = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const checkPassword = () => {
    if (formData.password === formData.confirmPassword) {
      return true;
    }
    return false;
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (checkPassword()) {
      try {
        const req = await fetch("http://localhost:5050/users/new", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const user = await req.json();
        if (req.ok) {
          localStorage.setItem("loggedIn", JSON.stringify(user));
        }
        resetFields();
        return user;
      } catch (error) {
        toast.warning("Please check you info ☝️");
      }
    } else {
      return toast.warning("Passwords do not match 🚫");
    }
  };

  const resetFields = () => {
    setFormData({
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const signupForm = {
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
      color: "rgb(234, 234, 234);",
      marginLeft: "0.5rem",
    },
    link: {
      textDecoration: "none",
      color: "rgb(40, 38, 34)",
      fontWeight: "bold",
    },
  };
  return (
    <Container style={signupForm.card}>
      <Row className="vh-100 d-flex justify-content-center align-items-center">
        <Col md={8} lg={6} xs={12}>
          <Card className="shadow">
            <Card.Body>
              <div className="mb-3 mt-md-4">
                <h2 className="fw-bold mb-2 text-center">Sign up</h2>
                <div className="mb-3"></div>
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="First Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={formData.firstName}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Last Name"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={formData.lastName}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Username"
                      className="mb-3"
                    >
                      <Form.Control
                        type="text"
                        name="userName"
                        placeholder="Username"
                        onChange={handleChange}
                        value={formData.userName}
                      />
                    </FloatingLabel>
                  </Form.Group>
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
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <FloatingLabel
                      controlId="floatingInput"
                      label="Confirm Password"
                      className="mb-3"
                    >
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        name="confirmPassword"
                        onChange={handleChange}
                        value={formData.confirmPassword}
                      />
                    </FloatingLabel>
                  </Form.Group>
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="d-flex justify-content-center"
                  >
                    <Button
                      style={signupForm.button}
                      type="submit"
                      className="text-align-center"
                    >
                      Submit
                    </Button>
                  </motion.div>
                </Form>
                <div className="mt-3">
                    <p className="mb-0  text-center">
                      Already have an account?{" "}
                      <Link style={signupForm.link} to="/Login">
                        <span>Login</span>
                      </Link>
                    </p>
                  </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default SignUp;
