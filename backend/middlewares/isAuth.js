import jwt from 'jsonwebtoken';

const isAuth = (req, res, next) => {
  try {
    const token = req.cookies.token; // Make sure cookie-parser is used

    if (!token) {
      console.log("❌ No token found in cookies");
      return res.status(401).json({ message: 'User token not available' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    console.log("✅ Decoded token:", decoded);

  req.userId = decoded.userId || decoded._id; // ✅ works with both formats

    next();

  } catch (error) {
    console.error("❌ Auth error:", error.message);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

export default isAuth;
