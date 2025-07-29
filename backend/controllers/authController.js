import mongoose from "mongoose";
import User from "../models/userModel.js";
import validator from 'validator';

export const signUp = async (req, res) => {
   
  try {
    const { name, email, password } = req.body;

    // Validate fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide name, email, and password" });
    }

    if (!validator.isEmail(email)) {
      return res.status(400).json({ error: 'Invalid email format' });
    }

    if (!validator.isLength(password, { min: 6 })) {
      return res.status(400).json({ error: 'Password must be at least 6 characters' });
    }

    // Check if user already exists
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create user (password will be hashed in schema)
    const user = await User.create({ name, email, password });

    // Generate JWT
    const token = user.generateJWT();

    // Set token in cookie
    res.cookie('token', token, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      sameSite: 'strict',
      secure: false // change to true in production
    });

    // Response
    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      },
      token
    });

  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};


export const login = async (req,res)=>{
try {
  const { email,password } = req.body;

  const user = await User.findOne({email});


  //validating
      if (!email || !password) {
      return res.status(400).json({ message: "Please provide email and password" });
    }
     if (!validator.isEmail(email)) {
      return res.status(400).json({ error: "Invalid email format" });
    }



  if(!user){
return res.status(404).json({error:'Invalid email or password'});
  }

  const isMatch = await User.comparePassword(password);
     if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }
    


} catch (error) {
  
}
}