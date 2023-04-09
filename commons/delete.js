

const sql = require('mssql');
const config = require('../config');



const deleteSql = async (tableName, condition) => {
    console.log(condition)
    try {
        var connectSql = await sql.connect(config);
        var requestSql = await new sql.Request(connectSql);

        // requestSql.input(`${condition.columnName}`, condition.value);
        const query = `DELETE FROM ${tableName} WHERE ${condition.columnName} = N'${condition.value}'`;
        console.log(query)
        const result = await requestSql.query(query);

        return await result;
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }

}
module.exports = deleteSql
