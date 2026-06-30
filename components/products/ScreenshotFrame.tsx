"use client";

import type { ReactNode } from "react";

type ScreenshotFrameProps = {
  children: ReactNode;
  frameStyle?: "browser" | "phone" | "desktop" | "dashboard" | "player";
  viewportLabel?: string;
  className?: string;
};

const frameClasses: Record<NonNullable<ScreenshotFrameProps["frameStyle"]>, string> = {
  browser:
    "rounded-[22px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] p-3 shadow-[0_22px_80px_-48px_rgba(96,165,250,0.45)]",
  phone:
    "mx-auto max-w-[280px] rounded-[32px] border border-white/12 bg-[#04060b] p-2.5 shadow-[0_24px_90px_-50px_rgba(103,232,249,0.45)]",
  desktop:
    "rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3 shadow-[0_22px_80px_-48px_rgba(167,139,250,0.45)]",
  dashboard:
    "rounded-[24px] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-3 shadow-[0_22px_80px_-48px_rgba(103,232,249,0.35)]",
  player:
    "rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(12,16,28,0.98),rgba(4,6,10,0.98))] p-3 shadow-[0_22px_80px_-48px_rgba(96,165,250,0.35)]",
};

export function ScreenshotFrame({
  children,
  frameStyle = "browser",
  viewportLabel,
  className = "",
}: ScreenshotFrameProps) {
  const isPhone = frameStyle === "phone";
  const isBrowserLike = frameStyle === "browser" || frameStyle === "desktop" || frameStyle === "dashboard";

  return (
    <div className={`relative ${className}`}>
      <div className={`relative overflow-hidden ${frameClasses[frameStyle]}`}>
        {isBrowserLike ? (
          <div className="mb-3 flex items-center justify-between rounded-[14px] border border-white/8 bg-white/[0.04] px-3 py-2">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/12" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/10" />
            </div>
            <span className="rounded-full border border-white/8 px-2 py-0.5 text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              {viewportLabel}
            </span>
          </div>
        ) : null}

        {isPhone ? (
          <div className="mb-2 flex justify-center">
            <div className="h-1.5 w-16 rounded-full bg-white/10" />
          </div>
        ) : null}

        {frameStyle === "player" ? (
          <div className="mb-3 flex items-center justify-between rounded-[16px] border border-white/8 bg-white/[0.04] px-3 py-2">
            <div className="flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-[11px] text-[color:var(--text-secondary)]">
                AI
              </span>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                {viewportLabel}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="h-1.5 w-10 rounded-full bg-white/10" />
              <span className="h-1.5 w-5 rounded-full bg-[color:var(--cyan)]/45" />
            </div>
          </div>
        ) : null}

        <div
          className={`relative overflow-hidden ${
            isPhone
              ? "rounded-[24px] border border-white/8"
              : frameStyle === "player"
                ? "rounded-[20px] border border-white/8"
                : "rounded-[18px] border border-white/8"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
