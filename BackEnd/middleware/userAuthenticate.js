const jwt = require("jsonwebtoken");
require("dotenv").config();

const validateUser = (req, res, next) => {
  const token = req.headers.authorization;
  try {
    var decoded = jwt.verify(
      token,
      process.env.userSecretKey,
      (err, decoded) => {
        console.log("GETTING TOKEN FROM USER", decoded);
        if (decoded) {
          console.log("decoded",decoded);
          const userId = decoded.userID;
          req.body.userID = userId;
          req.body.role = decoded.role;
          req.body.name = decoded.name
          next();
        } else {
          res.send("You Are Not Authorised  in validate user!!");
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.send("Something Went Wrong in validateUser !!");
  }
};

module.exports = {
  validateUser,
};
