const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
  shopID: {
    type: Number,
  },
  name: {
    type: String,
  },
});

module.exports = mongoose.model("Shop", shopSchema);
