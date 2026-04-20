# ⚡ Cogix — AI Code Editor

An AI-powered code editor built with React, Monaco Editor, and Google Gemini. Optimize code, visualize codebase architecture, and automatically extract design decisions.

## Features

- **🎯 Intent Mode**: One-click code optimization using Gemini AI with side-by-side diff review
- **🗺 Explain Codebase**: Visual architecture graph of your entire project using React Flow
- **💾 Decision Memory**: Automatically extracts and stores why code was written

## Tech Stack

- **Frontend**: React 18 + Vite + Tailwind CSS
- **Code Editor**: Monaco Editor (@monaco-editor/react)
- **Graph Visualization**: React Flow v12 (@xyflow/react)
- **Backend**: Node.js + Express.js
- **AI**: Google Gemini 1.5 Pro via @google/generative-ai SDK
- **Storage**: decisions.json file on disk

## Setup

### Backend

```bash
cd backend && npm install
cp .env.example .env   # then add your Gemini API key
npm run dev
```

### Frontend

```bash
cd frontend && npm install
npm run dev
```

## How to Use

1. Run both servers (backend on port 3001, frontend on port 5173)
2. Open http://localhost:5173
3. Enter the absolute path to any project folder in the toolbar
4. Click **Load Project** to load the file tree
5. Click any file to open it in the Monaco editor
6. Use toolbar buttons to activate AI features:
   - **🎯 Optimize File** — Sends current file to Gemini for optimization, shows diff, accept/reject
   - **🗺 Explain Codebase** — Generates a visual architecture graph of all project files
   - **💾 Memory** — Toggles the decision memory panel showing extracted decisions
7. Press **Ctrl+S / Cmd+S** to save files (also auto-extracts decisions)

## Architecture

```
cogix/
├── backend/           # Express.js API server
│   ├── server.js      # Entry point, port 3001
│   ├── routes/        # API routes (files, ai, memory)
│   ├── services/      # Business logic (gemini, fileSystem)
│   └── decisions.json # Persisted decision memory
│
└── frontend/          # React + Vite app
    └── src/
        ├── App.jsx           # Main layout & state
        ├── components/       # UI components
        ├── hooks/            # Custom React hooks
        └── api/client.js     # Axios API client
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `GEMINI_API_KEY` | Your Google Gemini API key |
