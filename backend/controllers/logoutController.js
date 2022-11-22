const User = require("../models/User");

const handleLogout = async (req, res) => {
  // On client, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt)
    return res
      .status(204) // No content
      .json({ success: true, message: "Token previously removed" });

  const refreshToken = cookies.jwt;

  // is refreshToken in DB?
  const foundUser = await User.findOne({ refreshToken }).exec();
  if (!foundUser) {
    res.clearCookie("jwt", {
      httpOnly: true,
      sameSite: "None",
      secure: true,
    });
    return res
      .status(204)
      .json({ success: true, message: "No user, token removed" });
  }

  // Delete the refreshToken in DB
  foundUser.refreshToken = "";
  const result = await foundUser.save();

  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    secure: true,
  });
  res.status(204).json({ success: true, message: "Token manually removed" });
};

module.exports = {
  handleLogout,
};
