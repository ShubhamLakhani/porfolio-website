"use client";

import { useEffect, useId, useRef, useState } from "react";
import { NAV_BREAKPOINT_PX, navigation, siteMeta } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia(`(min-width: ${NAV_BREAKPOINT_PX}px)`);
    const onChange = () => {
      if (media.matches) setOpen(false);
    };
    onChange();
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-rule bg-paper/95 backdrop-blur-sm">
      <div
        className="header-progress"
        aria-hidden="true"
      />
      <div className="page-wrap flex min-h-[var(--header-h)] items-center justify-between gap-4">
        <a
          href="#top"
          className="flex items-center gap-2.5 text-[0.9375rem] font-bold leading-tight text-ink no-underline transition-colors duration-200 hover:text-orange"
        >
          <span className="pr-1.5 text-[1.6rem] tracking-[-0.18em]" aria-hidden>
            {siteMeta.wordmark}
          </span>
          <span>
            Shubham
            <br />
            Lakhani
          </span>
        </a>

        <nav
          className="hidden items-center gap-6 text-[0.9375rem] font-semibold min-[960px]:flex"
          aria-label="Portfolio navigation"
        >
          {navigation.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="type-nav text-ink no-underline transition-colors duration-200 hover:text-orange"
            >
              {link.label}
            </a>
          ))}
          <a
            href={navigation.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="type-nav text-text-secondary no-underline transition-colors duration-200 hover:text-orange"
          >
            {navigation.resume.label}
          </a>
          <a
            href={navigation.contact.href}
            className="link-arrow type-nav border-b border-current pb-2 text-ink no-underline transition-colors duration-200 hover:text-orange"
          >
            {navigation.contact.label}{" "}
            <span data-arrow aria-hidden>
              ↗
            </span>
          </a>
        </nav>

        <button
          ref={buttonRef}
          type="button"
          className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-[3px] border border-rule px-3 text-[0.9375rem] font-semibold text-ink min-[960px]:hidden"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={open ? navigation.closeMenu : navigation.openMenu}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      <div
        id={panelId}
        className={`border-t border-rule bg-paper min-[960px]:hidden ${open ? "block" : "hidden"}`}
        hidden={!open}
      >
        <nav className="page-wrap flex flex-col gap-1 py-4" aria-label="Mobile">
          {navigation.links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="min-h-11 py-3 text-base font-semibold text-ink no-underline"
              onClick={close}
            >
              {link.label}
            </a>
          ))}
          <a
            href={navigation.resume.href}
            target="_blank"
            rel="noopener noreferrer"
            className="min-h-11 py-3 text-base font-semibold text-text-secondary no-underline"
            onClick={close}
          >
            {navigation.resume.label}
          </a>
          <a
            href={navigation.contact.href}
            className="min-h-11 py-3 text-base font-semibold text-orange no-underline"
            onClick={close}
          >
            {navigation.contact.label}
          </a>
        </nav>
      </div>
    </header>
  );
}
