import { v2 as cloudinary } from 'cloudinary';
import fs from'fs';

const uploadOnCloudianry = async (filepath)=>{
     // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUD_KEY, 
        api_secret: process.env.CLOUD_SECRET
    });

    try {
         
    // Upload an image
     const uploadResult = await cloudinary.uploader
       .upload( filepath )
       
       fs.unlinkSync(filepath)

       return upload.secure_url

       .catch((error) => {
         fs.unlinkSync(filepath)
           console.log(error);
       });


    } catch (error) {
        console.log(error)
    }
}


export default uploadOnCloudianry;