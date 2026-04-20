import { useState } from 'react';

const FILE_ICON_COLORS = {
  jsx: 'text-blue-400',
  js: 'text-yellow-400',
  tsx: 'text-blue-500',
  ts: 'text-blue-500',
  css: 'text-pink-400',
  json: 'text-yellow-300',
  md: 'text-green-400',
  html: 'text-orange-400',
  py: 'text-green-500',
};

function FileIcon({ extension }) {
  const colorClass = FILE_ICON_COLORS[extension] || 'text-cogix-muted';
  return (
    <svg className={`w-4 h-4 shrink-0 ${colorClass}`} fill="currentColor" viewBox="0 0 20 20">
      <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
    </svg>
  );
}

function FolderIcon({ isOpen }) {
  return (
    <svg className="w-4 h-4 shrink-0 text-cogix-muted" fill="currentColor" viewBox="0 0 20 20">
      {isOpen ? (
        <path
          fillRule="evenodd"
          d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v1H8a3 3 0 00-3 3v1.5a1.5 1.5 0 01-3 0V6z"
          clipRule="evenodd"
        />
      ) : (
        <path d="M2 6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
      )}
    </svg>
  );
}

function TreeNode({ node, depth, onFileClick, activeFilePath }) {
  const [isExpanded, setIsExpanded] = useState(depth < 2);

  if (node.type === 'file') {
    const isActive = node.path === activeFilePath;
    return (
      <button
        onClick={() => onFileClick(node.path)}
        className={`group flex items-center gap-2 w-full text-left py-1 px-2 rounded text-sm transition-all ${
          isActive
            ? 'bg-purple-600/20 text-purple-300'
            : 'text-cogix-text hover:bg-cogix-hover'
        }`}
        style={{ paddingLeft: `${depth * 16 + 8}px` }}
      >
        <FileIcon extension={node.extension} />
        <span className="truncate">{node.name}</span>
        <span className="ml-auto opacity-0 group-hover:opacity-100 text-xs text-cogix-muted transition-opacity">
          .{node.extension}
        </span>
      </button>
    );
  }

  if (node.type === 'directory') {
    return (
      <div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 w-full text-left py-1 px-2 rounded text-sm text-cogix-text hover:bg-cogix-hover transition-all"
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
        >
          <span
            className={`text-xs text-cogix-muted transition-transform duration-200 ${
              isExpanded ? 'rotate-90' : ''
            }`}
          >
            ▶
          </span>
          <FolderIcon isOpen={isExpanded} />
          <span className="truncate font-medium">{node.name}</span>
        </button>

        {isExpanded && node.children && (
          <div className="overflow-hidden transition-all duration-200">
            {node.children.map((child) => (
              <TreeNode
                key={child.path}
                node={child}
                depth={depth + 1}
                onFileClick={onFileClick}
                activeFilePath={activeFilePath}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  return null;
}

function FileTree({ tree, onFileClick, activeFilePath }) {
  if (!tree) {
    return (
      <div className="flex items-center justify-center h-full text-cogix-muted text-sm p-4 text-center">
        <div>
          <div className="text-3xl mb-3">📂</div>
          <p>Enter a project path and click <strong>Load Project</strong> to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-2 overflow-y-auto h-full">
      <div className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cogix-muted mb-1">
        Explorer
      </div>
      {tree.children &&
        tree.children.map((child) => (
          <TreeNode
            key={child.path}
            node={child}
            depth={0}
            onFileClick={onFileClick}
            activeFilePath={activeFilePath}
          />
        ))}
    </div>
  );
}

export default FileTree;
