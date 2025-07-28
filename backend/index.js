import express from 'express';
import dotenv from 'dotenv';
import database from './config/db.js';


dotenv.config();



const app = express();
const port = process.env.PORT || 8000;;

app.get('/',(req,res)=>{
    res.send("HELOO IT IS RUNNING");
});

app.listen(port,()=>{
    database();
    console.log('Server is running');
})