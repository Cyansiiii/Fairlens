const express = require('express');
const router = express.Router();
const { getFileTree, readFile, writeFile, getAllFilesContent } = require('../services/fileSystem');

router.get('/tree', async (req, res) => {
  try {
    const { path: dirPath } = req.query;
    if (!dirPath) {
      return res.status(400).json({ success: false, error: 'path query parameter is required' });
    }
    const tree = await getFileTree(dirPath);
    res.json({ success: true, tree });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/file', async (req, res) => {
  try {
    const { path: filePath } = req.query;
    if (!filePath) {
      return res.status(400).json({ success: false, error: 'path query parameter is required' });
    }
    const { content, language } = await readFile(filePath);
    res.json({ success: true, content, language });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.put('/file', async (req, res) => {
  try {
    const { path: filePath, content } = req.body;
    if (!filePath || content === undefined) {
      return res.status(400).json({ success: false, error: 'path and content are required' });
    }
    await writeFile(filePath, content);
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.get('/all', async (req, res) => {
  try {
    const { path: dirPath } = req.query;
    if (!dirPath) {
      return res.status(400).json({ success: false, error: 'path query parameter is required' });
    }
    const files = await getAllFilesContent(dirPath);
    res.json({ success: true, files });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
