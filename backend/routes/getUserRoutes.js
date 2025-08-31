import express from 'express';
import { getUserData } from '../controllers/getUserController.js';
import isAuth from '../middlewares/isAuth.js'
import { updateAssistant } from '../controllers/authController.js';
import upload from '../middlewares/multer.js';


const getUserRouter = express.Router();

getUserRouter.get('/current',isAuth,getUserData);
getUserRouter.post('/updateAssistant',isAuth,upload.single('assistantImage'),updateAssistant);


export default  getUserRouter;
