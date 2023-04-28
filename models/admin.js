const mongoose = require("mongoose");

const adminLoginSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add the  name"],
    },
    email: {
      type: String,
      required: [true, "Please add the  email address"],
    },
    mobile: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
    gender: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "Please add the password"],
    },
  },
  {
    timestamps: true,
  },
  
);

module.exports = mongoose.model("User", adminLoginSchema);