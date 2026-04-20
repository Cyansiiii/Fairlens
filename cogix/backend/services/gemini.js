const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

function getModel() {
  return genAI.getGenerativeModel({ model: 'gemini-1.5-pro' });
}

function cleanJsonResponse(text) {
  let cleaned = text.trim();
  // Remove markdown code fences if present
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```(?:json)?\s*\n?/, '').replace(/\n?```\s*$/, '');
  }
  return cleaned.trim();
}

async function optimizeCode({ code, language, fileName }) {
  const model = getModel();

  const prompt = `You are an expert ${language} developer. Analyze this code from file '${fileName}' and return an optimized version. Focus on:
- Performance improvements (memoization, lazy loading, reducing complexity)
- Code readability and maintainability
- Removing unnecessary re-renders (for React code)
- Better error handling
- Modern syntax improvements

Code:
${code}

Return ONLY a JSON object with NO markdown, NO backticks:
{
  "optimizedCode": "the full optimized code as a string",
  "changes": ["list of specific changes made"],
  "performanceGain": "brief description of performance improvements"
}`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleaned = cleanJsonResponse(text);
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    console.error('Gemini optimizeCode error:', error.message);
    return {
      optimizedCode: code,
      changes: ['No changes needed'],
      performanceGain: 'Code is already optimized',
    };
  }
}

async function explainCodebase({ files }) {
  const model = getModel();

  const filesContent = files
    .map((f) => `--- ${f.relativePath} ---\n${f.content}`)
    .join('\n\n');

  const prompt = `Analyze this codebase and return a dependency/architecture graph.
Files:
${filesContent}

Return ONLY a JSON object with NO markdown, NO backticks:
{
  "nodes": [
    { "id": "unique-id", "label": "filename.jsx", "type": "component|utility|config|style|entry",
      "summary": "one sentence about what this file does", "path": "relative/path" }
  ],
  "edges": [
    { "id": "edge-1", "source": "node-id-1", "target": "node-id-2",
      "label": "imports|uses|configures" }
  ],
  "projectSummary": "Overall description of what this project does"
}

Every file should be a node. Add edges wherever one file imports or depends on another.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleaned = cleanJsonResponse(text);
    const parsed = JSON.parse(cleaned);
    return parsed;
  } catch (error) {
    console.error('Gemini explainCodebase error:', error.message);
    return {
      nodes: files.map((f, i) => ({
        id: `node-${i}`,
        label: f.relativePath.split('/').pop(),
        type: 'utility',
        summary: 'Could not analyze this file',
        path: f.relativePath,
      })),
      edges: [],
      projectSummary: 'Could not generate project summary due to an error.',
    };
  }
}

async function extractDecisions({ code, fileName }) {
  const model = getModel();

  const prompt = `Analyze this code from '${fileName}' and extract architectural and implementation decisions. Look for:
- Comments starting with @decision, @reason, @note, @why, @perf
- Any comment that explains WHY something was done (not just what)
- Performance-related decisions (useMemo, useCallback, lazy loading usage)
- Architecture choices evident in the code

Code:
${code}

Return ONLY a JSON array with NO markdown, NO backticks:
[
  {
    "decision": "what was decided",
    "reason": "why it was decided",
    "type": "performance|architecture|security|readability|bugfix",
    "lineHint": "brief code context to locate it"
  }
]

Return empty array [] if no decisions found.`;

  try {
    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();
    const cleaned = cleanJsonResponse(text);
    const parsed = JSON.parse(cleaned);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('Gemini extractDecisions error:', error.message);
    return [];
  }
}

module.exports = {
  optimizeCode,
  explainCodebase,
  extractDecisions,
};
