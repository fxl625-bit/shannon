"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useId, useState } from "react";
import type { Locale, Localized } from "@/data/site";

export type ProcessStep = {
  title: Localized;
  detail: Localized;
};

export function ProcessStory({ steps, locale }: { steps: ProcessStep[]; locale: Locale }) {
  const panel = useId();
  const [active, setActive] = useState(0);
  const reduceMotion = useReducedMotion();

  return (
    <div className="mt-6">
      <ol className="process-steps">
        {steps.map((step, index) => (
          <li className="min-w-0" key={step.title.en}>
            <button
              type="button"
              aria-controls={panel}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
              className="process-step"
            >
              <span aria-hidden className="process-index">{index + 1}</span>
              {step.title[locale]}
            </button>
          </li>
        ))}
      </ol>
      <div id={panel} aria-live="polite" className="mt-4 min-h-20 rounded-xl border border-white/8 bg-black/15 px-4 py-3">
        <motion.p
          key={active}
          initial={reduceMotion ? false : { opacity: 0.45, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduceMotion ? 0 : 0.2 }}
          className="text-sm leading-7 text-[color:var(--text-secondary)]"
        >
          {steps[active].detail[locale]}
        </motion.p>
      </div>
    </div>
  );
}
