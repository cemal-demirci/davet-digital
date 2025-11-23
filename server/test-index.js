const express = require('express');
const app = express();

app.use(express.json());

// Simple health check
app.get('/', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Test API is running'
  });
});

app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// Export for Vercel
module.exports = app;

// For local development
if (require.main === module) {
  const PORT = process.env.PORT || 5001;
  app.listen(PORT, () => {
    console.log(`Test server running on port ${PORT}`);
  });
}
