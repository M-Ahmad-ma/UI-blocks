import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { logError, logWarning } from './logger.js';

export async function checkDependencies(cwd = process.cwd()) {
  const requiredDeps = ['tailwindcss', 'clsx', 'tailwind-merge'];
  const missingDeps = [];

  try {
    const packageJsonPath = path.join(cwd, 'package.json');
    if (!fs.existsSync(packageJsonPath)) {
      throw new Error('No package.json found');
    }

    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const allDeps = {
      ...packageJson.dependencies,
      ...packageJson.devDependencies
    };

    for (const dep of requiredDeps) {
      if (!allDeps[dep]) {
        missingDeps.push(dep);
      }
    }

    if (missingDeps.length > 0) {
      throw new Error(`Missing required dependencies: ${missingDeps.join(', ')}. Run 'ui-blocks init' to install them.`);
    }

    // Verify Tailwind configuration
    const tailwindConfigs = [
      'tailwind.config.js',
      'tailwind.config.ts',
      'tailwind.config.cjs',
      'tailwind.config.mjs'
    ];

    const hasTailwindConfig = tailwindConfigs.some(config => 
      fs.existsSync(path.join(cwd, config))
    );

    if (!hasTailwindConfig) {
      logWarning('Tailwind CSS configuration not found. Components may not work correctly.');
    }

  } catch (error) {
    if (error.message.includes('package.json')) {
      throw new Error('No package.json found. Please run this command in a Node.js project.');
    }
    throw error;
  }
}
