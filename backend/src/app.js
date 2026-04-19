require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const taskRoutes = require('./routes/tasks.routes');
const projectRoutes = require('./routes/projects.routes');
const equityRoutes = require('./routes/equity.routes');

const app = express();

// Security and utility middleware
app.use(helmet());
app.use(cors());
app.use(express.json());

// Basic health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'EquiTask API is running!' });
});

// Register routes
app.use('/api/tasks', taskRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/equity', equityRoutes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
});

module.exports = app;
