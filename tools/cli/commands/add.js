import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { checkDependencies } from '../utils/check-deps.js';
import { fetchRegistry, fetchComponentFile } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';
import { logInfo, logSuccess, logError, logWarning } from '../utils/logger.js';
import { promptForConfirmation } from '../utils/prompts.js';

const BASE_DEPENDENCIES = [
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'tailwindcss-animate'
];

export async function add(components, options) {
  const cwd = path.resolve(options.cwd);

  if (!fs.existsSync(path.join(cwd, 'package.json'))) {
    throw new Error('No package.json found.');
  }

  await checkDependencies(cwd);

  const config = getConfig(cwd);
  if (!config) {
    throw new Error('Project is not initialized; run init first.');
  }

  let compDir = config.resolvedPaths.components;
  if (!fs.existsSync(compDir)) {
    if (config.framework === 'next') {
      const appPath = path.join(cwd, 'src', 'app', 'components', 'ui');
      const srcComp = path.join(cwd, 'src', 'components', 'ui');
      if (fs.existsSync(path.join(cwd, 'src', 'app'))) {
        compDir = appPath;
      } else {
        compDir = srcComp;
      }
    } else if (config.framework === 'astro') {
      compDir = path.join(cwd, 'src', 'components', 'ui');
    } else {
      compDir = config.resolvedPaths.components;
    }
  }

  fs.mkdirSync(compDir, { recursive: true });

  logInfo('Fetching registry...');
  const registry = await fetchRegistry();
  const { blocks } = registry;

  if (options.all) {
    components = blocks.map(b => b.name);
    logInfo(`Adding all ${components.length} components...`);
  }

  const allDependencies = new Set([...BASE_DEPENDENCIES]);
  const results = { installed: [], skipped: [], failed: [] };

  for (const name of components) {
    try {
      const block = blocks.find(b => b.name === name || b.id === name);
      if (!block) {
        logError(`Component not found: ${name}`);
        results.failed.push(name);
        continue;
      }

      if (block.dependencies) {
        block.dependencies.forEach(dep => allDependencies.add(dep));
      }

      for (const file of block.files) {
        const targetPath = path.join(compDir, file);

        if (fs.existsSync(targetPath)) {
          if (!options.force) {
            if (!options.silent) logWarning(`${file} already exists`);
            continue;
          } else {
            const confirm = options.silent || await promptForConfirmation(`Overwrite ${file}?`);
            if (!confirm) continue;
          }
        }

        if (!options.silent) logInfo(`Downloading ${file}...`);
        const content = await fetchComponentFile(file);

        const dir = path.dirname(targetPath);
        fs.mkdirSync(dir, { recursive: true });

        fs.writeFileSync(targetPath, content, 'utf8');
        if (!options.silent) logSuccess(`Created ${file}`);
      }

      results.installed.push(name);
    } catch (e) {
      logError(`Failed to add ${name}: ${e.message}`);
      results.failed.push(name);
    }
  }

  await installDependencies(cwd, allDependencies, options);

  if (!options.silent) {
    if (results.installed.length) logSuccess(`Installed: ${results.installed.join(', ')}`);
    if (results.failed.length) logError(`Failed: ${results.failed.join(', ')}`);
  }

  return results;
}

async function installDependencies(cwd, dependencies, options) {
  const pj = path.join(cwd, 'package.json');
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(pj, 'utf8'));
  } catch {
    return;
  }

  const allDeps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {})
  };

  const missing = [...dependencies].filter(d => !allDeps[d]);
  if (missing.length === 0) {
    return;
  }

  logInfo(`Installing dependencies: ${missing.join(', ')}`);
  
  let cmd;
  const packageManager = detectPackageManager(cwd);
  
  if (packageManager === 'yarn') {
    cmd = `yarn add ${missing.join(' ')}`;
  } else if (packageManager === 'pnpm') {
    cmd = `pnpm add ${missing.join(' ')}`;
  } else {
    cmd = `npm install ${missing.join(' ')}`;
  }

  try {
    execSync(cmd, { cwd, stdio: options.silent ? 'ignore' : 'inherit' });
    logSuccess('Dependencies installed.');
  } catch (e) {
    logWarning(`Could not install dependencies: ${e.message}`);
  }
}

function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  return 'npm';
}

