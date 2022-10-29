let jwt = require("jsonwebtoken");

const JWT_SECRET = "aseiopruqawiopfha$%^&$^%#*^%(&*@opsinvuaiosdu3209857434w";

let checkToken = (req, res, next) => {
    // let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
  let token = req.body; // Express headers are auto converted to lowercase
  //   if (token.startsWith('Bearer ')) {
  //     // Remove Bearer from string
  //     token = token.slice(7, token.length);
  //   }
  console.log(req.body);

  if (token) {
    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) {
        return res.json({
          success: false,
          message: "Token is not valid",
          token: token,
        });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};

module.exports = {
  checkToken: checkToken,
};
