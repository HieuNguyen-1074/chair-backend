const express = require('express');
const { productGet, productPut, productDelete, productPost } = require('../controller/product');
const routerProductImg = require('./imgProduct');

const routerProduct = express.Router()

routerProduct.get('/', productGet);
routerProduct.put('/:idProduct', productPut)
routerProduct.post('/', productPost);

routerProduct.delete('/:productCode', productDelete)
module.exports = routerProduct

