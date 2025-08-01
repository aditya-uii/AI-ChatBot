import express from 'express';
import { getUserData } from '../controllers/getUserController.js';


const userRouter = express.Router();

userRouter.get('/current',getUserData)


export default  userRouter;
