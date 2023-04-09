const sql = require('mssql');
const config = require('../config');



const select = async (query) => {
    try {
        let pool = await sql.connect(config);
        const result = await sql.query(query);
        return result.recordset;
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }

}


module.exports = select