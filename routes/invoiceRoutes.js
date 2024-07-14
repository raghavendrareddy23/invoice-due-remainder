const express = require('express');
const invoiceRouter = express.Router();
const invoiceController = require('../controllers/invoiceController');

invoiceRouter.get('/', invoiceController.getInvoices);
invoiceRouter.post('/', invoiceController.createInvoice);

module.exports = invoiceRouter;
