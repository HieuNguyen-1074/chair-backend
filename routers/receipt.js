const express = require('express');
const { receiptGet, receiptGetAll, RecieptPost, receiptDelete, receiptPut } = require('../controller/receipt');
const { userGet, userPost } = require('../controller/users')
const routerReceipt = express.Router()

routerReceipt.get('/', receiptGetAll);

routerReceipt.get('/:usercode', receiptGet);

routerReceipt.post('/', RecieptPost);
routerReceipt.delete('/:receiptCode', receiptDelete)
routerReceipt.put('/', receiptPut)
module.exports = routerReceipt
