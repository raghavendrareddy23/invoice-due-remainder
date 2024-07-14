const Invoice = require("../models/invoiceModel");

exports.getInvoices = async (req, res) => {
  try {
    const today = new Date();
    const tenDaysLater = new Date(today.getTime() + 10 * 24 * 60 * 60 * 1000); 

    const invoices = await Invoice.find({
      userId: req.query.userId,
      dueDate: { $gte: today, $lte: tenDaysLater },
    });
    res.status(200).json(invoices);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createInvoice = async (req, res) => {
  try {
    const { recipientName, amount, dueDate, recipient, userId } = req.body;
    const newInvoice = new Invoice({
      userId: userId || req.user.id,
      recipientName,
      amount,
      dueDate,
      recipient,
    });

    await newInvoice.save();
    res.status(201).json(newInvoice);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
