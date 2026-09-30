import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../cart/useCart";

export default function Header() {
  const { totalItems } = useCart();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="header">
      <Link to="/" className="logo" onClick={close}>
      <img  src={`${import.meta.env.BASE_URL}nook-logo.png`} 
      alt="Nook home" 
      className="logo-icon" />
      </Link>

      <nav id="main-nav" className={`nav ${open ? "nav--open" : ""}`} aria-label="Main">
        <NavLink to="/shop" onClick={close}>Shop</NavLink>
        <NavLink to="/build" onClick={close}>Builder</NavLink>
        <NavLink to="/setup" onClick={close}>Setup</NavLink>
      </nav>

      <div className="header-actions">
        <NavLink
          to="/cart"
          className="cart-link"
          onClick={close}
          aria-label={`Cart, ${totalItems} items`}
        >
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
            <path d="M2 3h3l2.7 12.4a1 1 0 0 0 1 .8h8.9a1 1 0 0 0 1-.8L20.5 8H6" />
          </svg>
          {totalItems > 0 && (
            <span className="badge" aria-hidden="true">{totalItems}</span>
          )}
        </NavLink>

        <button
          type="button"
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="main-nav"
          onClick={() => setOpen((o) => !o)}
        >
          {open ? "✕ Close" : "☰ Menu"}
        </button>
      </div>
    </header>
  );
}