import React, { useContext } from 'react';
import CartContext from '../context/CartContext';

function Cart() {
  const { cart, removeFromCart, clearCart } = useContext(CartContext);

  const calculateTotal = () => {
    return cart.reduce((total, item) => {
      const price = parseFloat(item.price) || 0;
      const quantity = parseInt(item.quantity, 10) || 0;
      return total + price * quantity;
    }, 0).toFixed(2);
  };

  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + (parseInt(item.quantity, 10) || 0), 0);
  };

  return (
    <div className="cart-container">
      <h1>Carrito de Compras</h1>
      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h2 className="cart-item-name">{item.name}</h2>
                  <p className="cart-item-price">€{item.price.toFixed(2)}</p>
                  <p className="cart-item-quantity">Cantidad: {item.quantity}</p>
                </div>
                <button className="remove-button" onClick={() => removeFromCart(item.id)}>Eliminar</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h2>Resumen del Carrito</h2>
            <p><strong>Total de Artículos:</strong> {calculateTotalItems()}</p>
            <p><strong>Total:</strong> €{calculateTotal()}</p>
            <button className="clear-cart-button" onClick={clearCart}>Vaciar Carrito</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;
