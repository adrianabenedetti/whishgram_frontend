import React from 'react'
import { useState } from 'react';
import Fade from 'react-bootstrap/Fade';

const Menu = () => {
    const [active, setActiveMenu] = useState(false);
    
  return (
    
    <div class="menu">
        <Fade in={active}>
    <a id="example-fade-text" href="#user">
    <i class="bi bi-person-circle"></i>
    </a>
    <a id="example-fade-text" href="#addlist">
    <i class="bi bi-card-checklist"></i>
    </a>
    <a id="example-fade-text" href="#search">
    <i class="bi bi-search-heart-fill"></i>
    </a>
    <a id="example-fade-text" href="#logout">
    <i class="bi bi-box-arrow-right"></i>
    </a>
    </Fade>
    <button id="toggle-btn" onClick={() => setActiveMenu(!active)} aria-controls="example-fade-text" aria-expanded={active}>
    <i class="bi bi-plus-circle"></i>
    </button>
  </div>
  )
}

export default Menu