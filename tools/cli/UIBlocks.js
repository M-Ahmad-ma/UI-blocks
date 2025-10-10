#!/usr/bin/env node
import { Command } from 'commander';
import { init } from './commands/init.js';
import { add } from './commands/add.js';
import { logError, logInfo } from './utils/logger.js';

const program = new Command();

// Add global options validation
const validateCwd = (cwd) => {
  try {
    const resolved = path.resolve(cwd);
    if (!fs.existsSync(resolved)) {
      logError(`Directory does not exist: ${resolved}`);
      process.exit(1);
    }
    return resolved;
  } catch (error) {
    logError(`Invalid directory: ${cwd}`);
    process.exit(1);
  }
};

program
  .name('ui-blocks')
  .description('CLI to add customizable UI components to your project')
  .version('1.0.0')
  .hook('preAction', (thisCommand) => {
    // Global validation
    const options = thisCommand.opts();
    if (options.cwd) {
      validateCwd(options.cwd);
    }
  });

program
  .command('init')
  .description('Initialize your project')
  .option('-t, --template <template>', 'Template (next, react)', 'react')
  .option('-y, --yes', 'Skip confirmation prompt', false)
  .option('-f, --force', 'Force overwrite', false)
  .option('-c, --cwd <cwd>', 'Working directory', process.cwd())
  .option('-s, --silent', 'Mute output', false)
  .option('--src-dir', 'Use src directory', false)
  .option('--no-src-dir', 'Do not use src directory')
  .option('--css-variables', 'Enable CSS variables', true)
  .option('--no-css-variables', 'Disable CSS variables')
  .option('--no-base-style', 'Do not install base UI styles')
  .option('--skip-install', 'Skip dependency installation', false)
  .action(async (options) => {
    try {
      await init(options);
    } catch (err) {
      logError(err.message);
      process.exit(1);
    }
  });

program
  .command('add [components...]')
  .description('Add components to your project')
  .option('-f, --force', 'Force overwrite', false)
  .option('-s, --silent', 'Mute output', false)
  .option('-c, --cwd <cwd>', 'Working directory', process.cwd())
  .option('--src-dir', 'Use src directory', false)
  .option('--all', 'Add all available components', false)
  .action(async (components, options) => {
    if ((!components || components.length === 0) && !options.all) {
      logError('No components specified. Usage: ui-blocks add [components...] or use --all');
      process.exit(1);
    }
    try {
      await add(components, options);
    } catch (err) {
      logError(err.message);
      process.exit(1);
    }
  });

// Add new command to list available components
program
  .command('list')
  .description('List all available components')
  .option('-c, --cwd <cwd>', 'Working directory', process.cwd())
  .action(async (options) => {
    try {
      await listComponents(options);
    } catch (err) {
      logError(err.message);
      process.exit(1);
    }
  });

await program.parseAsync(process.argv);
