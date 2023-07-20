import React from "react";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Container  from "react-bootstrap/Container";
import { motion } from "framer-motion";
import decoder from "../utilities/decoder";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const NewListModal = (props) => {

  const [images, setImages] = useState([])

  const [product, setProduct] = useState({})


  const createProduct = async () => {
    const contentBody = {
      url: formData.url,
      title: formData.title
    }
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products/new/${props.listId}`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(contentBody)
      });
      const response = await data.json();
      if(response.statusCode === 200){
        const productId = response.product._id;
        setProduct(response.product)
        const data2 = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products/scraping/${productId}`);
        const response2 = await data2.json()
        if(response2.statusCode === 200){
          setImages(response2.result)
        } else {
          toast.error("No images found")
        }
      } else {
        toast.error("Could not save URL")
      }
    } catch (error) {
      toast.error("error post")
    }
  }

  const exitModal = (props) => {
    props.onHide()
    window.location.reload(false)
}
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
        const req = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/lists/new/${id}`, {
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

  const saveImage = async (index) => {
    const id = product._id
    const bodyContent = {
      img: images[index]
    }
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products/${id}`, {
        method: 'PATCH',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyContent)
      })
      const response = await data.json();
      if(response.statusCode === 200) {
        toast.success("Product saved ✅")
      }
    } catch (error) {
      toast.error("There has been an error ❌")
    }
  }
    
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
    img: {
      width: '150px'
    }
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
          Save a New Product
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <h5>Enter your Product name:</h5>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control type="text" name="title" placeholder="Product name" onChange={handleChange} value={formData.title} autoFocus />
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
        <div className="d-flex justify-content-center">
        <motion.button 
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={modalStyle.button}
          onClick={createProduct}
        >
          Send
        </motion.button>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Container>
          <Row>
        {images && images.map((image, index) =>{
          if(index <= 20) {
          return (
              <Col md={8} lg={4} xs={12} >
              <button onClick={() => saveImage(index)}>
              <img style={modalStyle.img} src= {image}/>
              </button>
              </Col>
          )}
        })}
        <div className="d-flex justify-content-center mt-3">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          style={modalStyle.button}
          onClick={() => exitModal(props)}
        >
          Close
        </motion.button>
        </div>
        </Row>
        </Container>
      </Modal.Footer>
    </Modal>
  );
  }

export default NewListModal;
