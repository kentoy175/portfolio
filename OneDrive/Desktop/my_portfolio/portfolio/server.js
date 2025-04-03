const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS (optional, useful if your frontend is hosted separately)
app.use(cors());

// Log directory contents to verify files exist
console.log('Current directory:', __dirname);
console.log('Directory contents:', require('fs').readdirSync(__dirname));

// Serve static files from the React/Vite app build directory
const buildPath = path.join(__dirname, 'portfolio/dist');
console.log('Checking if build path exists:', require('fs').existsSync(buildPath));

app.use(express.static(buildPath));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Handle all other routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Use Render-assigned port or default to 10000 (higher port less likely to have conflicts)
const PORT = process.env.PORT || 10000;
const HOST = '0.0.0.0';

// Start server and listen on all interfaces
console.log('Attempting to start server...');
const server = app.listen(PORT, HOST, () => {
  console.log(`✅ Server is running on http://${HOST}:${PORT}`);
  console.log(`✅ Binding to ${HOST} for external access`);
  console.log(`✅ Serving static files from ${buildPath}`);
}).on('error', (err) => {
  console.error('❌ Failed to start server:', err);
});

// Add proper error handling
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
