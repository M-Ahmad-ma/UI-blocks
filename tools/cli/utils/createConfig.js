import fs from 'fs';
import path from 'path';
import { logWarning } from '../utils/logger.js';
import { findGlobalCss } from '../utils/setupStyles.js';  

export function createConfig(cwd, framework, options) {
  const isNext = framework === 'next';
  const usesSrcDir = options.srcDir ?? fs.existsSync(path.join(cwd, 'src'));

  // Tailwind config detection
  const tailwindConfigs = [
    'tailwind.config.js',
    'tailwind.config.ts',
    'tailwind.config.cjs',
    'tailwind.config.mjs'
  ];
  let tailwindConfig = 'tailwind.config.js';
  for (const cfg of tailwindConfigs) {
    if (fs.existsSync(path.join(cwd, cfg))) {
      tailwindConfig = cfg;
      break;
    }
  }

  // CSS detection: try simple candidates first
  const cssCandidates = [
    usesSrcDir ? 'src/global.css' : 'global.css',
    usesSrcDir ? 'src/index.css' : 'index.css',
    usesSrcDir ? 'app/globals.css' : 'globals.css',
    'styles/globals.css',
    'styles/index.css'
  ];
  let cssPath = cssCandidates.find(rel => fs.existsSync(path.join(cwd, rel)));

  if (!cssPath) {
    // fallback: deeper search
    const fallback = findGlobalCss(cwd);
    if (fallback) {
      cssPath = fallback;
    } else {
      logWarning(
        `Could not detect a global CSS file from candidates: ${cssCandidates.join(
          ', '
        )}. You may have to set 'css' path manually.`
      );
      // Fallback default
      cssPath = usesSrcDir ? 'src/index.css' : 'index.css';
    }
  }

  const aliases = {
    components: usesSrcDir ? '~/src/components/ui' : '~/components/ui',
    utils: usesSrcDir ? '~/src/lib/utils' : '~/lib/utils'
  };

  const resolvedPaths = {
    components: path.resolve(cwd, usesSrcDir ? 'src/components/ui' : 'components/ui'),
    utils: path.resolve(cwd, usesSrcDir ? 'src/lib/utils' : 'lib/utils'),
    css: path.resolve(cwd, cssPath)
  };

  return {
    $schema: 'https://ui-blocks.com/schema.json',
    style: options.style ?? 'default',
    rsc: isNext,
    framework,
    tailwind: {
      config: tailwindConfig,
      css: cssPath,
      baseColor: options.baseColor ?? 'neutral',
      cssVariables: options.cssVariables ?? true
    },
    aliases,
    resolvedPaths
  };
}

