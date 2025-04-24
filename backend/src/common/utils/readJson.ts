// src/common/utils/read-json.ts
import { readFileSync } from 'fs';
import { join } from 'path';

export function readItemsJson(filePath: string){
  const fullPath = join(__dirname, '../..',filePath);
  console.log("asdsada",fullPath);
  const fileContent = readFileSync(fullPath, 'utf-8');
  return JSON.parse(fileContent);
}
readItemsJson('../src/storage/FoodItems.json');