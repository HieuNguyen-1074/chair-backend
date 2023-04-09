const { query } = require("express");
const { Int, Char, Money } = require("mssql");
const sql = require("mssql");
const createNewIndex = require("../commons/createNewIndex");
const deleteSql = require("../commons/delete");
const insert = require("../commons/insert");
const removeSpace = require("../commons/removeSpace");

const select = require("../commons/select");
const update = require("../commons/update");
const { options } = require("../config");

////POST /////////////////////////////////

exports.RecieptPost = (req, res) => {
    const { data, accountCode } = req.body;
    const query = 'SELECT * FROM RECEIPT'
    console.log(data)
    data.forEach((item, index) => {
        select(query).then(result => {
            console.log('ss')
            // console.log(createNewIndex(result, 'RECEIPTCODE'))
            const productCode = {
                value: item.id,
                sqlType: Char,
                columnName: 'PRODUCTCODE'
            };
            const quality = {
                value: item.quality,
                sqlType: Int,
                columnName: 'QUALITY'
            };
            const timeOrder = {
                value: item.dateBuy,
                sqlType: sql.Date,
                columnName: 'TIMEORDER'
            }
            const status = {
                value: "AWAIT",
                sqlType: Char,
                columnName: 'STATUS'
            }
            const shipping = {
                value: item.shipping,
                sqlType: Char,
                columnName: 'SHIPPING'
            }
            const discount = {
                value: item.discount,
                sqlType: Int,
                columnName: 'DISCOUNT'
            };
            const account = {
                value: accountCode,
                sqlType: Char,
                columnName: 'ACCOUNTCODE'
            };
            const receiptCode = {
                value: createNewIndex(result, 'RECEIPTCODE', index),
                sqlType: Char,
                columnName: 'RECEIPTCODE'
            };
            const dataInsert = [
                productCode, quality, timeOrder, status, shipping, discount, receiptCode, account
            ]
            console.log(dataInsert)
            insert('RECEIPT', dataInsert)
        })

    })
}

//++++++++++++++++++GET ALL RECEIPT+++++++++++++++++++++++++++++++++++++++++++++
exports.receiptGetAll = (req, res) => {
    const query = 'SELECT * FROM RECEIPT';

    select(query).then((result) => {
        const data = removeSpace(result);
        res.send(data)
    })

}
exports.receiptGet = (req, res) => {
    const { usercode } = req.params;
    const query = `SELECT * FROM RECEIPT WHERE ACCOUNTCODE = '${usercode}'`;

    select(query).then((result) => {

        const data = removeSpace(result).map((item, index) => {
            const keys = Object.keys(item);
            const newItem = {};
            const s = new Date(item.TIMEORDER)
            // console.log(Date(item.TIMEORDER))

            let d = new Intl.DateTimeFormat('en', { day: 'numeric' }).format(s)

            const newTimeOrder =
                item.TIMEORDER === null ? item.TIMEORDER :
                    `${new Intl.DateTimeFormat('en', { day: 'numeric' }).format(item.TIMEORDER)}/${new Intl.DateTimeFormat('en', { month: 'numeric' }).format(item.TIMEORDER)}/${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(item.TIMEORDER)}`;


            const newTimeConfirm =
                item.TIMECONFIRM === null ? item.TIMECONFIRM
                    : `${new Intl.DateTimeFormat('en', { day: 'numeric' }).format(item.TIMECONFIRM)}/${new Intl.DateTimeFormat('en', { month: 'numeric' }).format(item.TIMECONFIRM)}/${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(item.TIMECONFIRM)}`;


            const newTimeReceived =
                //Date.parse(item.TIMERECEIVED) === NaN ? item.TIMERECEIVED
                `${new Intl.DateTimeFormat('en', { day: 'numeric' }).format(item.TIMERECEIVED)}/${new Intl.DateTimeFormat('en', { month: 'numeric' }).format(item.TIMERECEIVED)}/${new Intl.DateTimeFormat('en', { year: 'numeric' }).format(item.TIMERECEIVED)}`;


            return {
                ...item,
                TIMEORDER: newTimeOrder,
                TIMECONFIRM: newTimeConfirm,
                TIMERECEIVED: newTimeReceived
            }
        });

        res.send(data);
    })


}

exports.receiptDelete = (req, res) => {
    const { receiptCode } = req.params;
    const condition = {
        columnName: 'RECEIPTCODE',
        value: receiptCode,
        sqlType: Char
    }

    deleteSql('RECEIPT', condition).then((result) => {

        res.send(result);

    })

}
exports.receiptPut = (req, res) => {
    const data = req.body;
    console.log(data)
    const receiptCode = {
        sqlType: sql.Char,
        value: data.receiptCode,
        columnName: 'RECEIPTCODE'
    };
    const date = new Date(data.date)
    const dateNew = {
        sqlType: sql.Date,

        value: `${Intl.DateTimeFormat('en', {
            year: 'numeric'
        }).format(date)}-${Intl.DateTimeFormat('en', {
            month: 'numeric'
        }).format(date)}-${Intl.DateTimeFormat('en', {
            day: 'numeric'
        }).format(date)}`,
        columnName: (data.action) === 'CONFIRMED' ? 'TIMECONFIRM' :
            (data.action) === 'RECEIVED' ? 'TIMERECEIVED' : ''
    };
    const status = {
        sqlType: sql.Char,
        value: (data.action) === 'CONFIRMED' ? 'COMFIRMED' :
            (data.action) === 'RECEIVED' ? 'RECEIVED' : '',
        columnName: 'STATUS'

    }
    const condition = [receiptCode];
    const dataPut = [
        dateNew, status
    ]
    update('RECEIPT', dataPut, condition)
    res.send(data)
}