
const dotenv = require('dotenv');

dotenv.config({ path: './.env' });

const { DB_SERVER, DB_NAMELOGIN, DB_NAME, DB_PASSWORD } = process.env

const config = {
    user: DB_NAMELOGIN,
    server: DB_SERVER,
    password: DB_PASSWORD,
    database: DB_NAME,
    options: {
        trustedConnection: true,
        useUTC: true,
        enableArithAbort: true,
        trustServerCertificate: true
        
    }
}
module.exports = config