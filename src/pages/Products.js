import React from 'react';
import NavbarReservedArea from '../components/NavbarReservedArea';
import Footer from '../components/Footer';
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/button";
import {Row, Col} from "react-bootstrap"
import { useState, useEffect } from "react";
import decoder from "../utilities/decoder";
import { useNavigate, useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import Card from "react-bootstrap/Card";
import Stack from 'react-bootstrap/Stack';
import {motion} from 'framer-motion';
import {AiFillPlusCircle, AiOutlineDelete} from 'react-icons/ai'
import NewProductModal from "../components/NewProductModal";
import { toast } from 'react-toastify';

const Products = () => {

  //useStates
  const [products, setProducts] = useState([]);

  console.log(products)

  const [showDiv, setShowDiv] = useState([]);

  const [modalShow, setModalShow] = React.useState(false);

  const session = localStorage.getItem("session");

  const {listId} = useParams()

  //functions
  const initShowDiv = (length) => {
    let arr = new Array(length);
    for (let index = 0; index < arr.length; index++) {
      arr[index] = false;
    }
    setShowDiv(arr);
  };



  const getProducts = async () => { 
    try {
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products/${listId}`, {
        headers: {
          authorization: session,
          "Content-Type": "application/json",
        },
      })
      const response = await data.json()
      return response.products
    } catch (error) {
      console.log(error);
    }
  }


  const deleteProduct = async (index) => {
    try {
      const id = products[index]._id;
      console.log(id)
      const data = await fetch(`${process.env.REACT_APP_SERVER_BASE_URL}/products/delete/${id}`, {
        method: "DELETE",
      });
      const response = await data.json();
      reloadPage();
    } catch (error) {
      toast.error("Couldn't delete list ❗️ ");
    }
  };

  const reloadPage = () => {
    window.location.reload(false);
  };


  //useEffect
  useEffect(() => {
    getProducts().then((data) => {
      setProducts(data);
      initShowDiv(data.length);
    });
  }, []);

  const cardStyle = {
    card: {
      width: "18rem",
      height: "25rem",
      marginTop: "1rem",
      marginRight:"30rem"
    },
    button: {
      height: '2.5rem',
      backgroundColor: "rgb(40, 38, 34)",
      border: "none",
      borderRadius: "20px",
      textAlign: "center",
      margin: "0.3rem",
    },
    deleteButton: {
      width: "2.5rem",
      height: "2.5rem",
      backgroundColor: "rgb(40, 38, 34)",
      border: "none",
      borderRadius: "20px",
      textAlign: "center",
      margin: "0.3rem",
    },
    img: {
      width: "200px",
      height: "170px",
      objectFit: "cover",
      padding: "1rem",
      paddingBottom: "0",
    },
    plusButton: {
      position: "fixed",
      fontSize: "7rem",
      top: "7rem",
      right: "2rem",
      color: " rgb(40, 38, 34)",
      zIndex: 10,
    },
    a: {
      textDecoration: 'none'
    }
  };

  return (
    <>
    <NavbarReservedArea />
    <Container>
    <h4 className="pt-5">Products:</h4>
          <p>
            <AiFillPlusCircle
              style={cardStyle.plusButton}
              onClick={() => setModalShow(true)}
            />
          </p>{" "}
          {/* pulsante creazione lista */}
          <NewProductModal listId= {listId} show={modalShow} onHide={() => setModalShow(false)} />
          <Row className="d-flex py-5 justify-content-center gap-5">
            {products &&
              products.map((product, index) => {
                return (
                  <Col md={6} lg={3} xs={12}>
                      <div key={nanoid()}>
                        <Card className="shadow" style={cardStyle.card}>
                          <Card.Body className="d-flex justify-content-center">
                                <motion.img style={cardStyle.img} src={product.img}></motion.img>
                          </Card.Body>
                          <Card.Body className="d-flex justify-content-center align-item-end ">
                            <motion.div
                              className="d-flex align-item-end"
                              whileTap={{ scale: 0.9 }}
                              whileHover={{scale: 1.1}}
                            >
                              <a style={cardStyle.a} href={product.url}  target="_blank">
                              <Button
                                className="d-flex justify-content-center"
                                style={cardStyle.button}
                              >
                                {product.title.toUpperCase()}
                              </Button>
                              </a>
                            </motion.div>
                            <motion.div
                              className="d-flex"
                              whileTap={{ scale: 0.9 }}
                              whileHover={{scale: 1.1}}
                            >
                              <Button
                                onClick={() => deleteProduct(index)}
                                style={cardStyle.deleteButton}
                              >
                                <AiOutlineDelete />
                              </Button>
                            </motion.div>
                          </Card.Body>
                        </Card>
                      </div>
                  </Col>
                );
              })}
          </Row>
        
      </Container>
    <Footer />
    </>
  )
}


// nel be, la post restituisce il prodotto, che contiene id, per lanciare la get. funzione (es createProduct) con return prodotto, per prendere product._id.
// get dello scraping con id IN UN'UNICA FUNZIONE
// USESTATE images, setImages dentro il modale per renderizz immagine.
export default Products