const User = require("../models/User");
const bcrypt = require("bcrypt");

const getAllUsers = async (req, res) => {
  const users = await User.find().select(["-password", "-refreshToken"]);
  if (!users) return res.status(204).json({ message: "No users found" });
  res.json(users);
};

const deleteUser = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.body.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  const result = await user.deleteOne({ _id: req.body.id });
  res.json(result);
};

const getUser = async (req, res) => {
  if (!req?.params?.id)
    return res.status(400).json({ message: "User ID required" });
  const user = await User.findOne({ _id: req.params.id }).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.params.id} not found` });
  }
  res.json(user);
};

const getMe = async (req, res) => {
  const user = await User.findById(req.userId).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }
  res.json(user);
};

const updateMe = async (req, res) => {
  const user = await User.findById(req.userId).exec();
  if (!user) {
    return res
      .status(204)
      .json({ message: `User ID ${req.body.id} not found` });
  }

  // ecrypt the password if provided
  let hashedPassword;
  if (req.body.password) {
    hashedPassword = await bcrypt.hash(req.body.password, 10);
  }

  await User.findByIdAndUpdate(req.userId, {
    ...req.body,
    password: hashedPassword,
  });

  res.json(`${user.id} updated.`);
};

module.exports = {
  getAllUsers,
  deleteUser,
  getUser,
  getMe,
  updateMe,
};
