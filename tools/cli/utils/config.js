import fs from 'fs';
import path from 'path';

const CONFIG_FILES = ['components.json', 'ui-blocks.json'];

export function getConfig(cwd = process.cwd()) {
  for (const configFile of CONFIG_FILES) {
    const configPath = path.resolve(cwd, configFile);
    
    if (fs.existsSync(configPath)) {
      try {
        return JSON.parse(fs.readFileSync(configPath, 'utf8'));
      } catch (error) {
        return null;
      }
    }
  }
  return null;
}

export function writeConfig(config, cwd = process.cwd(), preferNewName = true) {
  const configFile = preferNewName ? 'components.json' : 'ui-blocks.json';
  const configPath = path.resolve(cwd, configFile);
  fs.writeFileSync(configPath, JSON.stringify(config, null, 2));
}

export function hasConfig(cwd = process.cwd()) {
  return CONFIG_FILES.some(f => fs.existsSync(path.resolve(cwd, f)));
}
