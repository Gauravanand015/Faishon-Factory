const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateAdmin = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    var decoded = jwt.verify(
      token,
      process.env.adminSecretKey,
      (err, decoded) => {
        if (decoded) {
          next();
        } else {
          res.send("You Are Not Authorised in validateAdmin!!");
        }
      }
    );
  } catch (error) {
    res.send("Something Went Wrong in middleware in validateAdmin!!");
    console.log(error);
  }
};

module.exports = {
  validateAdmin,
};
