import { Link, useSearchParams } from "react-router-dom";

export default function Setup() {
  const [params] = useSearchParams();

  return (
    <section>
      <h1>Your setup</h1>
      <ul>
        <li>Purpose: {params.get("purpose")}</li>
        <li>Style: {params.get("style")}</li>
        <li>Budget: €{params.get("budget")}</li>
        <li>Already owned: {params.get("owned") ?? "nothing"}</li>
      </ul>
      <Link to="/build" className="btn btn-link">Start again</Link>
    </section>
  );
}