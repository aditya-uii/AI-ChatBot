import express from 'express';
import { getUserData } from '../controllers/getUserController.js';
import isAuth from '../middlewares/isAuth.js'
import { askToAssistant, updateAssistant } from '../controllers/authController.js';
import upload from '../middlewares/multer.js';


const getUserRouter = express.Router();

getUserRouter.get('/current',isAuth,getUserData);
getUserRouter.post(
  '/update',
  isAuth,
  upload.single('assistantImage'),
  (req, res, next) => {
    console.log("✅ /update route hit");
    console.log("Body:", req.body);
    console.log("File:", req.file);
    next(); 
  },
  updateAssistant
);

getUserRouter.post('/asktoassistant',isAuth,askToAssistant);



export default  getUserRouter;
