

module.exports = (image) => {
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (error, result) => {
    
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      return reject({ message: error.message });
    });
  });
};

module.exports.cloudinary = cloudinary