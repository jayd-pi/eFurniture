const validator = require('validator');

const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validatePhoneNumber = (phoneNumber) => {
  const phoneRegex = /^[0-9]{9,11}$/;
  return phoneRegex.test(phoneNumber);
};
const isValidDate = (dateString) => {
  const regex = /^\d{4}-\d{2}-\d{2}$/;
  return dateString.match(regex) !== null;
};
const isValidImageSize = (imageUrl) => {
  return validator.isURL(imageUrl) && validator.isByteLength(imageUrl, { max: 10 * 1024 * 1024 });
}
module.exports = {
  validateEmail,
  validatePhoneNumber,
  isValidDate,
  isValidImageSize
};
