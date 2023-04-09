const createNewIndex = require("../../commons/createNewIndex");
const insert = require("../../commons/insert");
const removeSpace = require("../../commons/removeSpace");
const select = require("../../commons/select");


exports.userGet = (req, res) => {


    try {
        const query = 'SELECT * FROM ACCOUNT';
        const { userName, password } = req.params;

        console.log(req.params)
        if (Object.keys(req.params).length === 0) {
            res.send({})
        }
        else {
            select(query).then((result) => {

                const newData = removeSpace(result);
                const response = {
                    error: [],
                    data: {},
                    cookie: ''
                }
                const checkUser = newData.find((element) => element.NAMELOGIN === userName) != undefined ? true : false;
                const checkPassword = newData.find((element) => element.PASSWORD === password) != undefined ? true : false;
                console.log(checkPassword, checkUser)
                if (checkUser) {
                    const data = newData.find((element) => element.NAMELOGIN === userName);
                    data.PASSWORD.toString() != password ? response.error.push("ERRORPASSWORD") : response.cookie = `NG=${data.NAMELOGIN}+PW=${data.PASSWORD}+COD=${data.ACCOUNTCODE}+EMAIL=${data.EMAIL}+ADDRESS=${data.ADDRESS}+PHONE=${data.PHONE}+PERSS=${data.PERMISSION}+INGBASE64=${Buffer.from(data.AVATAR).toString('base64')}`; response.data = data
                }
                else {
                    response.error.push("ERRUSER")
                }

                res.send(response)

            })
        }
    } catch (error) {
        res.status(404)
    }

}