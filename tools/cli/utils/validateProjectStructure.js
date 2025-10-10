import fs from "fs";
import path from "path";
import { logInfo, logWarning } from "./logger.js";

export async function validateProjectStructure(cwd, framework, options) {
  logInfo("Validating project structure...");

  const configPaths = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.cjs",
    "tailwind.config.mjs"
  ];
  const foundConfig = configPaths.some(cfg => fs.existsSync(path.join(cwd, cfg)));

  const cssCandidates = [
    "src/global.css",
    "src/index.css",
    "app/globals.css",
    "styles/globals.css",
    "styles/index.css"
  ];
  let cssPath = null;
  for (const rel of cssCandidates) {
    const full = path.join(cwd, rel);
    if (fs.existsSync(full)) {
      const content = fs.readFileSync(full, "utf8");
      if (
        content.includes('@import "tailwindcss"') ||
        content.includes("@tailwind base") ||
        content.includes("@tailwind components") ||
        content.includes("@tailwind utilities") ||
        content.includes("@theme")
      ) {
        cssPath = full;
        break;
      }
    }
  }

  if (!foundConfig && !cssPath) {
    throw new Error(
      "Could not detect Tailwind configuration. In Tailwind v3, a `tailwind.config.js` is expected. " +
      "In Tailwind v4, your CSS should import Tailwind (e.g. `@import \"tailwindcss\"`) or include Tailwind directives like `@tailwind base;`. " +
      "Please configure Tailwind first."
    );
  }

  if (!foundConfig) {
    logWarning("No Tailwind config file detected — assuming CSS-first configuration (v4).");
  } else {
    logInfo("Tailwind config file found.");
  }

  if (cssPath) {
    logInfo(`Found CSS file for Tailwind: ${path.relative(cwd, cssPath)}`);
  } else {
    logWarning("No CSS file with Tailwind directives found. Make sure to import Tailwind in your global CSS.");
  }

  logInfo("✅ Project structure validation passed.");
}

