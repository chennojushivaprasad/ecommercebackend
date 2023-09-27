const jwt = require("jsonwebtoken")

const sendToken = (user,accessToken,statusCode,res) => {
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
  };

  res.status(statusCode).json({ successStatus: true, user, accessToken });

};
const  getJWTToken = (payload)=>{
  const secretKey = process.env.JWT_SECRET;
  const jwtToken = jwt.sign(payload, secretKey,{expiresIn:process.env.JWT_EXPIRE * 24 * 60 * 60 * 1000});
  return  jwtToken
    
}

module.exports.getJWTToken = getJWTToken
module.exports.sendToken = sendToken
