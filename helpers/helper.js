
const moment = require("moment");


const getRandomInt = async(length) => {
    var result = '';
    var characters = '123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const getRandomIntChar = async(length) => {
    var result = '';
    var characters = '123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const currentdate = async(formate) => {
    let nowtime = moment();
    var result = nowtime.format(formate);
    return result;
}





module.exports = {
    getRandomInt,
    getRandomIntChar,
    currentdate
}