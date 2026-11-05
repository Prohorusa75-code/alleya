/* Схематичная карта: Гренландия, Баффинова Земля, Лабрадор, Ньюфаундленд.
   Очертания нарочно упрощены — это схема, а не навигационная карта. */

const LAND = "#145867";
const EDGE = "#b9d6dd";

const shapes = {
  greenland:
    "M470 0 L800 0 L800 250 L760 300 L705 345 L640 360 L600 330 L575 280 L548 238 L520 205 L500 160 L478 110 L462 55 Z",
  baffin: "M0 0 L330 0 L345 40 L320 90 L290 130 L240 170 L180 190 L120 185 L60 200 L0 210 Z",
  labrador:
    "M0 255 L70 245 L130 262 L190 250 L240 278 L270 320 L300 365 L330 405 L345 440 L320 470 L285 490 L250 520 L240 560 L0 560 Z",
  newfoundland: "M372 455 L420 432 L462 445 L478 478 L470 515 L440 540 L400 548 L378 520 L388 492 Z",
};

export function IceMap() {
  return (
    <figure className="w-full">
      <svg
        viewBox="0 0 800 560"
        className="block h-auto w-full border border-mist/40 bg-deep"
        role="img"
        aria-labelledby="map-title map-desc"
      >
        <title id="map-title">Схема Айсберговой аллеи</title>
        <desc id="map-desc">
          Айсберги откалываются от ледников Гренландии и идут на юг вдоль Лабрадора к Ньюфаундленду. Точка показывает
          условное положение льда следующего сезона.
        </desc>

        {/* сетка координат */}
        <g stroke={EDGE} strokeOpacity="0.12" strokeWidth="1">
          {[80, 160, 240, 320, 400, 480].map((y) => (
            <line key={`h${y}`} x1="0" y1={y} x2="800" y2={y} />
          ))}
          {[100, 200, 300, 400, 500, 600, 700].map((x) => (
            <line key={`v${x}`} x1={x} y1="0" x2={x} y2="560" />
          ))}
        </g>

        <g fill={LAND} stroke={EDGE} strokeWidth="1.2" strokeLinejoin="round">
          <path d={shapes.greenland} />
          <path d={shapes.baffin} />
          <path d={shapes.labrador} />
          <path d={shapes.newfoundland} />
        </g>

        {/* маршрут дрейфа */}
        <path
          d="M535 215 C470 240 410 250 380 290 C355 325 365 365 395 395 C420 418 445 425 470 440"
          fill="none"
          stroke="#eaf3f5"
          strokeWidth="2"
          strokeDasharray="7 8"
        />
        <path d="M462 432 L474 442 L460 448" fill="none" stroke="#eaf3f5" strokeWidth="2" />

        {/* лёд следующего сезона — условно */}
        <circle className="map-ping" cx="372" cy="318" r="6" fill="none" stroke="#ff5a1f" strokeWidth="2" />
        <circle cx="372" cy="318" r="6" fill="#ff5a1f" />

        <g className="map-label" fill="#eaf3f5" fontFamily="var(--font-plex), monospace" letterSpacing="2">
          <text x="600" y="150">ГРЕНЛАНДИЯ</text>
          <text x="70" y="110">БАФФИНОВА ЗЕМЛЯ</text>
          <text x="40" y="420">ЛАБРАДОР</text>
          <text x="488" y="535">НЬЮФАУНДЛЕНД</text>
          <text x="392" y="322" fill="#ff5a1f">ЛЁД СЕЗОНА</text>
        </g>
        <g className="map-note" fill="#b9d6dd" fontFamily="var(--font-plex), monospace" fontStyle="italic">
          <text x="785" y="478" textAnchor="end">Атлантический океан</text>
          <text x="420" y="238" textAnchor="middle">море Лабрадор</text>
          <text x="418" y="398">Айсберговая аллея</text>
        </g>
      </svg>
      <figcaption className="mt-3 text-sm text-mist">Схема, а не навигационная карта. Положение условное.</figcaption>
    </figure>
  );
}
