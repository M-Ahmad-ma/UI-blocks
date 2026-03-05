import fs from 'fs';
import path from 'path';
import { getConfig } from '../utils/config.js';
import { logInfo, logSuccess, logError, logWarning } from '../utils/logger.js';
import { promptForConfirmation } from '../utils/prompts.js';
import { fetchRegistry } from '../utils/registry.js';

export async function remove(components, options) {
  const cwd = path.resolve(options.cwd);

  if (!fs.existsSync(path.join(cwd, 'package.json'))) {
    throw new Error('No package.json found.');
  }

  const config = getConfig(cwd);
  if (!config) {
    throw new Error('Project is not initialized; run init first.');
  }

  const compDir = config.resolvedPaths?.components || path.join(cwd, 'components', 'ui');
  
  if (!fs.existsSync(compDir)) {
    logWarning('No components directory found.');
    return;
  }

  if (!components || components.length === 0) {
    logError('No components specified. Usage: ui-blocks remove [components...]');
    return;
  }

  const registry = await fetchRegistry();
  const { blocks } = registry;

  const results = { removed: [], failed: [], notFound: [] };

  for (const name of components) {
    try {
      const block = blocks.find(b => b.name === name || b.id === name);
      
      if (!block) {
        logWarning(`Component not found in registry: ${name}`);
        results.notFound.push(name);
        continue;
      }

      for (const file of block.files) {
        const targetPath = path.join(compDir, file);
        
        if (fs.existsSync(targetPath)) {
          if (!options.force && !options.silent) {
            const confirm = await promptForConfirmation(`Remove ${file}?`);
            if (!confirm) continue;
          }
          
          fs.unlinkSync(targetPath);
          if (!options.silent) logSuccess(`Removed ${file}`);
        }
      }

      results.removed.push(name);
    } catch (e) {
      logError(`Failed to remove ${name}: ${e.message}`);
      results.failed.push(name);
    }
  }

  if (!options.silent) {
    if (results.removed.length) logSuccess(`Removed: ${results.removed.join(', ')}`);
    if (results.notFound.length) logWarning(`Not found in registry: ${results.notFound.join(', ')}`);
    if (results.failed.length) logError(`Failed: ${results.failed.join(', ')}`);
  }

  return results;
}
