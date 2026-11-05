/* Зацикленная волна на линии воды. Узор повторяется дважды, дорожка
   сдвигается на половину своей ширины — шов не виден. */

function wavePath(amp: number, base: number, period = 200, periods = 8) {
  let d = `M0 ${base}`;
  for (let i = 0; i < periods; i++) {
    const x = i * period;
    d += ` Q${x + period / 4} ${base - amp} ${x + period / 2} ${base} T${x + period} ${base}`;
  }
  return `${d} V40 H0 Z`;
}

export function Wave() {
  return (
    <div className="pointer-events-none absolute inset-x-0 -top-10 h-10 overflow-hidden" aria-hidden="true">
      {/* дальняя волна, полупрозрачная и медленнее */}
      <svg viewBox="0 0 1600 40" preserveAspectRatio="none" className="wave-track slow absolute bottom-0 left-0 h-full w-[200%] opacity-40">
        <path d={wavePath(10, 18, 200, 8)} fill="#06232e" />
      </svg>
      <svg viewBox="0 0 1600 40" preserveAspectRatio="none" className="wave-track absolute bottom-0 left-0 h-full w-[200%]">
        <path d={wavePath(12, 26, 160, 10)} fill="#06232e" />
      </svg>
    </div>
  );
}
