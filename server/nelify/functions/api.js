
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import ServerlessHttp from 'serverless-http';
import { fileURLToPath } from 'url';

import { connectToMongo } from './db.js';
import { router } from './routes/auth.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

dotenv.config();
app.set('view engine', 'ejs')
app.use(express.static('public'))

const PORT = process.env.PORT;


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
connectToMongo();

// Routes
app.use('/api/auth', router);
//server static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});


app.get('/', (req, res) => {
  res.send('Hello World!');
});

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port http://localhost:${PORT}`);
// });

export const handler = ServerlessHttp(app);