import fs from 'fs';
import path from 'path';

async function safeFetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return await res.text();
}

const BASE = "https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main";

export async function fetchTemplateFile(remotePath) {
  const url = `${BASE}/${remotePath}`;
  return safeFetchText(url);
}

export async function ensureTailwindConfig(cwd) {
  const cfgNames = [
    "tailwind.config.js",
    "tailwind.config.ts",
    "tailwind.config.cjs",
    "tailwind.config.mjs"
  ];
  const found = cfgNames.find(name => fs.existsSync(path.join(cwd, name)));
  if (found) {
    return; 
  }

  let template;
  try {
    template = await fetchTemplateFile("tailwind.config.js");
  } catch (err) {
    console.warn("Could not fetch default tailwind.config.js template:", err.message);
    return;
  }

  const dest = path.join(cwd, "tailwind.config.js");
  fs.writeFileSync(dest, template, "utf8");
  console.log("✅ Created tailwind.config.js from template");
}
