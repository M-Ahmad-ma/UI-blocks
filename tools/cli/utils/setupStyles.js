
import fs from 'fs';
import path from 'path';
import { logInfo, logSuccess, logWarning } from './logger.js';

const COLORS_URL = "https://raw.githubusercontent.com/M-Ahmad-ma/ui-registry/main/colors.css";

async function fetchText(url) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${url}: ${res.status} ${res.statusText}`);
  }
  return res.text();
}

export function findGlobalCss(cwd) {
  const searchDirs = [
    '',
    'src',
    path.join('src', 'app'),
    'app',
    'styles'
  ];
  const cssNames = ['globals.css', 'global.css', 'index.css'];

  for (const d of searchDirs) {
    for (const name of cssNames) {
      const rel = path.join(d, name);
      const abs = path.join(cwd, rel);
      if (fs.existsSync(abs)) {
        return rel;
      }
    }
  }

  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const e of entries) {
      const full = path.join(dir, e.name);
      if (e.isDirectory()) {
        const found = walk(full);
        if (found) return found;
      } else if (e.isFile() && e.name.endsWith('.css')) {
        return path.relative(cwd, full);
      }
    }
    return null;
  }

  const inSrc = fs.existsSync(path.join(cwd, 'src'))
    ? walk(path.join(cwd, 'src'))
    : null;
  if (inSrc) return inSrc;
  return walk(cwd);
}

export async function setupGlobalStyles(cwd, config) {
  let cssRel = config.tailwind.css;
  if (!cssRel) {
    cssRel = findGlobalCss(cwd);
  }
  if (!cssRel) {
    throw new Error('Could not locate a global CSS file to update.');
  }

  const cssAbs = path.join(cwd, cssRel);
  logInfo(`Updating global CSS at: ${cssRel}`);

  if (!fs.existsSync(cssAbs)) {
    throw new Error(`Global CSS file not found: ${cssAbs}`);
  }

  let cssContent = fs.readFileSync(cssAbs, 'utf8');

  if (!cssContent.includes('@tailwind base')) {
    cssContent = `@tailwind base;\n@tailwind components;\n@tailwind utilities;\n\n` + cssContent;
    logInfo('Added Tailwind directives to CSS');
  } else {
    logInfo('Tailwind directives already present');
  }

  let colorsCss = '';
  try {
    colorsCss = await fetchText(COLORS_URL);
  } catch (err) {
    logWarning(`Could not fetch colors CSS: ${err.message}`);
  }

  if (colorsCss) {
    if (!cssContent.includes('/* ui-blocks colors start */')) {
      const injection = `\n/* ui-blocks colors start */\n${colorsCss}\n/* ui-blocks colors end */\n`;
      const lines = cssContent.split(/\r?\n/);
      let idx = lines.findIndex(l => l.includes('@tailwind utilities'));
      if (idx < 0) idx = lines.length - 1;
      lines.splice(idx + 1, 0, injection);
      cssContent = lines.join('\n');
      logInfo('Injected colors CSS into global CSS');
    } else {
      logInfo('Colors CSS already injected; skipping');
    }
  }

  fs.writeFileSync(cssAbs, cssContent, 'utf8');
  logSuccess('Global CSS updated with colors and Tailwind directives');
}

