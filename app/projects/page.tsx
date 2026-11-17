"use client";

import { ProductShowcase } from "@/components/products/ProductShowcase";
import { LocalLogShowcase } from "@/components/products/LocalLogShowcase";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/data/site";

export default function ProjectsPage() {
  return (
    <SiteShell title={site.appsPage.title} eyebrow={site.appsPage.eyebrow} lead={site.appsPage.intro}>
      <ProductShowcase />
      <LocalLogShowcase />
    </SiteShell>
  );
}
