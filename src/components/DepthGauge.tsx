"use client";

import { useEffect, useState } from "react";

const MAX_DEPTH = 240;

/* Глубина считается по середине экрана: между отметками с data-depth
   (линия воды = 0, секции −30…−210, дно = 240) — линейно. */
export function DepthGauge() {
  const [depth, setDepth] = useState<number | null>(null);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const marks = Array.from(document.querySelectorAll<HTMLElement>("[data-depth]"))
        .map((el) => ({
          y: el.getBoundingClientRect().top + window.scrollY,
          d: Number(el.dataset.depth),
        }))
        .sort((a, b) => a.y - b.y);
      if (!marks.length) return;
      const probe = window.scrollY + window.innerHeight * 0.5;
      // у самого низа страницы показываем дно, даже если секция короче экрана
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) return setDepth(MAX_DEPTH);
      if (probe < marks[0].y) return setDepth(null);
      let d = marks[marks.length - 1].d;
      for (let i = 0; i < marks.length - 1; i++) {
        const a = marks[i];
        const b = marks[i + 1];
        if (probe >= a.y && probe < b.y) {
          d = a.d + ((probe - a.y) / (b.y - a.y)) * (b.d - a.d);
          break;
        }
      }
      setDepth(Math.min(MAX_DEPTH, Math.max(0, Math.round(d))));
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const above = depth === null;
  return (
    <div
      className="fixed top-4 right-4 z-50 flex items-center gap-3 border-l-4 border-signal bg-deep px-3 py-2 font-mono text-sm text-ice sm:top-6 sm:right-6"
      aria-hidden="true"
    >
      <span className="text-mist">Глубина</span>
      <span className="min-w-[8ch] text-right font-semibold tabular-nums">
        {above ? "Над водой" : depth === 0 ? "0 м" : `−${depth} м`}
      </span>
    </div>
  );
}
