import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";
import ProductImage from "../components/ProductImage";
import { formatPrice } from "../utils/format";

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
            <ProductImage product={product} size="sm" />
            <div className="cart-item-info">
              <Link to={`/product/${product.id}`}>{product.title}</Link>
              <p>{formatPrice(product.price)}</p>
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
            <p className="line-total">{formatPrice(product.price * quantity)}</p>
            <button type="button" className="remove" onClick={() => remove(product.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <p>
          Total: <strong>{formatPrice(totalPrice)}</strong>
        </p>
        <button type="button" className="btn btn-secondary" onClick={clear}>
          Clear cart
        </button>
      </div>
    </section>
  );
}