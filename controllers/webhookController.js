const Invoice = require("../models/invoiceModel");

exports.handleWebhook = async (req, res) => {
  try {
    const { invoiceId } = req.body;

    const invoice = await Invoice.findById(invoiceId).populate("userId");
    if (!invoice) {
      return res.status(404).json({ error: "Invoice not found" });
    }

    await triggerZapierWebhook(invoice);

    res.status(200).json({ message: "Webhook processed successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const triggerZapierWebhook = async (invoice) => {
  const zapierWebhookUrl = process.env.ZAPIER_WEBHOOK_URL;
  const dueDate = new Date(invoice.dueDate);
  const currentDate = new Date();
  const daysRemaining = Math.ceil(
    (dueDate - currentDate) / (1000 * 60 * 60 * 24)
  );

  if (daysRemaining <= 10) {
    try {
      const response = await fetch(zapierWebhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          receiver: invoice.recipient,
          subject: "Reminder for Payment",
          message:
            `Dear ${invoice.recipientName},\n\n` +
            `This is a reminder that you have an outstanding invoice of ₹${
              invoice.amount
            } due on ${dueDate.toDateString()}.\n\n` +
            `You have ${daysRemaining} day${
              daysRemaining !== 1 ? "s" : ""
            } left to complete your payment by the due date to avoid any late fees.\n\n` +
            `Thank you!`,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to trigger Zapier webhook");
      }

      console.log("Zapier webhook triggered successfully");
    } catch (error) {
      console.error("Error triggering Zapier webhook:", error.message);
      throw error; 
    }
  } else {
    console.log(`Invoice ${invoice._id} does not require a reminder yet.`);
  }
};
