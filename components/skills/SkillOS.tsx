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
  const [selectedId, setSelectedId] = useState(items[0]?.id ?? "");

  const filteredItems = useMemo(() => {
    return activeCategory === "all"
      ? items
      : items.filter((item) => item.category === activeCategory);
  }, [activeCategory, items]);

  const selectedSkill =
    filteredItems.find((item) => item.id === selectedId) ??
    filteredItems[0] ??
    items[0];

  const visibleStats =
    activeCategory === "all"
      ? stats
      : stats.filter((item) => item.category === activeCategory);
  const packageTotal = stats.reduce((sum, item) => sum + item.count, 0);

  return (
    <section className="grid gap-6 xl:grid-cols-[0.42fr_0.58fr]">
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
                  onClick={() => {
                    setActiveCategory(category);
                    const nextItem =
                      category === "all"
                        ? items[0]
                        : items.find((item) => item.category === category);
                    if (nextItem) setSelectedId(nextItem.id);
                  }}
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

          <div className="mt-5 grid gap-3 sm:grid-cols-2">
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

        {selectedSkill ? (
          <div className="rounded-[30px] border border-[color:var(--border)] bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5 sm:p-6">
            <p className="text-[11px] uppercase tracking-[0.2em] text-[color:var(--text-muted)]">
              {locale === "zh" ? "\u5f53\u524d\u8282\u70b9" : "Selected Node"}
            </p>
            <h3 className="mt-3 text-2xl text-[color:var(--text-primary)]">
              {selectedSkill.name[locale]}
            </h3>
            <p className="mt-3 text-sm leading-7 text-[color:var(--text-secondary)]">
              {selectedSkill.description[locale]}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-cyan-100">
                {categoryLabels[selectedSkill.category][locale]}
              </span>
            </div>
            {selectedSkill.outputs?.[locale].length ? (
              <div className="mt-5">
                <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--text-muted)]">
                  {locale === "zh" ? "\u8f93\u51fa\u503e\u5411" : "Output Tendency"}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {selectedSkill.outputs[locale].map((output) => (
                    <span
                      key={output}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 text-[12px] text-[color:var(--text-secondary)]"
                    >
                      {output}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="rounded-[30px] border border-[color:var(--border)] bg-[radial-gradient(circle_at_top,rgba(103,232,249,0.08),transparent_28%),linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.015))] p-5 sm:p-6">
        <h2 className="text-xl font-semibold text-[color:var(--text-primary)]">
          {locale === "zh" ? "精选示例" : "Selected examples"} · {filteredItems.length}
        </h2>
        <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
          {filteredItems.map((item) => {
            const active = item.id === selectedSkill?.id;
            return (
              <button
                key={item.id}
                type="button"
                onMouseEnter={() => setSelectedId(item.id)}
                onFocus={() => setSelectedId(item.id)}
                onClick={() => setSelectedId(item.id)}
                className={`rounded-[24px] border p-4 text-left transition-all duration-300 ${
                  active
                    ? "border-cyan-300/22 bg-cyan-300/10 text-[color:var(--text-primary)] shadow-[0_18px_80px_-55px_rgba(103,232,249,0.55)]"
                    : "border-white/8 bg-white/[0.03] text-[color:var(--text-secondary)]"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-medium">{item.name[locale]}</p>
                  <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-[color:var(--cyan)]" : "bg-white/12"}`} />
                </div>
                <p className="mt-3 text-xs leading-6 text-[color:var(--text-muted)]">
                  {item.description[locale]}
                </p>
                <div className="mt-4 text-[10px] uppercase tracking-[0.16em] text-[color:var(--text-muted)]">
                  {categoryLabels[item.category][locale]}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
