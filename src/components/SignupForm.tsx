"use client";

import { useId, useRef, useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/* Логика формы листа ожидания: проверка почты, короткое «отправляем»,
   итоговое сообщение. Бэкенда нет — адрес сохраняется только в браузере. */
export function SignupForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [email, setEmail] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const id = useId();
  const errorId = `${id}-error`;

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "loading") return;
    if (!EMAIL_RE.test(email.trim())) {
      setStatus("error");
      inputRef.current?.focus();
      return;
    }
    setStatus("loading");
    window.setTimeout(() => {
      try {
        localStorage.setItem("alleya-waitlist", email.trim());
      } catch {
        /* хранилище недоступно — не страшно, это демо */
      }
      setStatus("success");
    }, 900);
  }

  if (status === "success") {
    return (
      <p role="status" className="font-display text-5xl leading-none font-extrabold text-ice uppercase sm:text-7xl">
        Записали. <span className="text-signal">Теперь ждём вместе с вами.</span>
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-2xl">
      <label htmlFor={id} className="mb-2 block text-sm text-mist">
        Почта
      </label>
      <div className="flex flex-col gap-3 sm:flex-row sm:gap-0">
        <input
          ref={inputRef}
          id={id}
          type="email"
          name="email"
          inputMode="email"
          autoComplete="email"
          required
          placeholder="you@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (status === "error") setStatus("idle");
          }}
          aria-invalid={status === "error"}
          aria-describedby={status === "error" ? errorId : undefined}
          className="h-14 w-full min-w-0 border-2 border-ice bg-deep px-4 font-mono text-base text-ice placeholder:text-mist/70 focus-visible:outline-offset-0 sm:flex-1"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="h-14 shrink-0 border-2 border-signal bg-signal px-8 font-mono text-base font-semibold text-deep transition-colors hover:border-ice hover:bg-ice disabled:cursor-wait disabled:opacity-80"
        >
          {status === "loading" ? "Записываем…" : "Записаться"}
        </button>
      </div>
      <p id={errorId} role="alert" className="mt-3 min-h-6 text-sm text-signal">
        {status === "error" ? "Проверьте адрес: похоже, в нём ошибка." : ""}
      </p>
    </form>
  );
}
