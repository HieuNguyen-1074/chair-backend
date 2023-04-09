
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

const dotenv = require('dotenv');
const cors = require('cors')
const path = require('path')

const config = require('./config');
const routerUser = require('./routers/users');
const routerReceipt = require('./routers/receipt');
const routerProduct = require('./routers/product');
const bodyParser = require('body-parser');
var session = require('express-session')

dotenv.config();
const { SERVER_PORT } = process.env
const port = SERVER_PORT || 3000

app.use(cors({
    origin: '*',
    methods: ['POST', 'GET']
}))
app.use(session({
    secret: 'crypted key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // Put true if https
}))
app.use('/static', express.static(path.join(__dirname, 'build')))
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../users/build', 'index.html'));

});
app.use('/api/user', routerUser)
app.use('/api/receipt', routerReceipt)
app.use('/api/product', routerProduct)

// app.use('/', () => {

// })
// io.on('connection', (socket) => {
//     socket.on('chat message', (msg) => {
//         console.log(msg)
//         io.emit('chat message', msg);
//     });
// });
server.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})