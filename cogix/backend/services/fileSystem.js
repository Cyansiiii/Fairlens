const fs = require('fs');
const path = require('path');

const SKIP_NAMES = new Set([
  'node_modules', '.git', '.DS_Store', 'dist', 'build',
  '.next', '__pycache__', '.env', 'package-lock.json'
]);

const SKIP_EXTENSIONS = new Set(['.pyc']);

function shouldSkip(name) {
  if (SKIP_NAMES.has(name)) return true;
  const ext = path.extname(name);
  if (SKIP_EXTENSIONS.has(ext)) return true;
  return false;
}

function getLanguageFromExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase().replace('.', '');
  const map = {
    js: 'javascript',
    jsx: 'javascript',
    ts: 'typescript',
    tsx: 'typescript',
    py: 'python',
    css: 'css',
    html: 'html',
    json: 'json',
    md: 'markdown',
  };
  return map[ext] || 'plaintext';
}

async function getFileTree(dirPath) {
  const resolvedPath = path.resolve(dirPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error('Directory not found');
  }

  const stat = fs.statSync(resolvedPath);
  if (!stat.isDirectory()) {
    throw new Error('Directory not found');
  }

  const name = path.basename(resolvedPath);
  const tree = {
    name,
    path: resolvedPath,
    type: 'directory',
    children: [],
  };

  const entries = fs.readdirSync(resolvedPath, { withFileTypes: true });
  entries.sort((a, b) => {
    if (a.isDirectory() && !b.isDirectory()) return -1;
    if (!a.isDirectory() && b.isDirectory()) return 1;
    return a.name.localeCompare(b.name);
  });

  for (const entry of entries) {
    if (shouldSkip(entry.name)) continue;

    const entryPath = path.join(resolvedPath, entry.name);

    if (entry.isDirectory()) {
      const childTree = await getFileTree(entryPath);
      tree.children.push(childTree);
    } else if (entry.isFile()) {
      tree.children.push({
        name: entry.name,
        path: entryPath,
        type: 'file',
        extension: path.extname(entry.name).replace('.', ''),
      });
    }
  }

  return tree;
}

async function readFile(filePath) {
  const resolvedPath = path.resolve(filePath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error('File not found');
  }

  const content = fs.readFileSync(resolvedPath, 'utf-8');
  const language = getLanguageFromExtension(resolvedPath);

  return { content, language };
}

async function writeFile(filePath, content) {
  const resolvedPath = path.resolve(filePath);
  const dir = path.dirname(resolvedPath);

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(resolvedPath, content, 'utf-8');
  return { success: true };
}

async function getAllFilesContent(dirPath) {
  const resolvedPath = path.resolve(dirPath);

  if (!fs.existsSync(resolvedPath)) {
    throw new Error('Directory not found');
  }

  const files = [];
  const MAX_TOTAL_CHARS = 100000;
  let totalChars = 0;

  function walkDir(currentPath) {
    const entries = fs.readdirSync(currentPath, { withFileTypes: true });
    entries.sort((a, b) => a.name.localeCompare(b.name));

    for (const entry of entries) {
      if (shouldSkip(entry.name)) continue;
      if (totalChars >= MAX_TOTAL_CHARS) break;

      const entryPath = path.join(currentPath, entry.name);

      if (entry.isDirectory()) {
        walkDir(entryPath);
      } else if (entry.isFile()) {
        try {
          const content = fs.readFileSync(entryPath, 'utf-8');
          const remaining = MAX_TOTAL_CHARS - totalChars;
          const truncatedContent = content.substring(0, remaining);
          totalChars += truncatedContent.length;

          files.push({
            path: entryPath,
            relativePath: path.relative(resolvedPath, entryPath),
            content: truncatedContent,
            language: getLanguageFromExtension(entryPath),
          });

          if (totalChars >= MAX_TOTAL_CHARS) break;
        } catch (err) {
          // Skip binary or unreadable files silently
        }
      }
    }
  }

  walkDir(resolvedPath);
  return files;
}

module.exports = {
  getFileTree,
  readFile,
  writeFile,
  getAllFilesContent,
};
