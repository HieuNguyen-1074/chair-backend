const sql = require('mssql');
const config = require('../config');

const insert = async (tableName, data) => {
    try {
        // console.log(data)
        // let pool = await sql.connect(config);
        // let keyInsert = '';
        // let dataInsert = '';
        // console.log(data)
        // data.forEach((element, index) => {
        //     console.log(element.value)
        //     if (index === data.length - 1) {
        //         keyInsert += `${element.keySql}`;
        //         (typeof element.value) === 'string' ? dataInsert += `'${element.value}'` : dataInsert += `${element.value}`;

        //     }
        //     else {
        //         keyInsert += `${element.keySql},`;
        //         (typeof element.value) === 'string' ? dataInsert += `'${element.value}',` : dataInsert += `${element.value},`;
        //         console.log(dataInsert)
        //     }
        // });
        // console.log(keyInsert, dataInsert)
        // const sqlQuery = `INSERT INTO ${table}(${keyInsert}) VALUES(${dataInsert})`;
        // console.log(sqlQuery)
        // const result = await sql.query(sqlQuery, err => {
        //     console.log(err)
        // })


        var connectSql = await sql.connect(config);
        var requestSql = await new sql.Request(connectSql);

        let valueQuery = '';
        let columnQuery = '';

        data.forEach((element, index) => {
            // s
            requestSql.input(`${element.columnName}`, element.sqlType, element.value);

            index === data.length - 1 ?
                (
                    columnQuery += `${element.columnName} `,
                    valueQuery += `@${element.columnName} `

                )
                :
                (columnQuery += `${element.columnName},`,
                    valueQuery += `@${element.columnName},`)



        });
        // console.log(`INSERT INTO ${tableName} (${columnQuery}) VALUES (${valueQuery})`)
        requestSql.query(`INSERT INTO ${tableName} (${columnQuery}) VALUES (${valueQuery})`)



    } catch (error) {
        console.log(error)
        return {
            error
        }
    }

}


module.exports = insert