"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import type { AppTool, Locale } from "@/data/site";

import { ScreenshotFrame } from "./ScreenshotFrame";

type ProductMotionPreviewProps = {
  app: AppTool;
  locale: Locale;
  priority?: boolean;
  active?: boolean;
  className?: string;
};

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);
    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  return prefersReducedMotion;
}

export function ProductMotionPreview({
  app,
  locale,
  priority = false,
  active = false,
  className = "",
}: ProductMotionPreviewProps) {
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const prefersReducedMotion = usePrefersReducedMotion();
  const imagePath = app.previewImages?.[locale] ?? app.previewImage;
  const mediaSrc = imagePath ? `${basePath}${imagePath}` : undefined;
  const videoWebm = app.previewVideoWebm ? `${basePath}${app.previewVideoWebm}` : undefined;
  const videoMp4 = app.previewVideoMp4 ? `${basePath}${app.previewVideoMp4}` : undefined;
  const hasVideo = Boolean(videoWebm || videoMp4);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(active && hasVideo);
  const showVideo = shouldLoadVideo && !prefersReducedMotion && (videoWebm || videoMp4);

  return (
    <div
      className={`group/preview relative ${className}`}
      onMouseEnter={() => {
        if (hasVideo) setShouldLoadVideo(true);
      }}
      onFocus={() => {
        if (hasVideo) setShouldLoadVideo(true);
      }}
    >
      <ScreenshotFrame
        frameStyle={app.frameStyle}
        viewportLabel={app.viewportLabel?.[locale]}
      >
        <div className="relative aspect-[16/10] overflow-hidden bg-[color:var(--bg-deep)]">
          {showVideo ? (
            <video
              className="h-full w-full object-cover"
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={mediaSrc}
            >
              {videoWebm ? <source src={videoWebm} type="video/webm" /> : null}
              {videoMp4 ? <source src={videoMp4} type="video/mp4" /> : null}
            </video>
          ) : mediaSrc ? (
            <Image
              src={mediaSrc}
              alt={app.name[locale]}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={priority}
              className={`object-cover transition-transform duration-700 ease-out ${
                active ? "scale-[1.035]" : "scale-100"
              }`}
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.12),transparent_60%)] text-[10px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
              {app.previewLabel[locale]}
            </div>
          )}

          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(4,7,13,0.05),rgba(4,7,13,0.42))]" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] opacity-50" />
          <div
            className={`pointer-events-none absolute inset-y-0 left-[-20%] w-[32%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)] transition-transform duration-1000 ${
              active ? "translate-x-[340%]" : "translate-x-0"
            }`}
          />
        </div>
      </ScreenshotFrame>
    </div>
  );
}
