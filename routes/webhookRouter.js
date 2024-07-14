const express = require('express');
const webhookRouter = express.Router();
const webhookController = require('../controllers/webhookController');

webhookRouter.post('/receive', webhookController.handleWebhook);

module.exports = webhookRouter;
