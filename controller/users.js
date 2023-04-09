const { response } = require("express");
const { VarChar, Char, Int } = require("mssql");
const sql = require("mssql");
const createNewIndex = require("../commons/createNewIndex");
const deleteSql = require("../commons/delete");
const insert = require("../commons/insert");
const removeSpace = require("../commons/removeSpace");
const select = require("../commons/select");
const update = require("../commons/update");

//++++++++++++++++++++++++++++++++++++++GET REQUEST+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.userGet = (req, res) => {
  try {
    const query = "SELECT * FROM ACCOUNT";
    const { userName, password } = req.params;

    if (Object.keys(req.params).length === 0) {
      res.send({});
    } else {
      select(query).then((result) => {
        const newData = removeSpace(result);
        const response = {
          error: [],
          data: {},
          cookie: "",
        };
        const checkUser =
          newData.find((element) => element.NAMELOGIN === userName) != undefined
            ? true
            : false;
        const checkPassword =
          newData.find((element) => element.PASSWORD === password) != undefined
            ? true
            : false;
        console.log(checkPassword, checkUser);
        if (checkUser) {
          const data = newData.find(
            (element) => element.NAMELOGIN === userName
          );
          data.PASSWORD.toString() != password
            ? response.error.push("ERRORPASSWORD")
            : (response.cookie = `NAMELOGIN=${data.NAMELOGIN}+PASSWORD=${data.PASSWORD}+ACCOUNTCODE=${data.ACCOUNTCODE}+EMAIL=${data.EMAIL}+ADDRESS=${data.ADDRESS}+PHONE=${data.PHONE}+PERMISSION=${data.PERMISSION}`);
          response.data = data;
        } else {
          response.error.push("ERRUSER");
        }
        res.status(200);

        res.send(response);
      });
    }
  } catch (error) {
    res.status(404);
  }
};

exports.userGetAll = (req, res) => {
  try {
    const query = "SELECT * FROM ACCOUNT";

    select(query).then((result) => {
      const newData = removeSpace(result);

      res.send(newData);
    });
  } catch (error) {
    res.status(404);
  }
};

//++++++++++++++++++++++++++++++++++++++POST REQUEST+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.userPost = (req, res) => {
  try {
    const query = "SELECT * FROM ACCOUNT";
    const body = req.body;
    // console.log(req.body)
    const { nameLogin, email, password, phone } = req.body;
    select(query).then((result) => {
      const newNameLogin = {
        value: nameLogin,
        sqlType: Char,
        columnName: "NAMELOGIN",
      };
      const newEmail = {
        value: email,
        sqlType: Char,
        columnName: "EMAIL",
      };
      const newPassword = {
        value: password,
        sqlType: Char,
        columnName: "PASSWORD",
      };
      const newPhone = {
        value: phone,
        sqlType: Char,
        columnName: "PHONE",
      };
      const newPermission = {
        value: "USER",
        sqlType: Char,
        columnName: "PERMISSION",
      };
      const newCode = {
        value: createNewIndex(result, "ACCOUNTCODE"),
        sqlType: Char,
        columnName: "ACCOUNTCODE",
      };
      const newData = [
        newNameLogin,
        newEmail,
        newPassword,
        newPermission,
        newPhone,
        newCode,
      ];
      insert("ACCOUNT", newData);
      // console.log(newData)
    });

    // select(query).then((re) => {
    //     res.send(re)
    // })
  } catch (error) {
    res.sendStatus(404);
  }
};

//++++++++++++++++++++++++++++++++++++++PUT REQUEST+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
exports.userPut = (req, res) => {
  const data = req.body;
  const { email, phone, address, accountCode } = data;

  const dataUpdate = [
    {
      columnName: "EMAIL",
      value: email,
      sqlType: Char,
    },
    {
      columnName: "PHONE",
      value: phone,
      sqlType: Char,
    },
    {
      columnName: "ADDRESS",
      value: address,
      sqlType: Char,
    },
  ];
  const dataCondition = [
    {
      columnName: "ACCOUNTCODE",
      value: accountCode,
      sqlType: Char,
    },
  ];
  update("ACCOUNT", dataUpdate, dataCondition);
  console.log(data);
  res.send(data);
};
exports.userDelete = (req, res) => {
  const { userCode } = req.params;
  console.log(userCode);
  const condition = {
    sqlType: sql.Char,
    value: userCode,
    columnName: "ACCOUNTCODE",
  };
  deleteSql("ACCOUNT", condition);
};
