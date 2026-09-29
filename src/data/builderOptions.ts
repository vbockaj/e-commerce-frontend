import type { Category, Purpose, Style } from "../types/product";

export const purposeOptions: { value: Purpose; label: string; emoji: string }[] = [
  { value: "studying", label: "Studying", emoji: "📚" },
  { value: "coding", label: "Coding", emoji: "💻" },
  { value: "gaming", label: "Gaming", emoji: "🎮" },
  { value: "creative", label: "Creative work", emoji: "🎨" },
  { value: "work", label: "Working from home", emoji: "💼" },
  { value: "content", label: "Content creation", emoji: "🎬" },
  { value: "general", label: "A bit of everything", emoji: "✨" },
];

export const styleOptions: { value: Style; label: string; emoji: string }[] = [
  { value: "minimal", label: "Minimal", emoji: "🤍" },
  { value: "cozy", label: "Cozy", emoji: "🕯️" },
  { value: "dark", label: "Dark", emoji: "🌙" },
  { value: "retro", label: "Retro", emoji: "📻" },
  { value: "creative", label: "Colorful", emoji: "🌈" },
  { value: "natural", label: "Natural", emoji: "🌿" },
  { value: "techy", label: "Techy", emoji: "⚡" },
];

export const budgetOptions: { value: number; label: string }[] = [
  { value: 100, label: "Up to €100" },
  { value: 200, label: "Up to €200" },
  { value: 300, label: "Up to €300" },
  { value: 500, label: "Up to €500" },
];

export const categoryOptions: { value: Category; label: string; hint: string }[] = [
  { value: "tech", label: "Tech", hint: "keyboard, mouse, headphones, laptop stand" },
  { value: "lighting", label: "Lighting", hint: "desk lamp, light strip" },
  { value: "desk-accessories", label: "Desk accessories", hint: "desk mat, monitor riser, timer" },
  { value: "organization", label: "Organization", hint: "cable clips, organizer" },
  { value: "stationery", label: "Stationery", hint: "notebooks, pens" },
  { value: "decor", label: "Decor", hint: "plants, speaker" },
];