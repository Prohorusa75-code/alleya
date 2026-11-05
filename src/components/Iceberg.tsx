import { DEEP_H, DEEP_W, TIP_H, TIP_W, deepFacets, tipFacets } from "@/lib/iceberg";

/* Обе части айсберга одной ширины и по центру — края у линии воды совпадают. */
export const BERG_WIDTH = "w-[min(1200px,135vw)]";

export function IcebergTip({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${TIP_W} ${TIP_H}`}
      className={`${BERG_WIDTH} block h-auto ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {tipFacets().map((f, i) => (
        <polygon key={i} points={f.points} fill={f.fill} stroke={f.fill} strokeWidth={0.8} strokeLinejoin="round" />
      ))}
    </svg>
  );
}

export function IcebergDeep({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox={`0 0 ${DEEP_W} ${DEEP_H}`}
      preserveAspectRatio="none"
      className={`${BERG_WIDTH} block ${className}`}
      aria-hidden="true"
      focusable="false"
    >
      {deepFacets().map((f, i) => (
        <polygon
          key={i}
          points={f.points}
          fill={f.fill}
          stroke={f.fill}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
          strokeLinejoin="round"
        />
      ))}
    </svg>
  );
}
