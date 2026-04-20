const express = require('express');
const router = express.Router();
const { optimizeCode, explainCodebase, extractDecisions } = require('../services/gemini');
const { getAllFilesContent } = require('../services/fileSystem');

router.post('/optimize', async (req, res) => {
  try {
    const { code, language, fileName } = req.body;
    if (!code || !language || !fileName) {
      return res.status(400).json({ success: false, error: 'code, language, and fileName are required' });
    }
    const result = await optimizeCode({ code, language, fileName });
    res.json({ success: true, result });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/explain', async (req, res) => {
  try {
    const { projectPath } = req.body;
    if (!projectPath) {
      return res.status(400).json({ success: false, error: 'projectPath is required' });
    }
    const files = await getAllFilesContent(projectPath);
    const graph = await explainCodebase({ files });
    res.json({ success: true, graph });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/extract-decisions', async (req, res) => {
  try {
    const { code, fileName } = req.body;
    if (!code || !fileName) {
      return res.status(400).json({ success: false, error: 'code and fileName are required' });
    }
    const decisions = await extractDecisions({ code, fileName });
    res.json({ success: true, decisions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
