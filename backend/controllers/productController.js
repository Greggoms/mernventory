const Product = require("../models/productModel.js");

// @desc    Get Products from MongoDB
// @route   POST /api/products
// @access  Private
const getProducts = async (req, res) => {
  const { categoryID, fromShopID, fromShopOnlyInStock } = req.body;
  const productList = await Product.find({
    "category.categoryID": categoryID ? categoryID : { $exists: true },
    itemshops: {
      $elemMatch: {
        shopID: fromShopID,
        qoh: fromShopOnlyInStock ? { $gt: 0 } : { $exists: true },
      },
    },
  });
  res.status(200).json(productList);
};

module.exports = { getProducts };
