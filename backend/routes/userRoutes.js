import express from 'express';
import { signUp,login,logOut } from '../controllers/authController.js';

const router = express.Router();


router.post('/signup', signUp);
router.post('/login', login);
router.post('/logging-out', logOut);


export default router;
