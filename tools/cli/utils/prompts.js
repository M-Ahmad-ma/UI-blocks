import readline from 'readline';
import fs from 'fs';
import path from 'path';

export function promptForConfirmation(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(`${question} (y/N) `, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

export async function detectFramework(cwd) {
  const packageJsonPath = path.join(cwd, 'package.json');
  
  if (!fs.existsSync(packageJsonPath)) {
    return 'unknown';
  }

  try {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const dependencies = { ...packageJson.dependencies, ...packageJson.devDependencies };

    if (dependencies.next) return 'next';
    if (dependencies['react-native']) return 'react-native';
    if (dependencies['@vue/cli-service'] || dependencies.vue) return 'vue';
    if (dependencies.svelte || dependencies['@sveltejs/kit']) return 'svelte';
    if (dependencies.react || dependencies['react-scripts']) return 'react';
    
    return 'unknown';
  } catch {
    return 'unknown';
  }
}

export function detectPackageManager(cwd) {
  if (fs.existsSync(path.join(cwd, 'yarn.lock'))) return 'yarn';
  if (fs.existsSync(path.join(cwd, 'pnpm-lock.yaml'))) return 'pnpm';
  if (fs.existsSync(path.join(cwd, 'package-lock.json'))) return 'npm';
  return 'npm';
}
