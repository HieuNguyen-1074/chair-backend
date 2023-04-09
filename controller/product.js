const deleteSql = require("../commons/delete");
const sql = require('mssql');
const removeSpace = require("../commons/removeSpace");
const select = require("../commons/select");
const createNewIndex = require("../commons/createNewIndex");
const insert = require("../commons/insert");
const update = require("../commons/update");


exports.productGet = (req, res) => {
    const queryInfor = 'SELECT * FROM PRODUCT';
    const queryImage = 'SELECT * FROM PRODUCTIMAGE';



    select(queryInfor).then((result) => {
        
        const dataInfor = removeSpace(result);
        select(queryImage).then((result) => {
            const dataImg = removeSpace(result);
            let data = dataInfor.map((data) => {
                const arrImg = []
                dataImg.forEach(item => {

                    let img = {};

                    const imgBase64 = Buffer.from(item.IMG).toString('base64');
                    img.src = imgBase64;
                    img.id = item.IMGCODE;
                    item.PRODUCTCODE === data.PRODUCTCODE ? arrImg.push(img) : ''

                });
                
                return { ...data, IMGARR: arrImg }
            })
            
            res.send(data)
        })

    })

}
exports.productPut = (req, res) => {
    const data = req.body;
    const { dataInput, dataImg, dataDelete } = data;
    console.log(dataDelete)
    const { newColor, newDiscount, newHeight, newPrice, newProductName, newQuantities, newWidth } = dataInput
    const { idProduct } = req.params;

    const condition = {
        value: idProduct,
        sqlType: sql.Char,
        columnName: 'PRODUCTCODE'
    };
    const name = {
        value: newProductName,
        sqlType: sql.Char,
        columnName: 'PRODUCTNAME'
    };
    const color = {
        value: newColor,
        sqlType: sql.Char,
        columnName: 'COLOR'
    }
    const discount = {
        value: newDiscount,
        sqlType: sql.Int,
        columnName: 'DISCOUNT'
    }
    const height = {
        value: newHeight,
        sqlType: sql.Char,
        columnName: 'HEIGHT'
    };
    const price = {
        value: newPrice,
        sqlType: sql.Money,
        columnName: 'PRICE'
    };
    const quantities = {
        value: newQuantities,
        sqlType: sql.Int,
        columnName: 'QUANTITIES'
    }
    const width = {
        value: newWidth,
        sqlType: sql.Char,
        columnName: 'WIDTH'
    }
    const dataPutInput = [
        name, color, discount, height, price, quantities, width
    ]

    update('PRODUCT', dataPutInput, [condition]).then((result) => {
        
        select('SELECT * FROM PRODUCTIMAGE').then((result) => {
            dataImg.forEach((element, index) => {
              
                const productCode = {
                    value: idProduct,
                    sqlType: sql.Char,
                    columnName: 'PRODUCTCODE'
                };
                const img = {
                    value: new Buffer(element, 'base64'),
                    sqlType: sql.VarBinary,
                    columnName: 'IMG',

                }
                const imgCode = {
                    value: createNewIndex(result, 'IMGCODE', index),
                    sqlType: sql.Char,
                    columnName: 'IMGCODE'
                };
                const dataImgSql = [
                    productCode,
                    imgCode, img
                ]
                
                insert('PRODUCTIMAGE', dataImgSql);
               
               
            })
        })
        dataDelete.forEach((element) => {
            const conditionDelete = {
                value: element,
                sqlType: sql.Char,
                columnName: 'IMGCODE'
            }
           
            deleteSql('PRODUCTIMAGE', conditionDelete);
        })
    })
    // dataImg.forEach((element, index) => {
    //     const productCode = {
    //         value: idProduct,
    //         sqlType: sql.Char,
    //         columnName: 'PRODUCTCODE'
    //     };
    //     const img = {
    //         value: new Buffer(element, 'base64'),
    //         sqlType: sql.VarBinary,
    //         columnName: 'IMG',

    //     }
    //     const imgCode = {
    //         value:
    //             //createNewIndex(result, 'IMGCODE', index) || 
    //             0,
    //         sqlType: sql.Char,
    //         columnName: 'IMGCODE'
    //     };
    //     const dataImgSql = [
    //         productCode,
    //         imgCode, img
    //     ]
    //     console.log(dataImgSql)
    // })

    // update('PRODUCT', dataPutInput, condition)
    // console.log(data)
}
exports.productPost = (req, res) => {
    const data = req.body;
    const query = `select * from PRODUCT`;

    const { dataInput, dataImg } = data;
    
   
    const { newColor,
        newDiscount,
        newHeight,
        newPrice,
        newProductName,
        newQuantities,
        newWidth } = dataInput;


    select(query).then(result => {
        const productCode = {
            value: createNewIndex(result, 'PRODUCTCODE'),
            sqlType: sql.Char,
            columnName: 'PRODUCTCODE'
        }
        const productName = {
            value: newProductName,
            sqlType: sql.Char,
            columnName: 'PRODUCTNAME'
        };
        const color = {
            value: newColor,
            sqlType: sql.Char,
            columnName: 'COLOR'
        };
        const discount = {
            value: newDiscount,
            sqlType: sql.Int,
            columnName: 'DISCOUNT'
        };
        const height = {
            value: newHeight,
            sqlType: sql.Char,
            columnName: 'HEIGHT'
        };
        const price = {
            value: newPrice,
            sqlType: sql.Money,
            columnName: 'PRICE'
        };
        const quantities = {
            value: newQuantities,
            sqlType: sql.Int,
            columnName: 'QUANTITIES',

        };
        const width = {
            value: newWidth,
            sqlType: sql.Char,
            columnName: 'WIDTH'
        }
        // const rate = {
        //     value: 1,
        //     sqlType: sql.Int,
        //     columnName: 'RATE'
        // }
        const dataInputSql = [
            productName, productCode, color, discount, height, price, quantities, width
        ];

       
        insert('PRODUCT', dataInputSql).then((result) => {
            const queryImg = 'SELECT * FROM PRODUCTIMAGE';
            select(queryImg).then((result) => {
                dataImg.forEach((element, index) => {
                    const imgCode = {
                        value: createNewIndex(result, 'IMGCODE', index),
                        sqlType: sql.Char,
                        columnName: 'IMGCODE'
                    };
                    const img = {
                        value: new Buffer(element, 'base64'),
                        sqlType: sql.VarBinary,
                        columnName: 'IMG',

                    }
                 
                    const dataImgSql = [
                        
                        productCode,
                        imgCode, img
                    ]
                    insert('PRODUCTIMAGE', dataImgSql)
                })
            })


        })
    })
    res.send(data)
}
exports.productDelete = (req, res) => {
    const { productCode } = req.params;

    const productSql = {
        sqlType: sql.Char,
        value: productCode,
        columnName: 'PRODUCTCODE'
    }
    const condition = productSql;
    deleteSql('PRODUCT', condition);
    const conditionImg = {
        columnName : 'PRODUCTCODE', 
        sqlType : sql.Char,
         value : productCode
    }
 
    // deleteSql("PRODUCTIMAGE" , conditionImg);
    res.send(productCode)
}
