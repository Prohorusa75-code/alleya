"use client";

import { useEffect, useState } from "react";

function plural(n: number) {
  const m10 = n % 10;
  const m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return "день";
  if (m10 >= 2 && m10 <= 4 && (m100 < 12 || m100 > 14)) return "дня";
  return "дней";
}

/* Дней до ближайшего 25 апреля. Считаем в браузере, чтобы число
   не застывало на дате сборки. */
function daysToSeason(now = new Date()) {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let target = new Date(today.getFullYear(), 3, 25);
  if (today > target) target = new Date(today.getFullYear() + 1, 3, 25);
  return Math.round((target.getTime() - today.getTime()) / 86_400_000);
}

export function Countdown() {
  const [days, setDays] = useState<number | null>(null);
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- дата известна только в браузере
    setDays(daysToSeason());
  }, []);

  return (
    <strong className="border-b-4 border-signal font-semibold whitespace-nowrap text-deep">
      {days === null ? "…" : days === 0 ? "сегодня" : `${days} ${plural(days)}`}
    </strong>
  );
}
