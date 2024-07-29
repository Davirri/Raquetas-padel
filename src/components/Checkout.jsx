import React, { useContext, useState } from 'react';
import CartContext from '../context/CartContext';

function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const [checkoutComplete, setCheckoutComplete] = useState(false);

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

  const handleCheckout = () => {
    setTimeout(() => {
      setCheckoutComplete(true);
      clearCart();
    }, 1000); 
  };

  return (
    <div className="checkout-container">
      {checkoutComplete ? (
        <div className="checkout-success">
          <h1>¡Gracias por tu compra!</h1>
        </div>
      ) : (
        <>
          <h1>Checkout</h1>
          {cart.length === 0 ? (
            <p>Tu carrito está vacío.</p>
          ) : (
            <>
              <table className="checkout-table">
                <thead>
                  <tr>
                    <th>Imagen</th>
                    <th>Nombre</th>
                    <th>Precio</th>
                    <th>Cantidad</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(item => {
                    const price = parseFloat(item.price) || 0;
                    const quantity = parseInt(item.quantity, 10) || 0;
                    return (
                      <tr key={item.id}>
                        <td><img src={item.image} alt={item.name} /></td>
                        <td>{item.name}</td>
                        <td>€{price.toFixed(2)}</td>
                        <td>{quantity}</td>
                        <td>€{(price * quantity).toFixed(2)}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="checkout-summary">
                <h2>Resumen del Pedido</h2>
                <p><strong>Total de Artículos:</strong> {calculateTotalItems()}</p>
                <p><strong>Total:</strong> €{calculateTotal()}</p>
                <button className="checkout-button" onClick={handleCheckout}>Confirmar Compra</button>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Checkout;
