const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const {
  validateEmail,
  validatePhoneNumber,
  isValidDate,
} = require("../utils/validators");

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validateEmail,
      message: (props) => `${props.value} is not a valid email address!`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: validatePhoneNumber,
      message: (props) =>
        `${props.value} is not a valid phone number! Must be 9-11 digits positive number.`,
    },
  },
  address: {
    type: String,
  },
  birthday: {
    type: String,
    validate: {
      validator: isValidDate,
      message: (props) =>
        `${props.value} is not a valid date. Use the format YYYY-MM-DD.`,
    },
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
  isBlocked: {
    type: Boolean,
    default: false,
  },
  cart: {
    type: Array,
    default: [],
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
});
//bcrypt password
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
userSchema.methods.createPasswordResetToken = async function () {
  const resetToken = crypto.randomBytes(32).toString("hex");
  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.passwordResetExpires = Date.now() + 30 * 60 * 1000;
  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
