import express from 'express';
import posts from './routes/posts.js'; // Need .js extension for local imports
import logger from './middleware/logger.js';
import errorHandler from './middleware/errorHandler.js';
import notFound from './middleware/notFound.js';
import { fileURLToPath } from 'url';
import path from 'path';
const port = process.env.PORT || 2025;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Body parser middleware
app.use(express.json()); // handles form data
app.use(express.urlencoded({extended: false})); // Handle www-form data

// Logger middleware
app.use(logger);

// setup static folder middleware
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/api/posts', posts);

// Error handler - Must be below posts
app.use(notFound);
app.use(errorHandler);

// app.get('/', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

// app.get('/about', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'about.html'));
// });

app.listen(port, () => {
    console.log(`Server running in port ${port}`);
});