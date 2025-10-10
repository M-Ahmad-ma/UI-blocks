import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { logInfo, logSuccess, logError, logWarning } from '../utils/logger.js';
import { writeConfig } from '../utils/config.js';
import { promptForConfirmation, detectFramework, detectPackageManager } from '../utils/prompts.js';
import { setupGlobalStyles } from '../utils/setupStyles.js';
import { validateProjectStructure } from '../utils/validateProjectStructure.js';
import { createConfig } from '../utils/createConfig.js';
import { ensureTailwindConfig } from '../utils/fetchTemplate.js';

const baseDependencies = [
  'class-variance-authority',
  'clsx',
  'tailwind-merge',
  'tailwindcss-animate'
];

export async function init(options) {
  const cwd = path.resolve(options.cwd);

  if (!fs.existsSync(cwd)) {
    throw new Error(`Directory does not exist: ${cwd}`);
  }

  const files = fs.readdirSync(cwd).filter(f => f !== '.git');
  if (files.length === 0) {
    throw new Error(
      `Initialization failed: Directory is empty.\nPlease run this inside an existing project.`
    );
  }

  try {
    logInfo('Initializing ui-blocks...');

    const framework = await detectFramework(cwd);
    const packageManager = detectPackageManager(cwd);
    logInfo(`Detected: ${framework} project with ${packageManager}`);

    const pj = path.join(cwd, 'package.json');
    if (!fs.existsSync(pj)) {
      throw new Error('No package.json found in project root.');
    }

    const packageJson = JSON.parse(fs.readFileSync(pj, 'utf8'));
    const deps = { ...packageJson.dependencies, ...packageJson.devDependencies };

    if (!deps['tailwindcss']) {
      throw new Error(
        `Tailwind CSS not found. Please install Tailwind (e.g. npm install -D tailwindcss postcss autoprefixer).`
      );
    }

    await validateProjectStructure(cwd, framework, options);

    // Ensure config exists (fetch from GitHub if missing)
    await ensureTailwindConfig(cwd);

    const config = createConfig(cwd, framework, options);

    await setupGlobalStyles(cwd, config);

    writeConfig(config, cwd);
    logSuccess('Configuration created (ui-blocks.json)');

    if (!options.skipInstall) {
      installDependencies(cwd, packageManager, options);
    }

    createProjectFiles(cwd, config, options);

    logSuccess('✨ Project initialized successfully!');
    logInfo('You can now use ui-blocks add to add components.');
  } catch (err) {
    logError(`Initialization failed: ${err.message}`);
    process.exit(1);
  }
}

function installDependencies(cwd, packageManager, options) {
  logInfo('Checking dependencies to install...');

  const pj = path.join(cwd, 'package.json');
  let packageJson;
  try {
    packageJson = JSON.parse(fs.readFileSync(pj, 'utf8'));
  } catch {
    logWarning('Cannot read package.json');
    return;
  }

  const allDeps = {
    ...(packageJson.dependencies || {}),
    ...(packageJson.devDependencies || {})
  };

  const missing = baseDependencies.filter(d => !allDeps[d]);
  if (missing.length === 0) {
    logInfo('All dependencies present.');
    return;
  }

  logInfo(`Installing dependencies: ${missing.join(', ')}`);
  let cmd;
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

function createProjectFiles(cwd, config, options) {
  fs.mkdirSync(config.resolvedPaths.utils, { recursive: true });

  const utilsContent = `import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
`;

  const utilsFile = path.join(config.resolvedPaths.utils, 'cn.ts');
  if (!fs.existsSync(utilsFile) || options.force) {
    fs.writeFileSync(utilsFile, utilsContent, 'utf8');
    logSuccess('Created cn.ts');
  }

  fs.mkdirSync(config.resolvedPaths.components, { recursive: true });
  logSuccess('Created components directory');
}

