import express from 'express';
import { getUserData } from '../controllers/getUserController.js';
import isAuth from '../middlewares/isAuth.js'


const getUserRouter = express.Router();

getUserRouter.get('/current',isAuth,getUserData)


export default  getUserRouter;
