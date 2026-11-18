"use client";

import { useMemo, useState } from "react";

export type SkillOsCategory = "all" | "workflow" | "atomic" | "bridge" | "orchestrator";

export type SkillOsItem = {
  id: string;
  name: { en: string; zh: string };
  category: Exclude<SkillOsCategory, "all">;
  description: { en: string; zh: string };
  outputs?: { en: string[]; zh: string[] };
};

export type SkillOsStat = {
  count: number;
  label: { en: string; zh: string };
  description: { en: string; zh: string };
  category: Exclude<SkillOsCategory, "all">;
};

const categoryLabels: Record<SkillOsCategory, { en: string; zh: string }> = {
  all: { en: "All", zh: "\u5168\u90e8" },
  workflow: { en: "Workflows", zh: "\u5de5\u4f5c\u6d41" },
  atomic: { en: "Atomic Skills", zh: "\u539f\u5b50\u80fd\u529b" },
  bridge: { en: "Bridges", zh: "\u6865\u63a5\u80fd\u529b" },
  orchestrator: { en: "Orchestrator", zh: "\u7f16\u6392\u5668" },
};

export function SkillOS({
  items,
  stats,
  inventoryDate,
  locale,
}: {
  items: SkillOsItem[];
  stats: SkillOsStat[];
  inventoryDate: string;
  locale: "en" | "zh";
}) {
  const [activeCategory, setActiveCategory] = useState<SkillOsCategory>("all");

  const filteredItems = useMemo(() => {
    return activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const visibleStats =
    activeCategory === "all"
      ? stats
      : stats.filter((item) => item.category === activeCategory);
  const packageTotal = stats.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="space-y-6">
      <div className="space-y-5">
        <div className="rounded-[30px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-5 sm:p-6">
          <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
            {locale === "zh" ? "技能库" : "Skill Library"}
          </h2>
          <p className="mt-3 text-sm text-[color:var(--text-secondary)]">
            <strong className="mr-1 text-2xl text-cyan-100">{packageTotal}</strong>
            {locale === "zh" ? "个规范 Skill 包" : " canonical Skill packages"}
          </p>
          <p className="mt-1 text-xs leading-5 text-[color:var(--text-muted)]">
            {locale === "zh" ? "按 Obsidian 的技能包目录去重统计" : "Deduplicated across the canonical Obsidian package folders"} · <time dateTime={inventoryDate}>{inventoryDate}</time>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {(Object.keys(categoryLabels) as SkillOsCategory[]).map((category) => {
              const active = category === activeCategory;
              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full border px-3 py-2 text-xs transition-colors ${
                    active
                      ? "border-white/16 bg-white/[0.08] text-[color:var(--text-primary)]"
                      : "border-white/8 bg-white/[0.03] text-[color:var(--text-muted)]"
                  }`}
                >
                  {categoryLabels[category][locale]}
                </button>
              );
            })}
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {visibleStats.map((stat) => (
              <div
                key={stat.label.en}
                className="rounded-[22px] border border-white/8 bg-white/[0.03] p-4"
              >
                <p className="text-2xl text-[color:var(--text-primary)]">{stat.count}</p>
                <p className="mt-1 text-sm text-[color:var(--text-primary)]">
                  {stat.label[locale]}
                </p>
                <p className="mt-2 text-xs leading-6 text-[color:var(--text-muted)]">
                  {stat.description[locale]}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>

      <div className="rounded-[30px] border border-[color:var(--border)] bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
          {locale === "zh" ? "精选示例" : "Selected examples"} · {filteredItems.length}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => (
              <article
                key={item.id}
                className="rounded-[24px] border border-white/8 bg-white/[0.03] p-4 text-[color:var(--text-secondary)] transition-colors duration-300 hover:border-cyan-300/22 hover:bg-cyan-300/[0.04]"
              >
                <h3 className="text-sm font-medium text-[color:var(--text-primary)]">{item.name[locale]}</h3>
                <p className="mt-3 text-xs leading-6 text-[color:var(--text-muted)]">
                  {item.description[locale]}
                </p>
                <div className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  {categoryLabels[item.category][locale]}
                </div>
                {item.outputs?.[locale].length ? (
                  <p className="mt-2 text-xs leading-6 text-cyan-100/80">{item.outputs[locale].join(" · ")}</p>
                ) : null}
              </article>
          ))}
        </div>
      </div>
    </section>
  );
}
