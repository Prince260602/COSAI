// const jwt = require("jsonwebtoken");
// const User = require("../Models/user.model");

// const authMiddleware = async (req, res, next) => {
//   let token;

//   const headerAuth = req.headers.authorization;
//   const headerAuthStartWith = req.headers.authorization.startsWith("Bearer");

//   if (headerAuth && headerAuthStartWith) {
//     try {
//       console.log(headerAuth);
//       token = headerAuth.split(" ")[1];
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);
//       req.user = await User.findById(decoded.id).select("-password");

//       if (!req.user) {
//         return res.status(404).json({ message: "User not found" });
//       }

//       next();
//     } catch (error) {
//       console.error("Token verification failed", error.message);
//       res.status(401).json({
//         message: "Invalid or expired token",
//       });
//     }
//   }

//   if (!token) {
//     res.status(401).json({
//       message: "Not authorized, no token",
//     });
//   }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");
const User = require("../Models/user.model");

const authMiddleware = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return res.status(404).json({ message: "User not found" });
      }

      next();
    } catch (error) {
      console.error("Token verification failed:", error);
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  } else {
    return res.status(401).json({ message: "Not authorized, no token" });
  }
};

module.exports = authMiddleware;
