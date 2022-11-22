const mongoose = require("mongoose");

const categorySchema = mongoose.Schema({
  categoryID: {
    type: Number,
  },
  name: {
    type: String,
  },
  fullPathName: {
    type: String,
  },
  parentID: {
    type: Number,
  },
});

module.exports = mongoose.model("Category", categorySchema);
