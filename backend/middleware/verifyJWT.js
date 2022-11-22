const jwt = require("jsonwebtoken");

const verifyJWT = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  if (!authHeader?.startsWith("Bearer "))
    return res.status(401).json({ success: false, error: "No token found" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
    if (err)
      return res.status(403).json({ success: false, error: "Invalid token" });
    req.user = decoded.UserInfo.email;
    req.userId = decoded.UserInfo.id;
    req.roles = decoded.UserInfo.roles;
    next();
  });
};

module.exports = verifyJWT;
