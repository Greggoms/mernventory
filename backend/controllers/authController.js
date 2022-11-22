const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const handleLogin = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Email and password are required." });
  }

  const foundUser = await User.findOne({ email }).exec();
  if (!foundUser)
    return res.status(401).json({ success: false, error: "No user found" });

  // evaluate password
  const match = await bcrypt.compare(password, foundUser.password);
  if (match) {
    const roles = Object.values(foundUser.roles).filter(Boolean);
    // issue JWTs (access & refresh)
    const accessToken = jwt.sign(
      { UserInfo: { id: foundUser._id, email: foundUser.email, roles } },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15min" }
    );
    const refreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );

    // save refresh token to current user in DB
    foundUser.refreshToken = refreshToken;
    const result = await foundUser.save();

    // create httpOnly cookie to store the refresh token
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "None",
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // One Day
    });
    res.json({ accessToken });
  } else {
    res.status(401).json({ success: false, error: "Invalid credentials" });
  }
};

module.exports = {
  handleLogin,
};
