// src/common/utils/write-json.ts
import { writeFileSync } from 'fs';
import { join } from 'path';

export function writeItemsJson(filePath: string, data: any) {
  const fullPath = join(__dirname, '../..', filePath);
  const jsonContent = JSON.stringify(data, null, 2); // định dạng đẹp
  writeFileSync(fullPath, jsonContent, 'utf-8');
}
