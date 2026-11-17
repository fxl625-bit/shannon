"use client";

import Image from "next/image";
import { Reveal } from "@/components/animation/Reveal";
import { useLanguage } from "@/components/language-provider";
import { site, type AppTool } from "@/data/site";

const app: AppTool | undefined = site.apps.find(item => item.slug === "yishiyuanman");
const screenshots = [
  { file: "01-record", caption: { en: "Record a reading", zh: "记录测量值" } },
  { file: "02-trends", caption: { en: "View recent trends", zh: "查看近期趋势" } },
  { file: "03-history", caption: { en: "Browse history", zh: "回看历史记录" } },
];

export function LocalLogShowcase() {
  const { locale } = useLanguage();
  const zh = locale === "zh";
  const base = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
  const media = base + "/media/locallog/";
  const prefix = zh ? "zh-CN-" : "en-US-";
  const poster = media + prefix + "01-record.png";
  if (!app?.storeUrl) return null;

  return (
    <Reveal>
      <section id="locallog" aria-labelledby="locallog-title" data-ripple-zone className="editorial-panel scroll-mt-32 p-5 sm:p-8">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_226px] lg:items-start">
          <div className="min-w-0">
            <h2 id="locallog-title" className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {zh ? "一世圆满" : "LocalLog"}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-[color:var(--text-secondary)] sm:text-base">
              {zh
                ? "集中记录血压和血糖，补录实际测量时间，并从记录回看历史与基础趋势。"
                : "Log blood pressure and glucose, edit the actual measurement time, and review history and basic trends."}
            </p>
            <a href={app.storeUrl} target="_blank" rel="noreferrer" className="editorial-link mt-4 inline-flex">
              {zh ? "前往 Google Play ↗" : "Get it on Google Play ↗"}
            </a>
            <div className="mt-7 grid grid-cols-3 gap-2 sm:gap-4">
              {screenshots.map(item => {
                const src = media + prefix + item.file + ".png";
                return (
                  <figure className="min-w-0" key={item.file}>
                    <a className="block rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-200" href={src} target="_blank" rel="noreferrer">
                      <Image src={src} alt={item.caption[locale]} width={1080} height={1920} sizes="(max-width: 640px) 30vw, 190px" className="aspect-[9/16] w-full rounded-xl border border-white/10 bg-black/30 object-contain" />
                    </a>
                    <figcaption className="mt-2 text-center text-xs leading-5 text-[color:var(--text-secondary)]">
                      {item.caption[locale]}
                    </figcaption>
                  </figure>
                );
              })}
            </div>
          </div>
          <div className="mx-auto w-full max-w-[226px]">
            <h3 id="locallog-demo" className="mb-3 text-sm font-medium text-white/85">
              {zh ? "15 秒操作演示" : "15-second walkthrough"}
            </h3>
            <video aria-labelledby="locallog-demo" className="aspect-[9/16] w-full rounded-xl border border-white/10 bg-black" poster={poster} controls playsInline preload="metadata">
              <source src={media + "demo.mp4"} type="video/mp4" />
              <a href={media + "demo.mp4"}>{zh ? "打开演示视频" : "Open the walkthrough"}</a>
            </video>
            <p className="mt-3 text-xs leading-5 text-[color:var(--text-muted)]">
              {zh ? "演示使用样例数据，展示录入、保存和查看趋势。" : "Chinese interface with sample data: enter a measurement, save it, and view the trend."}
            </p>
          </div>
        </div>
      </section>
    </Reveal>
  );
}
