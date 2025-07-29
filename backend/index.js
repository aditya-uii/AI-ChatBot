import express from 'express';
import dotenv from 'dotenv';
import database from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';

dotenv.config();
database(); 

const app = express();

// Middlewares
app.use(express.json());    
app.use(cookieParser());

// Routes
app.use('/api/auth', userRoutes); 

app.get('/', (req, res) => {
    res.send('Backend is working');
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
