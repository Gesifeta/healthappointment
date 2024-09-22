
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectToMongo } from './db.js';
import { router } from './routes/auth.js';
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

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
