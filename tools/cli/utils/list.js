import { fetchRegistry } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';
import { logInfo, logError, logSuccess } from '../utils/logger.js';

export async function listComponents(options) {
  const cwd = path.resolve(options.cwd);
  const config = getConfig(cwd);

  if (!config) {
    logError('Project not initialized. Run `ui-blocks init` first.');
    return;
  }

  try {
    logInfo('Fetching available components...');
    const registry = await fetchRegistry();
    const { blocks } = registry;

    logSuccess(`Available components (${blocks.length}):`);
    blocks.forEach(block => {
      console.log(`  • ${block.name} - ${block.description}`);
    });
  } catch (error) {
    logError(`Failed to fetch components: ${error.message}`);
  }
}
