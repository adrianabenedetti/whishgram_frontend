import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { motion } from "framer-motion";
import decoder from "../utilities/decoder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewListModal = (props) => {

    const initialFormData = {
        url: "",
        title: ""
    }
    const [formData, setFormData] = useState(initialFormData);

      const session = localStorage.getItem("session");
      const decodedSession = decoder();

    const checkUrl = () => {
        if (formData.url.includes('http')) {
          return true;
        }
        return false;
    }

    const newlist = async (e) => {
        e.preventDefault();
        const id = decodedSession.id
    if (checkUrl()) {
      try {
        const req = await fetch(`http://localhost:5050/lists/new/${id}`, {
          method: "POST",
          headers: {
            authorization: session,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
        const list = await req.json();
        return list;
      } catch (error) {
        toast.error("Could not save your list, try again 🍀");
      }
    } else {
      return toast.warning("Please, enter a valid URL ❗️");
    }
  };
    
  const handleChange = (e) => {
    setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
  }

  const modalStyle = {
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
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Create a New List
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={newlist}>
          <h5>Enter your list name:</h5>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" name="title" placeholder="List title" onChange={handleChange} value={formData.title} autoFocus />
          </Form.Group>
          <h5>Paste your Product URL in here:</h5>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              name="url"
              placeholder="http://example.com"
              onChange={handleChange}
              value={formData.url}
              autoFocus
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={modalStyle.button}
          onClick={props.onHide}
        >
          Save
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={modalStyle.button}
          onClick={props.onHide}
        >
          Close
        </motion.button>
      </Modal.Footer>
    </Modal>
  );
  }

export default NewListModal;
