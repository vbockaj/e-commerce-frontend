import { useMemo, useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import type { Category, Purpose, Style } from "../types/product";
import {
  budgetOptions,
  categoryOptions,
  purposeOptions,
  styleOptions,
} from "../data/builderOptions";
import { findAlternatives, recommendSetup } from "../utils/recommendSetup";
import { useCart } from "../cart/useCart";
import DeskScene from "../components/DeskScene";

const validCategories = categoryOptions.map((o) => o.value);

const EXAMPLE = {
  purpose: "coding" as Purpose,
  style: "dark" as Style,
  budget: 200,
};

function parseOwned(raw: string): Category[] {
  return raw
    .split(",")
    .map((v) => v.trim())
    .filter((v): v is Category => validCategories.includes(v as Category));
}

function labelOf<T extends string>(list: { value: T; label: string }[], value: T) {
  return list.find((o) => o.value === value)?.label ?? value;
}

export default function Setup() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const { add } = useCart();

  const paramPurpose = purposeOptions.find((o) => o.value === params.get("purpose"))
    ?.value as Purpose | undefined;
  const paramStyle = styleOptions.find((o) => o.value === params.get("style"))
    ?.value as Style | undefined;
  const budgetNumber = Number(params.get("budget"));
  const paramBudget = budgetOptions.some((o) => o.value === budgetNumber)
    ? budgetNumber
    : undefined;

  const isExample = !paramPurpose || !paramStyle || paramBudget === undefined;

  const purpose = isExample ? EXAMPLE.purpose : paramPurpose;
  const style = isExample ? EXAMPLE.style : paramStyle;
  const budget = isExample ? EXAMPLE.budget : paramBudget;

  const ownedKey = params.getAll("owned").join(",");
  const owned = useMemo(
    () => (isExample ? [] : parseOwned(ownedKey)),
    [isExample, ownedKey]
  );

  const recommended = useMemo(
    () => recommendSetup(purpose, style, budget, owned),
    [purpose, style, budget, owned]
  );

  const cycles = useMemo(
    () =>
      recommended.items.map((original) => ({
        original,
        options: [original, ...findAlternatives(original, purpose, style)],
      })),
    [recommended, purpose, style]
  );

  const [swapIndex, setSwapIndex] = useState<Record<number, number>>({});

  const shown = cycles.map(({ original, options }) => ({
    original,
    options,
    product: options[(swapIndex[original.id] ?? 0) % options.length],
  }));

  const total = shown.reduce((sum, s) => sum + s.product.price, 0);
  const overBudget = total > budget;

  const swap = (originalId: number) =>
    setSwapIndex((prev) => ({ ...prev, [originalId]: (prev[originalId] ?? 0) + 1 }));

  const addAll = () => {
    shown.forEach((s) => add(s.product));
    navigate("/cart");
  };

  return (
    <section>
      <h1>{isExample ? "Example setup" : "Your setup"}</h1>

      {isExample && (
        <div role="note" className="setup-note">
          <p className="setup-note-text">
            <strong>This is just an example.</strong> To get a setup made for
            you, finish the builder first: pick your purpose, style, budget and
            what you already own, and we'll build your personal setup from your
            answers.
          </p>
          <Link to="/build" className="btn btn-link">
            Go to the builder
          </Link>
        </div>
      )}

      <ul>
        <li>Purpose: {labelOf(purposeOptions, purpose)}</li>
        <li>Style: {labelOf(styleOptions, style)}</li>
        <li>Budget: €{budget}</li>
        <li>
          Already owned:{" "}
          {owned.length
            ? owned.map((c) => labelOf(categoryOptions, c)).join(", ")
            : "nothing"}
        </li>
      </ul>

      {shown.length === 0 ? (
        <p>
          We couldn't find anything that fits. Try a bigger budget, a different
          style, or fewer owned categories.
        </p>
      ) : (
        <>
          <DeskScene
            entries={shown.map((s) => ({
              key: s.original.id,
              product: s.product,
            }))}
          />

          <h2>Recommended items</h2>
          <ul className="setup-list">
            {shown.map(({ original, options, product }) => (
              <li key={original.id} className="setup-item">
                <span className="setup-emoji">{product.emoji}</span>
                <div className="setup-item-info">
                  <Link to={`/product/${product.id}`}>
                    <strong>{product.title}</strong>
                  </Link>
                  <div>{product.description}</div>
                </div>
                <strong className="setup-item-price">€{product.price}</strong>
                {options.length > 1 && (
                  <button
                    type="button"
                    className="btn btn-secondary"
                    onClick={() => swap(original.id)}
                  >
                    Swap
                  </button>
                )}
              </li>
            ))}
          </ul>

          <p>
            <strong>
              Total: €{total} / €{budget}
            </strong>
            {overBudget && (
              <span className="setup-over"> — over budget after swaps</span>
            )}
          </p>

          <button type="button" className="btn" onClick={addAll}>
            Add entire setup to cart
          </button>
        </>
      )}

      <p>
        <Link to="/build" className="btn btn-secondary btn-link">
          {isExample ? "Build my own setup" : "Start again"}
        </Link>
      </p>
    </section>
  );
}