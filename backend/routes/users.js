const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  deleteUser,
  getUser,
  getMe,
  updateMe,
} = require("../controllers/usersController");

const ROLES_LIST = require("../config/roles_list");
const verifyRoles = require("../middleware/verifyRoles");

router
  .route("/")
  .get(verifyRoles(ROLES_LIST.Admin), getAllUsers)
  .delete(verifyRoles(ROLES_LIST.Admin), deleteUser);

router.route("/me").get(getMe).post(updateMe);

router.route("/:id").get(verifyRoles(ROLES_LIST.Admin), getUser);

module.exports = router;
