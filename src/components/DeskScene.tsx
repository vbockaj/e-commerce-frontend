import { useRef, useState } from "react";

type Pos = { x: number; y: number };

type Entry = {
  key: number;
  product: { id: number; title: string; emoji: string };
};

// Starting spots (in % of the desk), used in order for the items
const SLOTS: Pos[] = [
  { x: 50, y: 52 },
  { x: 20, y: 72 },
  { x: 80, y: 70 },
  { x: 50, y: 80 },
  { x: 85, y: 48 },
  { x: 15, y: 48 },
  { x: 35, y: 62 },
  { x: 65, y: 60 },
];

const MIN_X = 5;
const MAX_X = 95;
const MIN_Y = 36; // keeps items off the wall
const MAX_Y = 92;

const clamp = (n: number, min: number, max: number) =>
  Math.min(max, Math.max(min, n));

export default function DeskScene({ entries }: { entries: Entry[] }) {
  const deskRef = useRef<HTMLDivElement>(null);
  const [positions, setPositions] = useState<Record<number, Pos>>({});
  const [dragKey, setDragKey] = useState<number | null>(null);

  const getPos = (key: number, index: number): Pos =>
    positions[key] ?? SLOTS[index % SLOTS.length];

  const setPos = (key: number, pos: Pos) =>
    setPositions((prev) => ({ ...prev, [key]: pos }));

  const handleMove = (e: React.PointerEvent, key: number) => {
    if (dragKey !== key || !deskRef.current) return;
    const rect = deskRef.current.getBoundingClientRect();
    setPos(key, {
      x: clamp(((e.clientX - rect.left) / rect.width) * 100, MIN_X, MAX_X),
      y: clamp(((e.clientY - rect.top) / rect.height) * 100, MIN_Y, MAX_Y),
    });
  };

  const handleKey = (e: React.KeyboardEvent, key: number, current: Pos) => {
    const step = 2;
    const delta: Record<string, Pos> = {
      ArrowLeft: { x: -step, y: 0 },
      ArrowRight: { x: step, y: 0 },
      ArrowUp: { x: 0, y: -step },
      ArrowDown: { x: 0, y: step },
    };
    const d = delta[e.key];
    if (!d) return;
    e.preventDefault();
    setPos(key, {
      x: clamp(current.x + d.x, MIN_X, MAX_X),
      y: clamp(current.y + d.y, MIN_Y, MAX_Y),
    });
  };

  return (
    <div className="desk-scene">
      <div className="desk" ref={deskRef}>
        <div className="desk-wall" aria-hidden="true" />
        <div className="desk-plant" aria-hidden="true" />
        <div className="desk-mat" aria-hidden="true" />
        {entries.map(({ key, product }, i) => {
          const pos = getPos(key, i);
          return (
            <button
              key={key}
              type="button"
              className={`desk-item${dragKey === key ? " desk-item--dragging" : ""}`}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              aria-label={`${product.title}. Drag or use arrow keys to move.`}
              onPointerDown={(e) => {
                e.currentTarget.setPointerCapture(e.pointerId);
                setDragKey(key);
              }}
              onPointerMove={(e) => handleMove(e, key)}
              onPointerUp={() => setDragKey(null)}
              onPointerCancel={() => setDragKey(null)}
              onKeyDown={(e) => handleKey(e, key, pos)}
            >
              <span className="desk-item-emoji">{product.emoji}</span>
              <span className="desk-item-label">{product.title}</span>
            </button>
          );
        })}
      </div>
      <div className="desk-toolbar">
        <p className="desk-hint">Drag the items to arrange your desk.</p>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={() => setPositions({})}
        >
          Reset layout
        </button>
      </div>
    </div>
  );
}