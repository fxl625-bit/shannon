import Link from "next/link";
import type { ReactNode } from "react";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/thoughts", label: "Thoughts" },
];

export function SiteShell({
  children,
  title,
  eyebrow,
}: {
  children: ReactNode;
  title?: string;
  eyebrow?: string;
}) {
  return (
    <div className="relative min-h-screen">
      <div className="grain" />
      <main className="mx-auto flex min-h-screen w-full max-w-6xl flex-col px-6 pb-16 pt-6 sm:px-10 lg:px-12">
        <header className="flex items-center justify-between border-b border-white/10 pb-6">
          <Link
            href="/"
            className="font-[family-name:var(--font-display)] text-xl tracking-[0.18em] text-white"
          >
            SF
          </Link>
          <nav className="flex items-center gap-5 text-sm text-[color:var(--muted)]">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors duration-150 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </header>

        {(title || eyebrow) ? (
          <div className="pt-16 sm:pt-24">
            {eyebrow ? (
              <p className="text-xs uppercase tracking-[0.32em] text-[color:var(--accent)]">
                {eyebrow}
              </p>
            ) : null}
            {title ? (
              <h1 className="mt-4 max-w-2xl font-[family-name:var(--font-display)] text-5xl leading-none tracking-tight text-white sm:text-6xl">
                {title}
              </h1>
            ) : null}
          </div>
        ) : null}

        {children}
      </main>
    </div>
  );
}
