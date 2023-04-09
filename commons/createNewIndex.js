const removeSpace = require("./removeSpace")
const select = require("./select")

const createNewIndex = (data, keyCode, index = 0) => {
   
    const newData = removeSpace(data);
    const keyStart = newData[0][keyCode].slice(0, 2)
    let keys = newData.map((item) => {
        const key = item[keyCode];
        let keyIndex = key.slice(2);
        keyIndex = parseInt(keyIndex);

        return keyIndex
    })

    let maxKey = Math.max(...keys);

    var nextKey = `${++maxKey + index}`;

    var number = nextKey.length;
    var newNextKey = '';
    let count = 0;

    while (count < (3 - number)) {

        newNextKey += '0';
        count++;
    }
    newNextKey += nextKey
    console.log(newNextKey)
    // return "IG01"
    return `${keyStart + newNextKey}`
}
module.exports = createNewIndex