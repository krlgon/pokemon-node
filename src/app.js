const cors = require('cors');
const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger');
const characterRoutes = require('./routes/characters');

const app = express();

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pokemon-node' });
});

app.use('/api/pokemon', characterRoutes);
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get('/swagger.json', (_req, res) => res.json(swaggerSpec));

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(500).json({
    message: 'Internal server error',
    error: error.message,
    code: error.code
  });
});

module.exports = app;

