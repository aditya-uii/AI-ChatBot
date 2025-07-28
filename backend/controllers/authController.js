import User from "../models/userModel";
import validator from 'validator';

export const signUp = async ()=>{

    try {
        const {name,email,password} = req.body;

         if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide name, email, and password" });
  }


        const userExist = await User.findOne(email);
        if(userExist){
            return res.status(400).json({error:'User already exists'});
        }

if(!validator.isEmail(email)){
 return  res.status(400).json({error:'Invalid email format'});
};

 if (!validator.isLength(password, { min: 6 })) {
    return res.status(400).json({ error: 'Password must be at least 6 characters' });
  };

  const hashPassword = await User.hashPassword(password);

  const user = await User.create({
    name,email,password:hashPassword
  })

  const token = new user.generateAuthToken();

   res.status(201).json({token, user});
        
    }
    
    catch (error) {
         console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
    }
}