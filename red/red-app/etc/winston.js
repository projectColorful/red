const winston = require("winston");
const winstonDaily = require("winston-daily-rotate-file");
const moment = require("moment");
const {combine,timestamp,printf,prettyPrint} = winston.format;

const myCustomeLevels ={
    levels:{
        http:0,
        warning:1,
        error:2,
        info:3
    },
    colors:{
        error:'red',
        info:'blue',
        http:'green',
        warning:'yellow'
    }
};
winston.addColors(myCustomeLevels.colors);

const prettyJson = printf(info => {
    if (info.message?.constructor === Object) {
      info.message = JSON.stringify(info.message, null, 4)
    }
    return `${moment(info.timestamp).format('YYYY-MM-DD HH:mm:ss')} ${info.level}: ${info.message}`
  })

let log = null;
if (process.env.NODE_ENV !== 'production') { // 테스트서버
    log = winston.createLogger({
      levels: myCustomLevels.levels,
      level: 'info',
      format: combine(
        winston.format.colorize(),  // 색깔 넣어서 출력
        timestamp(),
        prettyJson
      ),
      transports: [
        new winston.transports.Console()
      ],
    });
  }
  module.exports = {log};