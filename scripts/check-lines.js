import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const ignored = new Set(['.git', 'node_modules', 'dist', 'tmp', 'output', '__pycache__']);
const extensions = new Set(['.js', '.jsx', '.cjs', '.css', '.py', '.json', '.md', '.html', '.svg']);
async function filesAt(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    if (ignored.has(entry.name) || entry.name === 'package-lock.json') continue;
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...await filesAt(file));
    else if (extensions.has(path.extname(file))) files.push(file);
  }
  return files;
}
let largest = 0;
const failures = [];
const files = await filesAt('.');
for (const file of files) {
  const text = await readFile(file, 'utf8');
  const lines = text.replace(/\r\n/g, '\n').replace(/\n$/, '').split('\n').length;
  largest = Math.max(largest, lines);
  if (lines > 50) failures.push(`${file}: ${lines} linhas`);
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exitCode = 1;
} else console.log(`${files.length} arquivos verificados. Maior arquivo: ${largest} linhas. Limite: 50.`);
