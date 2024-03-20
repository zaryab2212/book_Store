const NewError = require("./newError");
const cloudinary = require("cloudinary").v2;
const { v4: uuidv4 } = require("uuid"); // Import UUID library

cloudinary.config({
  cloud_name: "dvv4ffhvi",
  api_key: "467479789366527",
  api_secret: "omveynTqndXu9lAWONOuSfthJU8",
});

exports.cloudinaryUploader = async (file) => {
  try {
    const folderName = file.fieldname === "image" ? "/images" : "/pdfs";
    const basefile = file.buffer.toString("base64");
    const uploadOptions = {
      folder: `book_store${folderName}`,
      public_id: folderName + file.originalname.split(".")[0], // Use a unique identifier as part of the public_id
    };

    const result = await cloudinary.uploader.upload(
      `data:${file.mimetype};base64,${basefile}`,
      {
        resource_type: "auto",
      }
    );
    return result.url;
  } catch (error) {
    throw new NewError("Image could not be uploaded on Cloudinary", 400, error);
  }
};
