const Category = require("../models/categoryModel.js");

// @desc    Get Categories from MongoDB
// @route   GET /api/categories
// @access  Private
const getCategories = async (req, res) => {
  const categoryList = await Category.find().sort({ fullPathName: 1 });
  res.status(200).json(categoryList);
};

module.exports = { getCategories };
