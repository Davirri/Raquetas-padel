import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">P@delRT</h1>
        <ul className="navbar-menu">
          <li><Link className="navbar-link" to="/">Inicio</Link></li>
          <li><Link className="navbar-link" to="/cart">Carrito</Link></li>
          <li><Link className="navbar-link" to="/checkout">Checkout</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
