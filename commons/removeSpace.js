

const removeSpace = (arrData) => {

    let newArrData = arrData.map((data) => {
        // const key = Object.keys(data);
        const newData = {};
        for (const key in data) {
            (typeof data[key] === 'string') ? newData[key] = data[key].trim() : newData[key] = data[key];

        }
        return newData

    })
    return newArrData
}

module.exports = removeSpace