import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (fileBuffer: Buffer, folder?: string) => {
  try {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: folder ? folder : "Portfolio/Images",
          use_filename: true,
          unique_filename: true,
          resource_type: "image",
        },
        (error, result) => {
          if (error) {
            console.error("Error uploading image to Cloudinary:", error);
            reject(new Error("Failed to upload image to Cloudinary"));
          } else {
            resolve({
              url: result?.secure_url, // The URL of the uploaded image
              publicId: result?.public_id, // The public ID of the image in Cloudinary
            });
          }
        }
      );

      // Write the buffer to the upload stream
      uploadStream.end(fileBuffer);
    });
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};
