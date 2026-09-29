import { Link } from "react-router-dom";
import { useCart } from "../cart/useCart";

export default function Header() {
  const { totalItems } = useCart();

  return (
    <header className="header">
      <Link to="/" className="logo">
        <img src="/nook-logo.png" alt="NOOK home" className="logo-icon" />
      </Link>
      <Link to="/cart" className="cart-link" aria-label={`Cart, ${totalItems} items`}>
        <svg
          width="26"
          height="26"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h9.1a1 1 0 0 0 1-.8L21 7H6" />
        </svg>
        {totalItems > 0 && <span className="badge">{totalItems}</span>}
      </Link>
    </header>
  );
}