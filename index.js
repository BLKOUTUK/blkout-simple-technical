/**
 * Simple Liberation Platform - Express Server
 * Minimal API without complex dependency injection
 */
const express = require('express');
const cors = require('cors');
const LiberationOrchestrator = require('./LiberationOrchestrator');

const app = express();
const port = process.env.PORT || 3000;

// Middleware - CORS configuration for frontend connection
app.use(cors({
  origin: [
    'https://blkout-liberation-frontend.vercel.app',
    'http://localhost:5173', // Vite dev server
    'http://localhost:3000'  // Alternative dev port
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));
app.use(express.json());

// Initialize orchestrator (simple instantiation)
const orchestrator = new LiberationOrchestrator();

// API Routes
app.post('/api/content', (req, res) => {
  try {
    const result = orchestrator.processContentCreation(req.body);
    res.status(result.success ? 201 : 400).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/metrics', (req, res) => {
  try {
    const metrics = orchestrator.monitorLiberationMetrics();
    res.json(metrics);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/features', (req, res) => {
  try {
    const result = orchestrator.manageFeatureFlags(req.body);
    res.json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'blkout-simple-technical',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Simple BLKOUT Liberation Platform running on port ${port}`);
  console.log(`✅ Ready for testing at http://localhost:${port}`);
});