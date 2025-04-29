// src/common/utils/read-json.ts
import { readFileSync } from 'fs';
import { join } from 'path';

export function readItemsJson(filePath: string){
  const fullPath = join(__dirname, '../..',filePath);
  const fileContent = readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileContent);
}