import User from '../models/userModel.js';

export const getUserData = async (req, res) => {
  try {
    // console.log("🔍 Fetching user with ID:", req.userId);

    const user = await User.findById(req.userId).select('-password');

    if (!user) {
      console.log("❌ No user found for this ID");
      return res.status(404).json({ message: 'User not found' });
    }

    // console.log("✅ User found:", user);
    return res.status(200).json(user);

  } catch (error) {
    console.error("❌ Error finding user:", error.message);
    return res.status(500).json({ message: 'Error finding the user' });
  }
};
