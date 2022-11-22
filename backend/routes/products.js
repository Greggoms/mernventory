const express = require("express");
const router = express.Router();
const { getProducts } = require("../controllers/productController");

router.route("/").post(getProducts);

module.exports = router;
