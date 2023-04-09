exports.userPost = (req, res) => {
    try {
        const query = 'SELECT * FROM ACCOUNT';
        const body = req.body;
        // console.log(req.body)
        const { nameLogin, email, password, phone } = req.body;
        select(query).then((result) => {
            const newNameLogin = {
                value: nameLogin,
                typeSql: Char(100),
                keySql: 'NAMELOGIN'
            };
            const newEmail = {
                value: email,
                typeSql: Char(100),
                keySql: 'EMAIL'
            };
            const newPassword = {
                value: password,
                typeSql: Char(100),
                keySql: 'PASSWORD'
            };
            const newPhone = {
                value: phone,
                typeSql: Char(15),
                keySql: 'PHONE'
            }
            const newPermission = {

                value: 'USER',
                typeSql: Char(10),
                keySql: 'PERMISSION'
            }
            const newCode = {
                value: createNewIndex(result, 'ACCOUNTCODE'),
                typeSql: Char(10),
                keySql: 'ACCOUNTCODE'
            }
            const newData = [
                newNameLogin
                , newEmail,
                newPassword,
                newPermission,
                newPhone, newCode
            ]
            insert(query, 'ACCOUNT', newData);
            // console.log(newData)
        })


        // select(query).then((re) => {
        //     res.send(re)
        // })

    } catch (error) {
        res.sendStatus(404)
    }


}