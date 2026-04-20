require('dotenv').config();

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const filesRouter = require('./routes/files');
const aiRouter = require('./routes/ai');
const memoryRouter = require('./routes/memory');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Mount routes
app.use('/api/files', filesRouter);
app.use('/api/ai', aiRouter);
app.use('/api/memory', memoryRouter);

// Ensure decisions.json exists on startup
const decisionsPath = path.join(__dirname, 'decisions.json');
if (!fs.existsSync(decisionsPath)) {
  fs.writeFileSync(decisionsPath, '{}', 'utf-8');
}

app.listen(PORT, () => {
  console.log(`Cogix backend running on port ${PORT}`);
});
