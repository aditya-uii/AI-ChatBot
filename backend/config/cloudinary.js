import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

const uploadOnCloudianry = async (filepath) => {
  // Configuration
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_KEY,
    api_secret: process.env.CLOUD_SECRET
  });

  try {
    // Upload an image
    const uploadResult = await cloudinary.uploader.upload(filepath);

    // remove file from local after upload
    fs.unlinkSync(filepath);

    // return Cloudinary image URL
    return uploadResult.secure_url;

  } catch (error) {
    // cleanup if error occurs
    if (fs.existsSync(filepath)) {
      fs.unlinkSync(filepath);
    }
    console.error("Cloudinary upload error:", error);
    throw error;
  }
};

export default uploadOnCloudianry;
