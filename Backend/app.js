// Backend/app.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import serverless from 'serverless-http';

import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import memoryRoutes from './routes/memory.routes.js';

dotenv.config();

const app = express();

// Connect to DB
connectDB();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
    res.send('Hello World from Express!');
});

app.use('/api/auth', authRoutes);
app.use('/api/memories', memoryRoutes);

// ❌ Don't include app.listen on Vercel
// ✅ Export handler for Vercel
export const handler = serverless(app);

// ✅ Optional: export app for local development
export default app;
