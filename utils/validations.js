const moment = require('moment-timezone');
const {dateFormat} = require('./formatData');

const validateDate = (dateStr, required) => {
    if (required && !dateStr) {
        throw 'Missing Parameter';
    }
    const date = moment(dateStr, dateFormat, true); 

    if (!date.isValid()) {
        throw 'Invalid Date';
    }
};

const validateNumber = (num, required) => {
    if (required && !num) {
        throw 'Missing Parameter';
    }

    if (Number.isNaN(Number(num))) {
        throw 'Invalid Number'
    }
};

const validateNumberArr = (numArr, required) => {
    if (required && !(num && num.lenth > 0)) {
        throw 'Missing Parameter';
    }
    
    numArr.forEach(num => {
        validateNumber(num);
    });
};

module.exports = {
    validateDate,
    validateNumber,
    validateNumberArr
};
