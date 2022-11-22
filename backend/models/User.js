const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Your name is required"],
    },
    roles: {
      User: {
        type: Number,
        default: 2001,
      },
      Admin: Number,
    },
    email: {
      type: String,
      required: [true, "Your email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [
        true,
        "Your password is required. Must be 6 or more characters.",
      ],
      minlength: 6,
    },
    refreshToken: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
