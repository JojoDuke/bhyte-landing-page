"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

type DashboardSelectOption<T extends string> = {
  value: T;
  label: string;
};

export function DashboardSelect<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: DashboardSelectOption<T>[];
  onChange: (value: T) => void;
}) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listboxId = useId();
  const selected = options.find((option) => option.value === value) ?? options[0];
  const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    setMounted(true);
  }, []);

  useLayoutEffect(() => {
    if (!open || !buttonRef.current) return;

    const updatePosition = () => {
      if (!buttonRef.current) return;
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuStyle({
        position: "fixed",
        top: rect.bottom + 8,
        left: rect.left,
        width: rect.width,
      });
    };

    updatePosition();
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    const close = (event: MouseEvent) => {
      if (!buttonRef.current?.contains(event.target as Node)) {
        const menu = document.getElementById(listboxId);
        if (menu?.contains(event.target as Node)) return;
        setOpen(false);
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("mousedown", close);
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("mousedown", close);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, listboxId]);

  const menu = open && mounted ? (
    <ul
      id={listboxId}
      role="listbox"
      style={menuStyle}
      className="dashboard-select-menu z-[100] overflow-hidden rounded-xl border border-white/[0.09] bg-[#0d141f] p-1.5 shadow-[0_18px_40px_rgba(0,0,0,0.45)]"
    >
      {options.map((option, index) => {
        const active = option.value === value;
        return (
          <li
            key={option.value}
            role="option"
            aria-selected={active}
            className="dashboard-select-item"
            style={{ animationDelay: `${index * 45}ms` }}
          >
            <button
              type="button"
              className={`dashboard-select-option flex w-full cursor-pointer items-center justify-between rounded-lg px-3 py-2.5 text-left text-[0.8125rem] ${
                active
                  ? "dashboard-select-option-active bg-blue-400/10 text-blue-100"
                  : "text-zinc-300"
              }`}
              onClick={() => {
                onChange(option.value);
                setOpen(false);
              }}
            >
              <span>{option.label}</span>
              {active && <CheckIcon />}
            </button>
          </li>
        );
      })}
    </ul>
  ) : null;

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        className={`dashboard-input dashboard-select-trigger flex w-full cursor-pointer items-center justify-between text-left ${
          open ? "border-blue-400/38 bg-black/38 shadow-[0_0_0_3px_rgba(59,130,246,0.06)]" : ""
        }`}
        onClick={() => setOpen((current) => !current)}
      >
        <span>{selected.label}</span>
        <Chevron open={open} />
      </button>
      {mounted && menu ? createPortal(menu, document.body) : null}
    </>
  );
}

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      className={`dashboard-select-chevron h-3.5 w-3.5 shrink-0 text-zinc-500 ${open ? "is-open" : ""}`}
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg className="h-3.5 w-3.5 shrink-0 text-blue-300" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12l4 4L19 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
