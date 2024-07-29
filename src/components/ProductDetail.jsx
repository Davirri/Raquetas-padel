import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import CartContext from '../context/CartContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch('/data/products.json');
        const data = await response.json();
        const foundProduct = data.find(p => p.id === parseInt(id));
        setProduct(foundProduct);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>Error al cargar producto: {error.message}</p>;
  if (!product) return <p>Producto no encontrado.</p>;

  return (
    <div className="product-content">
      <img
        src={product.image}
        alt={product.name}
        className="product-image"
      />
      <h2 className="product-name">{product.name}</h2>
      <p className="product-description">{product.description}</p>
      <p className="product-price">€{product.price.toFixed(2)}</p>
      <button
        className="product-button"
        onClick={() => addToCart(product)}
      >
        Añadir al Carrito
      </button>
    </div>
  );
}

export default ProductDetail;
