import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 4284;

// Serve the static files from the Vite build directory
app.use(express.static(path.join(__dirname, 'dist')));

// Send all other requests to index.html (for React Router support)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server is successfully running on port ${PORT}`);
    console.log(`You can access your website at http://45.134.39.212:${PORT}`);
});
