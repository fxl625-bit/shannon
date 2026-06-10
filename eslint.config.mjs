import nextVitals from "eslint-config-next/core-web-vitals";

const config = [
  ...nextVitals,
  {
    ignores: ["_DELETE_*", "app/components_old_bak*", "app/components_old_bak_TO_BE_DELETED", "**/*.js", "scripts/*.js"],
  },
];

export default config;
