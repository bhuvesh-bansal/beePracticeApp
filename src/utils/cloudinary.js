import{v2 as cloudinary} from "cloudinary"
import exp from "constants";
import fs from "fs"
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localfilepath) => {
  try {
    if (!localfilepath) return null
    //upload file on cloudinary
    const response = await cloudinary.uploader.upload(localfilepath,{
      resource_type : "auto"
    })
    //file has been uploaded successfully
    // console.log("File uploaded on cloudinary",response.url);
    fs.unlinkSync(localfilepath)
    return response;
  } catch (error) {
    fs.unlinkSync(localfilepath)//removes the locally saved temporary file as the upload operation failed
    return null;
  }
}

export {uploadOnCloudinary}