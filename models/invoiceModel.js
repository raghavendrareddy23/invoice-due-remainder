const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const invoiceSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'GoogleUser',
    required: true,
  },
  recipientName:String,
  amount: Number,
  dueDate: Date,
  recipient: String,
});

module.exports = mongoose.model('Invoice', invoiceSchema);
