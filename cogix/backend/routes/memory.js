const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DECISIONS_FILE = path.join(__dirname, '..', 'decisions.json');

function readDecisions() {
  try {
    const data = fs.readFileSync(DECISIONS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return {};
  }
}

function writeDecisions(decisions) {
  fs.writeFileSync(DECISIONS_FILE, JSON.stringify(decisions, null, 2), 'utf-8');
}

router.get('/all', async (req, res) => {
  try {
    const decisions = readDecisions();
    res.json({ success: true, decisions });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.post('/save', async (req, res) => {
  try {
    const { filePath, decisions: newDecisions } = req.body;
    if (!filePath || !Array.isArray(newDecisions)) {
      return res.status(400).json({ success: false, error: 'filePath and decisions array are required' });
    }

    const allDecisions = readDecisions();

    if (!allDecisions[filePath]) {
      allDecisions[filePath] = [];
    }

    const enrichedDecisions = newDecisions.map((d) => ({
      id: uuidv4(),
      decision: d.decision,
      reason: d.reason,
      type: d.type,
      lineHint: d.lineHint,
      timestamp: new Date().toISOString(),
      fileName: filePath.split('/').pop(),
    }));

    allDecisions[filePath] = [...allDecisions[filePath], ...enrichedDecisions];
    writeDecisions(allDecisions);

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

router.delete('/clear/:filePath(*)', async (req, res) => {
  try {
    const { filePath } = req.params;
    const allDecisions = readDecisions();

    if (allDecisions[filePath]) {
      delete allDecisions[filePath];
      writeDecisions(allDecisions);
    }

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;
