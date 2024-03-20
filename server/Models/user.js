const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: {
    type: String,
    require: [true, "Email is required"],
    unique: [true, "this email is already registerd"],
    trim: true,
  },
  password: {
    type: String,
    require: [true, "password is required"],
    min: [6, "password should be minimun of 6 charactors"],
    trim: true,
  },
  // confirmPassword: {
  //   type: String,
  //   require: [true, "Confirm password is required"],
  //   min: [6, "password should be minimun of 6 charactors"],
  //   trim: true,
  // },
  name: {
    type: String,
    require: [true, "name is required"],
    trim: true,
  },
  image: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ["admin", "seller", "customer"],
    default: "customer",
  },

  address: {
    type: String,
    trim: true,
  },
  phoneNumber: {
    type: String,
    trim: true,
  },
});

exports.User = mongoose.model("User", userSchema);
