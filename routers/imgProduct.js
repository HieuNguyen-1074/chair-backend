const express = require('express');
const { putImgProduct } = require('../controller/imgProduct');

const routerProductImg = express.Router();
routerProductImg.put('/', putImgProduct)


module.exports = routerProductImg