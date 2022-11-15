const Log4js = require('log4js')

Log4js.configure({
    appenders: {
        myLoggerConsole: {type: 'console'},
        myLoggerFile: {type: 'file', filename: 'warn.log'},
        myLoggerFile2: {type: 'file', filename: 'error.log'}
    },
    categories: {
        all: {appenders: ['myLoggerConsole'], level: 'info'},
        warn: {appenders: ['myLoggerFile'], level: 'warn'},
        error: {appenders: ['myLoggerFile2'], level: 'error'}
    }
})

const LoggerInfo = Log4js.getLogger('all')
const LoggerWarn = Log4js.getLogger('warn')
const LoggerError = Log4js.getLogger('error')

export const Logger = { LoggerInfo, LoggerWarn, LoggerError }