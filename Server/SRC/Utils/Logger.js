const Log4js = require('log4js')

Log4js.configure({
    appenders: {
        myLoggerConsole: {type: 'console'},
        myLoggerFile: {type: 'file', filename: 'C:/Users/pc/Documents/Digital/ProgramasCursos/Coderhouse/Backend/ProyectoFinal/Logs/warn.log'},
        myLoggerFile2: {type: 'file', filename: 'C:/Users/pc/Documents/Digital/ProgramasCursos/Coderhouse/Backend/ProyectoFinal/Logs/error.log'}
    },
    categories: {
        default: {appenders: ['myLoggerConsole'], level: 'trace'},
        all: {appenders: ['myLoggerConsole', 'myLoggerFile', 'myLoggerFile2'], level: 'trace'},
        info: {appenders: ['myLoggerConsole'], level: 'info'},
        warn: {appenders: ['myLoggerFile'], level: 'warn'},
        error: {appenders: ['myLoggerFile2'], level: 'error'}
    }
})

const LoggerInfo = Log4js.getLogger('info')
const LoggerWarn = Log4js.getLogger('warn')
const LoggerError = Log4js.getLogger('error')

const Logger = { LoggerInfo, LoggerWarn, LoggerError }

module.exports = {Logger}