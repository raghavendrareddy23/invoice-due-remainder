const express = require('express');
const router = express.Router();
const invoiceRouter = require('./invoiceRoutes');
const webhookRouter = require('./webhookRouter')

router.use('/invoice', invoiceRouter);
router.use('/webhook', webhookRouter);

module.exports = router;
