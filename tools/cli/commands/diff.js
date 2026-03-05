import fs from 'fs';
import path from 'path';
import { getConfig } from '../utils/config.js';
import { logInfo, logSuccess, logError, logWarning } from '../utils/logger.js';
import { fetchRegistry, fetchComponentFile } from '../utils/registry.js';

export async function diff(components, options) {
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
    logWarning('No components installed yet.');
    return;
  }

  logInfo('Checking for updates...');
  
  const registry = await fetchRegistry();
  const { blocks } = registry;

  const installed = fs.readdirSync(compDir).filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));
  
  if (components && components.length > 0) {
    const filtered = installed.filter(c => components.includes(c.replace('.tsx', '').replace('.ts', '')));
    if (filtered.length > 0) {
      return await checkUpdates(filtered, compDir, blocks, options);
    }
  }

  return await checkUpdates(installed, compDir, blocks, options);
}

async function checkUpdates(installed, compDir, blocks, options) {
  const updates = [];
  const upToDate = [];

  for (const file of installed) {
    const componentName = file.replace('.tsx', '').replace('.ts', '');
    const block = blocks.find(b => b.name === componentName || b.id === componentName);
    
    if (!block) continue;

    const localPath = path.join(compDir, file);
    const localContent = fs.readFileSync(localPath, 'utf8');
    
    try {
      const remoteContent = await fetchComponentFile(file);
      
      if (localContent.trim() !== remoteContent.trim()) {
        updates.push({ name: componentName, file });
      } else {
        upToDate.push(componentName);
      }
    } catch (e) {
      logWarning(`Could not check ${componentName}: ${e.message}`);
    }
  }

  if (updates.length === 0) {
    logSuccess('All components are up to date!');
    return;
  }

  logWarning(`Updates available for ${updates.length} component(s):`);
  updates.forEach(u => {
    console.log(`  • ${u.name}`);
  });

  if (options.update) {
    logInfo('Updating components...');
    for (const u of updates) {
      try {
        const remoteContent = await fetchComponentFile(u.file);
        const localPath = path.join(compDir, u.file);
        fs.writeFileSync(localPath, remoteContent, 'utf8');
        logSuccess(`Updated ${u.name}`);
      } catch (e) {
        logError(`Failed to update ${u.name}: ${e.message}`);
      }
    }
  } else {
    logInfo('Run with --update to apply updates');
  }

  return { updates, upToDate };
}
