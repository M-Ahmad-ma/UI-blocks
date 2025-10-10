import fs from 'fs';
import path from 'path';

const CONFIG_FILE = 'ui-blocks.json';

export function getConfig(cwd = process.cwd()) {
  const configPath = path.resolve(cwd, CONFIG_FILE);
  
  if (fs.existsSync(configPath)) {
    try {
      return JSON.parse(fs.readFileSync(configPath, 'utf8'));
    } catch (error) {
      return null;
    }
  }
  return null;
}

export function writeConfig(config, cwd = process.cwd()) {
  const configPath = path.resolve(cwd, CONFIG_FILE);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}
