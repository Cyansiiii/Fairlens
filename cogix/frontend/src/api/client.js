import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api',
  timeout: 120000,
});

export async function getFileTree(path) {
  try {
    const response = await api.get('/files/tree', { params: { path } });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function getFile(path) {
  try {
    const response = await api.get('/files/file', { params: { path } });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function saveFile(path, content) {
  try {
    const response = await api.put('/files/file', { path, content });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function optimizeCode(code, language, fileName) {
  try {
    const response = await api.post('/ai/optimize', { code, language, fileName });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function explainCodebase(projectPath) {
  try {
    const response = await api.post('/ai/explain', { projectPath });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function extractDecisions(code, fileName) {
  try {
    const response = await api.post('/ai/extract-decisions', { code, fileName });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function getAllDecisions() {
  try {
    const response = await api.get('/memory/all');
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}

export async function saveDecisions(filePath, decisions) {
  try {
    const response = await api.post('/memory/save', { filePath, decisions });
    return response.data;
  } catch (error) {
    return { success: false, error: error.response?.data?.error || error.message };
  }
}
