import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { env } from './utils/env.js';
import eventsRouter from './routers/events.js';

export const setupServer = () => {
  const app = express();

  // Logger setup
  const logger = pino({
    transport: {
      target: 'pino-pretty',
    },
  });

  // Middleware setup
  app.use(logger);
  app.use(cors()); // Enables Cross-Origin Resource Sharing
  app.use(express.json()); // Parse incoming JSON requests

  app.use('/events', eventsRouter);

  // 404 handler for unknown routes
  app.use((req, res) => {
    res.status(404).json({
      message: `${req.url} not found`,
    });
  });

  // Global error handler
  app.use((error, req, res, next) => {
    console.error('Error:', error.message); // Log the error for debugging
    res.status(500).json({
      message: 'Something went wrong',
    });
  });

  const port = Number(env('PORT', 3000));
  app.listen(port, () => console.log(`Server is running on port ${port}`));
};
