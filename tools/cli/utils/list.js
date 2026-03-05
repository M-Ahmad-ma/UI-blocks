import path from 'path';
import { fetchRegistry } from '../utils/registry.js';
import { getConfig } from '../utils/config.js';
import { logInfo, logError, logSuccess } from '../utils/logger.js';

export async function listComponents(options) {
  const cwd = path.resolve(options.cwd);

  const config = getConfig(cwd);
  if (!config && !options.json) {
    logError('Project not initialized. Run `ui-blocks init` first.');
    return;
  }

  try {
    const registry = await fetchRegistry();
    const { blocks } = registry;

    let filteredBlocks = blocks;

    if (options.search) {
      const query = options.search.toLowerCase();
      filteredBlocks = blocks.filter(b => 
        (b.name || b.id).toLowerCase().includes(query) || 
        (b.description || '').toLowerCase().includes(query)
      );
    }

    if (options.json) {
      console.log(JSON.stringify(filteredBlocks, null, 2));
      return;
    }

    logSuccess(`Available components (${filteredBlocks.length}):`);
    
    const nameWidth = Math.max(...filteredBlocks.map(b => (b.name || b.id).length), 8);
    
    filteredBlocks.forEach(block => {
      const name = block.name || block.id;
      const paddedName = name.padEnd(nameWidth + 2);
      console.log(`  ${paddedName} ${block.description || ''}`);
    });

    if (options.search) {
      console.log(`\nShowing ${filteredBlocks.length} of ${blocks.length} components`);
    }
  } catch (error) {
    logError(`Failed to fetch components: ${error.message}`);
  }
}
