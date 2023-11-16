

module.exports = (image) => {
  console.log(image,"image uploD")
  return new Promise((resolve, reject) => {
    cloudinary.v2.uploader.upload(image, (error, result) => {
      console.log(result,"result",image)
      if (result && result.secure_url) {
        return resolve(result.secure_url);
      }
      return reject({ message: error.message });
    });
  });
};

module.exports.cloudinary = cloudinary