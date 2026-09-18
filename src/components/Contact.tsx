"use client";

import { useState } from "react";
import { AccentText } from "@/components/AccentText";
import { Reveal } from "@/components/MotionRoot";
import { ContactAccentLine } from "@/components/HeroAccentLine";
import { contactSection, siteMeta } from "@/content/site";

export function Contact() {
  const [feedback, setFeedback] = useState<string | null>(null);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(siteMeta.email);
      setFeedback(contactSection.copySuccess);
    } catch {
      setFeedback(contactSection.copyFailure);
    }
  };

  return (
    <section id="contact" className="section-space pb-8">
      <Reveal className="page-wrap">
        <span className="type-marker">{contactSection.marker}</span>
        <h2 className="type-section mt-4 text-[clamp(2.3rem,6vw,4.1rem)]">
          {contactSection.titleBefore}
          <span className="inline-flex flex-col items-start">
            <em className="serif-accent">{contactSection.titleAccent}</em>
            <ContactAccentLine />
          </span>
        </h2>
        <div className="prose-stack mt-5 max-w-2xl">
          <p className="type-prose text-text-secondary">
            <AccentText parts={contactSection.bodyParts} />
          </p>
          <p className="type-card">{contactSection.supportingPrompt}</p>
          <p className="type-caption">{contactSection.location}</p>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <a
            href={`mailto:${siteMeta.email}`}
            className="inline-flex min-h-11 items-center rounded-[3px] bg-ink px-5 py-3 text-[0.9375rem] font-semibold text-paper no-underline transition-colors duration-200 hover:bg-orange"
          >
            {contactSection.primaryAction}
          </a>
          <button
            type="button"
            className="min-h-11 rounded-[3px] border border-rule px-4 text-[0.9375rem] font-semibold text-ink transition-colors duration-200 hover:border-orange hover:text-orange"
            onClick={copyEmail}
          >
            {contactSection.copyEmail}
          </button>
        </div>

        <a
          href={`mailto:${siteMeta.email}`}
          className="link-arrow mt-6 inline-block max-w-full break-all border-b border-orange pb-1 text-[0.9375rem] text-ink no-underline transition-colors duration-200 hover:text-orange"
        >
          {siteMeta.email}{" "}
          <span data-arrow aria-hidden>
            ↗
          </span>
        </a>

        {feedback ? (
          <p className="type-caption mt-3" role="status" aria-live="polite">
            {feedback}
          </p>
        ) : null}

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.9375rem] font-semibold">
          <a
            href={siteMeta.github}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow text-ink no-underline transition-colors duration-200 hover:text-orange"
          >
            GitHub{" "}
            <span data-arrow aria-hidden>
              ↗
            </span>
          </a>
          <a
            href={siteMeta.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="link-arrow text-ink no-underline transition-colors duration-200 hover:text-orange"
          >
            LinkedIn{" "}
            <span data-arrow aria-hidden>
              ↗
            </span>
          </a>
          <a
            href={siteMeta.resumePath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-ink no-underline transition-colors duration-200 hover:text-orange"
          >
            {contactSection.viewResume}
          </a>
          <a
            href={siteMeta.resumePath}
            download={siteMeta.resumeFilename}
            className="text-text-secondary no-underline transition-colors duration-200 hover:text-orange"
          >
            {contactSection.downloadResume}
          </a>
        </div>
      </Reveal>
    </section>
  );
}
