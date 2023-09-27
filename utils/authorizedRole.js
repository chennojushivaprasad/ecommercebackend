const authorizedRole = (role) => {
  return (req, res, next) => {
    if (req.authenticatedUser.role === role) {
      return next(); // User has the required role, proceed to the next middleware/route
    }
    res.status(403).send("Unauthorized"); // User does not have the required role
  };
};


module.exports.authorizedRole = authorizedRole