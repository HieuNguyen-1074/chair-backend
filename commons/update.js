const sql = require('mssql');
const config = require('../config');



const update = async (tableName, data, condition) => {
    
    try {

        var connectSql =   await sql.connect(config);
        var requestSql = await new sql.Request(connectSql);
        let querySql ='';
        data.forEach((element , index) => {
            requestSql.input(`${element.columnName}` , element.sqlType, element.value);
            querySql+=  index === data.length -1  ?`${element.columnName} = @${element.columnName} ` :
            `${element.columnName} = @${element.columnName},` 


        });
        querySql+= 'WHERE '
        condition.forEach((element,index) => {
               requestSql.input(`${element.columnName}` , element.sqlType , element.value);
               querySql+= index === condition.length  - 1? `${element.columnName} = @${element.columnName} ` 
               :
               `${element.columnName} = @${element.columnName},`

        });
        requestSql.query(`UPDATE ${tableName} SET ${querySql} `)

     
      
    } catch (error) {
        console.log(error)
        return {
            error
        }
    }

}


module.exports = update