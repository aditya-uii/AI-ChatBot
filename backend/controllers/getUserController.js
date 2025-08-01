import User from '../models/userModel.js'

export const getUserData = async (req,res)=>{
    try {
    const userId = req.userId;
    const user = await User.findById(userId).select('-password');

    if(!user){
        return res.status(400).json({message:'User not found'});
    }

    return res.status(200).json(user)
    
} catch (error) {
      return res.status(400).json({message:'error finding the user'});
}
}