const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    // we have a header named authorization and value 'bearer ' + token
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_KEY, null);
    req.userData = decoded;
    // userData.username, userData._id
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Auth failed",
    });
  }
};
