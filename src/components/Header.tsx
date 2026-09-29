import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo">React TS Shop</Link>
      <Link to="/cart" className="cart-link" aria-label={`Cart, ${totalItems} items`}>
        Cart
        {totalItems > 0 && <span className="badge">{totalItems}</span>}
      </Link>
    </header>
  );
}