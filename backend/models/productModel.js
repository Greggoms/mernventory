const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  systemSku: {
    type: Number,
  },
  itemID: {
    type: Number,
  },
  description: {
    type: String,
  },
  pricing: {
    default: { type: Number },
    msrp: { type: Number },
    online: { type: Number },
  },
  category: {
    categoryID: { type: Number },
    parentID: { type: Number },
    categoryName: { type: String },
    categoryFullPath: { type: String },
  },
  itemshops: [
    {
      shopName: { type: String },
      shopID: { type: Number },
      itemID: { type: Number },
      qoh: { type: Number },
      reorderPoint: { type: Number },
      reorderLevel: { type: Number },
      timestamp: { type: Date },
    },
  ],
});

module.exports = mongoose.model("Product", productSchema);
