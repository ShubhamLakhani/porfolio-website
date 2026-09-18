"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
} from "react";
import { workSection } from "@/content/site";
import type { ProjectImage } from "@/content/types";
import { MOTION, prefersReducedMotion } from "@/lib/motion";

type ProjectGalleryProps = {
  projectName: string;
  images: ProjectImage[];
  priority?: boolean;
};

function previewFrameStyle(image: ProjectImage): CSSProperties {
  const visibleHeight = Math.max(image.height - image.cropTopPx, 1);
  const cropFraction = image.cropTopPx / image.height;
  return {
    aspectRatio: `${image.width} / ${visibleHeight}`,
    ["--crop-top" as string]: `${cropFraction * 100}%`,
  };
}

export function ProjectGallery({
  projectName,
  images,
  priority = false,
}: ProjectGalleryProps) {
  const [selected, setSelected] = useState(0);
  const [display, setDisplay] = useState(0);
  const [incoming, setIncoming] = useState<number | null>(null);
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const previewTriggerRef = useRef<HTMLButtonElement>(null);
  const textTriggerRef = useRef<HTMLButtonElement>(null);
  const lastTriggerRef = useRef<HTMLButtonElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const switchToken = useRef(0);
  const titleId = useId();
  const image = images[display] ?? images[0];
  const multi = images.length > 1;

  const closeLightbox = useCallback(() => {
    setOpen(false);
    dialogRef.current?.close();
    lastTriggerRef.current?.focus();
  }, []);

  const openLightbox = (trigger: HTMLButtonElement | null) => {
    lastTriggerRef.current = trigger;
    setOpen(true);
    dialogRef.current?.showModal();
    queueMicrotask(() => closeButtonRef.current?.focus());
  };

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => setOpen(false);
    dialog.addEventListener("close", onClose);
    return () => dialog.removeEventListener("close", onClose);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const el = visualRef.current;
    if (!el) return;
    const markEntered = () => el.classList.add("is-entered");
    if (prefersReducedMotion()) {
      markEntered();
      return;
    }
    const bounds = el.getBoundingClientRect();
    if (bounds.top < window.innerHeight * 0.92 && bounds.bottom > 0) {
      markEntered();
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          markEntered();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -18% 0px", threshold: 0 },
    );
    observer.observe(el);
    const onHash = () => {
      const id = window.location.hash.slice(1);
      const article = el.closest("article");
      if (article && id && article.id === id) markEntered();
    };
    window.addEventListener("hashchange", onHash);
    onHash();
    return () => {
      observer.disconnect();
      window.removeEventListener("hashchange", onHash);
    };
  }, []);

  const selectImage = async (index: number) => {
    if (index === selected && incoming === null) return;
    const token = ++switchToken.current;
    setSelected(index);
    if (prefersReducedMotion()) {
      setDisplay(index);
      setIncoming(null);
      return;
    }
    setIncoming(index);
    const next = images[index];
    if (next) {
      try {
        const img = new window.Image();
        img.src = next.src;
        if (typeof img.decode === "function") await img.decode();
        else await new Promise((resolve) => {
          img.onload = resolve;
          img.onerror = resolve;
        });
      } catch {
        /* keep previous until swap */
      }
    }
    if (token !== switchToken.current) return;
    window.setTimeout(() => {
      if (token !== switchToken.current) return;
      setDisplay(index);
      setIncoming(null);
    }, MOTION.crossfade);
  };

  const step = (delta: number) => {
    void selectImage((selected + delta + images.length) % images.length);
  };

  const onDialogKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "Tab" && dialogRef.current) {
      const focusables = [
        ...dialogRef.current.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ].filter((el) => !el.hasAttribute("disabled"));
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && active === first) {
        event.preventDefault();
        last.focus();
        return;
      }
      if (!event.shiftKey && active === last) {
        event.preventDefault();
        first.focus();
        return;
      }
    }
    if (!multi) return;
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
  };

  const renderLayer = (img: ProjectImage, layer: "base" | "next") => (
    <div
      className={`project-image-layer ${layer === "next" ? "is-incoming" : "is-base"}`}
      style={previewFrameStyle(img)}
    >
      <div className="project-crop-wrap">
        <Image
          src={img.src}
          alt={img.alt}
          width={img.width}
          height={img.height}
          priority={priority && layer === "base"}
          sizes="(max-width: 768px) 100vw, 58vw"
          className="project-frame-img"
        />
      </div>
    </div>
  );

  const shown = images[display] ?? images[0];
  const nextImg = incoming !== null ? images[incoming] : null;

  return (
    <div>
      <div ref={visualRef} className="project-visual">
        <div className="project-frame ring-1 ring-white/10">
          <div className="project-hover-zoom">
            <button
              ref={previewTriggerRef}
              type="button"
              className="project-preview-trigger work-interactive"
              aria-label={`${workSection.openPreview}: ${projectName}`}
              onClick={() => openLightbox(previewTriggerRef.current)}
            >
              <span className="project-layers" style={previewFrameStyle(shown)}>
                {renderLayer(shown, "base")}
                {nextImg ? renderLayer(nextImg, "next") : null}
              </span>
              <span className="project-expand-icon" aria-hidden>
                ↗
              </span>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
        <p className="type-caption m-0 max-w-xl text-ink-text-secondary">
          {image.caption}
        </p>
        <button
          ref={textTriggerRef}
          type="button"
          className="work-interactive min-h-11 text-[0.9375rem] font-semibold text-paper underline-offset-4 transition-colors duration-200 hover:text-sage hover:underline"
          onClick={() => openLightbox(textTriggerRef.current)}
        >
          {workSection.viewLarger}
        </button>
      </div>

      {multi ? (
        <div
          className="mt-4 flex flex-wrap gap-2"
          role="group"
          aria-label={`${projectName} images`}
        >
          {images.map((item, index) => {
            const active = index === selected;
            return (
              <button
                key={item.src}
                type="button"
                aria-pressed={active}
                aria-label={`Image ${index + 1} of ${images.length}`}
                className={`work-interactive min-h-11 rounded-[3px] px-3 text-[0.875rem] font-semibold transition-colors duration-200 ${
                  active
                    ? "bg-sage text-ink"
                    : "bg-white/5 text-ink-text-secondary hover:bg-white/10 hover:text-paper"
                }`}
                onClick={() => {
                  void selectImage(index);
                }}
              >
                {index === 0 ? "Overview" : "Detail"} {index + 1}
              </button>
            );
          })}
        </div>
      ) : null}

      <dialog
        data-surface="ink"
        ref={dialogRef}
        className="work-surface m-auto w-[min(96vw,1100px)] max-h-[92vh] overflow-auto rounded-[4px] border-0 bg-ink p-0 text-paper shadow-2xl backdrop:bg-black/70"
        aria-labelledby={titleId}
        onKeyDown={onDialogKeyDown}
        onClick={(event) => {
          if (event.target === dialogRef.current) closeLightbox();
        }}
      >
        <div className="flex items-center justify-between gap-4 border-b border-ink-rule px-4 py-3">
          <h2 id={titleId} className="m-0 text-[0.9375rem] font-semibold">
            {projectName}: Image {selected + 1} of {images.length}
          </h2>
          <button
            ref={closeButtonRef}
            type="button"
            className="work-interactive min-h-11 min-w-11 text-[0.9375rem] font-semibold text-paper transition-colors duration-200 hover:text-sage"
            aria-label={workSection.closeImage}
            onClick={closeLightbox}
          >
            Close
          </button>
        </div>
        <div className="bg-black px-2 py-3 sm:px-4">
          <Image
            src={(images[selected] ?? image).src}
            alt={(images[selected] ?? image).alt}
            width={(images[selected] ?? image).width}
            height={(images[selected] ?? image).height}
            sizes="96vw"
            className="mx-auto h-auto w-full max-h-[70vh] object-contain"
          />
          <p className="type-caption mx-auto mt-3 max-w-3xl px-2 text-center text-ink-text-secondary">
            {(images[selected] ?? image).caption}
          </p>
        </div>
        {multi ? (
          <div className="flex items-center justify-between gap-3 border-t border-ink-rule px-4 py-3">
            <button
              type="button"
              className="work-interactive min-h-11 px-2 text-[0.875rem] font-semibold text-paper hover:text-sage"
              onClick={() => step(-1)}
            >
              {workSection.previousImage}
            </button>
            <span className="font-mono text-[0.75rem] text-ink-text-secondary">
              {selected + 1} / {images.length}
            </span>
            <button
              type="button"
              className="work-interactive min-h-11 px-2 text-[0.875rem] font-semibold text-paper hover:text-sage"
              onClick={() => step(1)}
            >
              {workSection.nextImage}
            </button>
          </div>
        ) : null}
      </dialog>
    </div>
  );
}
