import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { Category, Purpose, Style } from "../types/product";
import {
  budgetOptions,
  categoryOptions,
  purposeOptions,
  styleOptions,
} from "../data/builderOptions";

const TOTAL_STEPS = 4;

export default function Builder() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [purpose, setPurpose] = useState<Purpose | null>(null);
  const [style, setStyle] = useState<Style | null>(null);
  const [budget, setBudget] = useState<number | null>(null);
  const [owned, setOwned] = useState<Category[]>([]);

  const canContinue =
    step === 0 ? purpose !== null :
    step === 1 ? style !== null :
    step === 2 ? budget !== null :
    true;

  const toggleOwned = (category: Category) => {
    setOwned((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const finish = () => {
    const params = new URLSearchParams();
    params.set("purpose", purpose ?? "general");
    params.set("style", style ?? "minimal");
    params.set("budget", String(budget ?? 200));
    if (owned.length > 0) params.set("owned", owned.join(","));
    navigate(`/setup?${params.toString()}`);
  };

  const handleNext = () => {
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else finish();
  };

  return (
    <section className="wizard">
      <p className="wizard-progress">
        Step {step + 1} of {TOTAL_STEPS}
      </p>
      <div className="wizard-bar" aria-hidden="true">
        <div
          className="wizard-bar-fill"
          style={{ width: `${((step + 1) / TOTAL_STEPS) * 100}%` }}
        />
      </div>

      {step === 0 && (
        <fieldset className="wizard-step">
          <legend>
            <h1>What will you use your space for?</h1>
          </legend>
          <div className="options">
            {purposeOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option ${purpose === option.value ? "option--selected" : ""}`}
                aria-pressed={purpose === option.value}
                onClick={() => setPurpose(option.value)}
              >
                <span className="option-emoji" aria-hidden="true">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 1 && (
        <fieldset className="wizard-step">
          <legend>
            <h1>Which style feels like you?</h1>
          </legend>
          <div className="options">
            {styleOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option ${style === option.value ? "option--selected" : ""}`}
                aria-pressed={style === option.value}
                onClick={() => setStyle(option.value)}
              >
                <span className="option-emoji" aria-hidden="true">{option.emoji}</span>
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 2 && (
        <fieldset className="wizard-step">
          <legend>
            <h1>What is your budget?</h1>
          </legend>
          <div className="options">
            {budgetOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option ${budget === option.value ? "option--selected" : ""}`}
                aria-pressed={budget === option.value}
                onClick={() => setBudget(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </fieldset>
      )}

      {step === 3 && (
        <fieldset className="wizard-step">
          <legend>
            <h1>What do you already own?</h1>
          </legend>
          <p className="wizard-hint">
            Pick everything you already have. We will skip those categories. You can also pick nothing.
          </p>
          <div className="options">
            {categoryOptions.map((option) => (
              <button
                key={option.value}
                type="button"
                className={`option option--column ${owned.includes(option.value) ? "option--selected" : ""}`}
                aria-pressed={owned.includes(option.value)}
                onClick={() => toggleOwned(option.value)}
              >
                <strong>{option.label}</strong>
                <span className="option-hint">{option.hint}</span>
              </button>
            ))}
          </div>
        </fieldset>
      )}

      <div className="wizard-actions">
        {step > 0 ? (
          <button type="button" className="btn btn-secondary" onClick={() => setStep(step - 1)}>
            Back
          </button>
        ) : (
          <span />
        )}
        <button type="button" className="btn" onClick={handleNext} disabled={!canContinue}>
          {step === TOTAL_STEPS - 1 ? "Build my nook" : "Next"}
        </button>
      </div>
    </section>
  );
}