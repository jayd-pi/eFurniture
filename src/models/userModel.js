const mongoose = require("mongoose");
const { validateEmail, validatePhoneNumber, isValidDate } = require("../utils/validators");

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
    validate: {
      validator: validatePhoneNumber,
      message: (props) =>
        `${props.value} is not a valid phone number! Must be 9-11 digits positive number.`,
    },
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  birthday: {
    type: String,
    validate: {
      validator: isValidDate,
      message: props => `${props.value} is not a valid date. Use the format YYYY-MM-DD.`,
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

module.exports = mongoose.model("User", userSchema);
