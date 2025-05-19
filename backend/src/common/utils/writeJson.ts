import { writeFileSync } from 'fs';
import { join } from 'path';

export function writeItemsJson(filePath: string, data: any) {
  const fullPath = join(__dirname, '../..', filePath);
  const jsonContent = JSON.stringify(data, null, 2);
  writeFileSync(fullPath, jsonContent, 'utf-8');
}
