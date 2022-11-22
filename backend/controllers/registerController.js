const User = require("../models/User");
const bcrypt = require("bcrypt");

const handleNewUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      error: "Your name, email, and password are required.",
    });
  }

  if (password.length < 6)
    return res
      .status(400)
      .json({
        success: false,
        error: "Password must be at least 6 characters.",
      });

  // check for duplicate user email
  const duplicate = await User.findOne({ email }).exec();
  if (duplicate)
    return res
      .status(409)
      .json({ success: false, error: "This user already exists." });

  try {
    // ecrypt the password
    const hashedPassword = await bcrypt.hash(password, 10);
    // create and store the new user
    const result = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: `New user created! - ${name + " " + email}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
};

module.exports = {
  handleNewUser,
};
