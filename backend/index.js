import express from 'express';
import dotenv from 'dotenv';
import database from './config/db.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/userRoutes.js';
import cors from 'cors';
import getUserRoutes from './routes/getUserRoutes.js'
import geminiResponse from './gemini.js';

dotenv.config();
database(); 

const app = express();

// ✅ CORS setup
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true 
}));


// Middlewares
app.use(express.json());    
app.use(cookieParser());

// Routes
app.use('/api/auth', userRoutes); 
app.use('/api/user', getUserRoutes); 





const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
