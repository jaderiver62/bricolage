var moment = require('moment');
module.exports = {
    date_format: date => {
        return ` ${moment(date).format("llll").toString()}`;
    }
}