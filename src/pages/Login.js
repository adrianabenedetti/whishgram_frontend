import React from 'react'
import { Col, Button, Row, Container, Card, Form } from "react-bootstrap";
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import {motion} from 'framer-motion';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
    const initialStateData = {
        email: "",
        password:""
    }
    const [formData, setFormData] = useState(
        initialStateData
      );

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
          const data = await fetch("http://localhost:5050/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
          });
          const response = await data.json();
          if (response.statusCode===200) {
            localStorage.setItem("session", response.accessToken);
            navigate("/Dashboard")
          } else {
            toast.error("Login failed ❌: invalid email or password")
          }
          resetFields();
        } catch (error) {
          toast.error(Error)
        }
      };

      const resetFields = () => {
        setFormData({
          email: "",
          password: "",
        });
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
                    <Form.Label className="text-center">
                      Email address
                    </Form.Label>
                    <Form.Control type="email" placeholder="Enter email" name="email" onChange={handleChange}
                      value={formData.email} />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" name="password" onChange={handleChange}
                      value={formData.password}/>
                  </Form.Group>
                  <Form.Group
                    className="mb-3"
                    controlId="formBasicCheckbox"
                  ></Form.Group>
                  <motion.div className="d-grid" whileHover={{scale:1.1}} whileTap={{scale:0.9}}>
                    <Button variant="primary" type="submit">
                      Login
                    </Button>
                  </motion.div>
                </Form>
                <div className="mt-3">
                  <p className="mb-0  text-center">
                    Don't have an account?{" "}
                    <Link to="/SignUp">
                      <motion.span className="text-primary fw-bold" whileHover={{scale:1.1}} whileTap={{scale:0.9}}>Sign Up</motion.span>
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