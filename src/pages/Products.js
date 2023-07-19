import React from 'react';
import NavbarReservedArea from '../components/NavbarReservedArea';
import Footer from '../components/Footer';

const Products = () => {

  return (
    <>
    <NavbarReservedArea />
    <Footer />
    </>
  )
}


// nel be, la post restituisce il prodotto, che contiene id, per lanciare la get. funzione (es createProduct) con return prodotto, per prendere product._id.
// get dello scraping con id IN UN'UNICA FUNZIONE
// USESTATE images, setImages dentro il modale per renderizz immagine.
export default Products