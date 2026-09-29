import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="status">
      <h1>Page not found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <Link to="/" className="btn btn-link">Back to products</Link>
    </div>
  );
}