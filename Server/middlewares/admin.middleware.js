const jwt = require("jsonwebtoken");

const adminMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).send({ message: "Unauthorized - Token missing" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    const userType = req.user.userType;
    if (userType === 3) {
      next();
    } else {
      res.status(403).send({ message: "Forbidden - Admin access required" });
    }
  } catch (error) {
    console.error(error);
    res.status(401).send({ message: "Unauthorized - Invalid token" });
  }
};

module.exports = adminMiddleware;
