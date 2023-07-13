import React from 'react';
import { useState } from 'react';
import Form from 'react-bootstrap/form';
import Button from 'react-bootstrap/button';
import Container from 'react-bootstrap/container';


const SignUp = () => {
    
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        userName: "",
        email: "",
        password: ""
    });
    console.log(formData);

    const handleChange = (e) => {
        setFormData((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    }; 

    const handleSubmit = async (e) => {
      e.preventDefault();
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
        resetFields()
        return user;
      } catch (error) {
        console.log(error);
      }
    }; 

    const resetFields = () => {
        setFormData({
            firstName: "",
            lastName: "",
            userName: "",
            email: "",
            password: ""
        })
    }

  return (
    <Container class="d-flex flex-column align-items-center">
        <h3 className='pt-5 mt-5'>Sign Up</h3>
      <Form className='w-25 pt-3 mt-3 align-items-center' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="firstName"
            onChange={handleChange}
            value={formData.firstName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={handleChange}
            value={formData.lastName}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="userName"
            onChange={handleChange}
            value={formData.userName}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default SignUp 