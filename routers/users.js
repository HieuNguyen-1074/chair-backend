const express = require('express')
const { userGet, userPost, userPut, userGetAll, userDelete } = require('../controller/users')
const routerUser = express.Router()

routerUser.get('/:userName/:password', userGet);
routerUser.get('/', userGetAll);
routerUser.post('/', userPost);
routerUser.put('/', userPut);
routerUser.delete('/:userCode', userDelete)

module.exports = routerUser
