const validateCouponData = (data) => {
  const { expiry, discount } = data;
  if (!data) {
    throw new Error("Expiry and discount are required fields.");
  }
  if (expiry) {
    const expiryDate = new Date(expiry);
    const today = new Date();

    if (isNaN(expiryDate.getTime())) {
      throw new Error("Expiry must be a valid date.");
    }
    if (expiryDate < today) {
      throw new Error("Expiry must be a date in the future.");
    }
  }
  if (discount !== undefined && discount <= 0) {
    throw new Error("Discount must be greater than or equal to 0.");
  }
};
module.exports = validateCouponData;
