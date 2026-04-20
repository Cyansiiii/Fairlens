import { useState, useCallback, useMemo } from 'react';
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

const NODE_TYPE_STYLES = {
  component: { borderColor: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.08)' },
  utility: { borderColor: '#3b82f6', bgColor: 'rgba(59, 130, 246, 0.08)' },
  config: { borderColor: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.08)' },
  style: { borderColor: '#ec4899', bgColor: 'rgba(236, 72, 153, 0.08)' },
  entry: { borderColor: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.08)' },
};

function CustomNode({ data }) {
  const styles = NODE_TYPE_STYLES[data.nodeType] || NODE_TYPE_STYLES.utility;
  const isEntry = data.nodeType === 'entry';

  return (
    <div
      style={{
        background: styles.bgColor,
        border: `2px solid ${styles.borderColor}`,
        borderRadius: '12px',
        padding: '12px 16px',
        minWidth: '180px',
        maxWidth: '240px',
        backdropFilter: 'blur(8px)',
      }}
    >
      <Handle type="target" position={Position.Top} style={{ background: '#555', width: 8, height: 8 }} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-1.5 py-0.5 rounded font-medium"
            style={{ backgroundColor: styles.borderColor + '30', color: styles.borderColor }}
          >
            {data.nodeType}
          </span>
        </div>
        <span
          className="text-sm text-white"
          style={{ fontWeight: isEntry ? 700 : 500 }}
        >
          {data.label}
        </span>
        {data.summary && (
          <span className="text-xs text-gray-400 leading-tight">{data.summary}</span>
        )}
      </div>
      <Handle type="source" position={Position.Bottom} style={{ background: '#555', width: 8, height: 8 }} />
    </div>
  );
}

const nodeTypes = { custom: CustomNode };

function CodebaseGraph({ graph, projectSummary, onClose }) {
  const [selectedNode, setSelectedNode] = useState(null);

  const initialNodes = useMemo(() => {
    if (!graph || !graph.nodes) return [];

    const cols = Math.ceil(Math.sqrt(graph.nodes.length));
    return graph.nodes.map((node, index) => ({
      id: node.id,
      type: 'custom',
      position: {
        x: (index % cols) * 300 + 50,
        y: Math.floor(index / cols) * 180 + 50,
      },
      data: {
        label: node.label,
        nodeType: node.type || 'utility',
        summary: node.summary,
        path: node.path,
      },
    }));
  }, [graph]);

  const initialEdges = useMemo(() => {
    if (!graph || !graph.edges) return [];
    return graph.edges.map((edge) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      label: edge.label,
      animated: true,
      style: { stroke: '#555', strokeWidth: 1.5 },
      labelStyle: { fill: '#888', fontSize: 10, fontWeight: 500 },
      labelBgStyle: { fill: '#1a1a1a', fillOpacity: 0.9 },
      labelBgPadding: [6, 4],
      labelBgBorderRadius: 4,
    }));
  }, [graph]);

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleNodeClick = useCallback((event, node) => {
    setSelectedNode(node.data);
  }, []);

  return (
    <div className="fixed inset-0 z-50 graph-overlay bg-black/80 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-cogix-border bg-cogix-toolbar/90 shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-xl">🗺</span>
          <div>
            <h2 className="text-lg font-bold text-cogix-text">Codebase Architecture</h2>
            {projectSummary && (
              <p className="text-xs text-cogix-muted mt-0.5 max-w-xl truncate">{projectSummary}</p>
            )}
          </div>
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-cogix-card hover:bg-cogix-hover border border-cogix-border text-cogix-text text-sm font-medium rounded-lg transition-all"
        >
          ✕ Close
        </button>
      </div>

      {/* Graph area */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          fitViewOptions={{ padding: 0.2 }}
          minZoom={0.3}
          maxZoom={2}
          attributionPosition="bottom-left"
        >
          <Background color="#222" gap={20} size={1} variant="dots" />
          <MiniMap
            nodeColor={(node) => {
              const type = node.data?.nodeType || 'utility';
              return NODE_TYPE_STYLES[type]?.borderColor || '#555';
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
            style={{ backgroundColor: '#111' }}
          />
          <Controls />
        </ReactFlow>

        {/* Node detail panel */}
        {selectedNode && (
          <div className="absolute top-4 right-4 w-72 bg-cogix-card/95 backdrop-blur-lg border border-cogix-border rounded-xl p-4 shadow-xl shadow-black/30">
            <div className="flex items-center justify-between mb-3">
              <span
                className="text-xs px-2 py-0.5 rounded font-medium"
                style={{
                  backgroundColor: (NODE_TYPE_STYLES[selectedNode.nodeType]?.borderColor || '#555') + '30',
                  color: NODE_TYPE_STYLES[selectedNode.nodeType]?.borderColor || '#555',
                }}
              >
                {selectedNode.nodeType}
              </span>
              <button
                onClick={() => setSelectedNode(null)}
                className="text-cogix-muted hover:text-cogix-text transition-colors text-sm"
              >
                ✕
              </button>
            </div>
            <h4 className="text-sm font-semibold text-cogix-text mb-1">{selectedNode.label}</h4>
            {selectedNode.path && (
              <p className="text-xs text-cogix-muted mb-2 font-mono">{selectedNode.path}</p>
            )}
            {selectedNode.summary && (
              <p className="text-xs text-cogix-muted leading-relaxed">{selectedNode.summary}</p>
            )}
          </div>
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-16 flex items-center gap-3 bg-cogix-card/90 backdrop-blur border border-cogix-border rounded-lg px-3 py-2">
          {Object.entries(NODE_TYPE_STYLES).map(([type, style]) => (
            <div key={type} className="flex items-center gap-1.5">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: style.borderColor }}
              />
              <span className="text-xs text-cogix-muted capitalize">{type}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CodebaseGraph;
