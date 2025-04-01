const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();

// Enable CORS (optional, useful if your frontend is hosted separately)
app.use(cors());

// Serve static files from the React/Vite app build directory
const buildPath = path.join(__dirname, 'portfolio/dist');
app.use(express.static(buildPath));

// Handle requests to the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Handle all other routes (for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});

// Use Render-assigned port or default to 3000
const port = process.env.PORT || 3000;

// Start server and listen on all interfaces
app.listen(port, '0.0.0.0', () => {
  console.log(`✅ Server is running on port ${port}`);
  console.log(`✅ Serving static files from ${buildPath}`);
});
