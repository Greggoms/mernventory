const Shop = require("../models/shopModel.js");

// @desc    Get Shops from MongoDB
// @route   GET /api/shops
// @access  Private
const getShops = async (req, res) => {
  const shopList = await Shop.find().sort({ name: 1 });
  res.status(200).json(shopList);
};

module.exports = { getShops };
