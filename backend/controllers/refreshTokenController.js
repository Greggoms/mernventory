const User = require("../models/User");
const jwt = require("jsonwebtoken");

const handleRefreshToken = async (req, res) => {
  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(401)
      .json({ success: false, error: "Missing or invalid token" });

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser)
    return res.status(403).json({ success: false, error: "No user found" });

  // evaluate jwt
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
    if (err || foundUser.email !== decoded.email)
      return res
        .status(403)
        .json({ success: false, error: err || "Invalid Token" });

    const roles = Object.values(foundUser.roles);
    const accessToken = jwt.sign(
      { UserInfo: { id: foundUser._id, email: decoded.email, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    res.json({ accessToken });
  });
};

module.exports = {
  handleRefreshToken,
};
