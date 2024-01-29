const Transaction = require("../models/transactionModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongoId");

const topUp = asyncHandler(async (req, res) => {
  try {
    const {
      signature,
      phone,
      tranId,
      ackTime,
      partnerId,
      partnerName,
      amount,
      comment,
    } = req.body;
    const latestTransaction = await Transaction.findOne({
      idUser: comment,
    }).sort({ createdAt: -1 });
    let remain = 0;
    if (latestTransaction) {
      remain = latestTransaction.remain;
    }
    const transaction = new Transaction({
      phone: phone,
      idUser: comment,
      description: "Top up from momo",
      amount: amount,
      remain: remain + amount,
      Type: "Top up",
      createdAt: new Date(),
    });

    await transaction.save();
    res.status(200).json(transaction);
  } catch (err) {
    return res.status(500).json({ message: "Error." });
  }
});

const viewTransaction = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    validateMongoDbId(id);
    const transactions = await Transaction.find({ idUser: idUser });
    res.status(200).json(transactions);
  } catch (err) {
    return res.status(500).json({ message: "Not found user." });
  }
});

module.exports = {
  topUp,
  viewTransaction,
};
