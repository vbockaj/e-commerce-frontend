import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";

export default function Cart() {
  const { items, remove, setQuantity, clear, totalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="status">
        <h1>Your cart is empty</h1>
        <Link to="/" className="btn btn-link">Browse products</Link>
      </div>
    );
  }

  return (
    <section>
      <h1>Your cart</h1>
      <ul className="cart-list">
        {items.map(({ product, quantity }) => (
          <li key={product.id} className="cart-item">
            <img src={product.image} alt={product.title} />
            <div className="cart-item-info">
              <Link to={`/product/${product.id}`}>{product.title}</Link>
              <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="quantity">
              <button
                type="button"
                aria-label={`Decrease quantity of ${product.title}`}
                onClick={() => setQuantity(product.id, quantity - 1)}
              >
                −
              </button>
              <span>{quantity}</span>
              <button
                type="button"
                aria-label={`Increase quantity of ${product.title}`}
                onClick={() => setQuantity(product.id, quantity + 1)}
              >
                +
              </button>
            </div>
            <p className="line-total">${(product.price * quantity).toFixed(2)}</p>
            <button type="button" className="remove" onClick={() => remove(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>
          Total: <strong>${totalPrice.toFixed(2)}</strong>
        </p>
        <button type="button" className="btn btn-secondary" onClick={clear}>
          Clear cart
        </button>
      </div>
    </section>
  );
}