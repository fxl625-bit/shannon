import type { NextConfig } from "next";

const repositoryName = process.env.GITHUB_REPOSITORY?.split("/")[1] ?? "";
const isProjectPages =
  process.env.GITHUB_ACTIONS === "true" &&
  repositoryName.length > 0 &&
  !repositoryName.endsWith(".github.io");
const basePath = isProjectPages ? `/${repositoryName}` : "";
const distDir =
  process.env.NODE_ENV === "development" ? ".next-dev" : "out-v5";

const nextConfig: NextConfig = {
  output: "export",
  distDir,
  trailingSlash: true,
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
  images: {
    unoptimized: true,
  },
  ...(basePath
    ? {
        basePath,
      }
    : {}),
};

export default nextConfig;
