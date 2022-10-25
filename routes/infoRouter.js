const { Router } = require('express')

const infoRouter = Router()

const Logger = require('../utils/logger')

//Rutas
infoRouter.get('/info', (req, res) => {
    res.render('info', {
         arg: process.argv.slice(2),
         os: process.platform,
         nodeVersion: process.version,
         rss: process.memoryUsage.rss(),
         pathExec: process.execPath,
         processId: process.pid,
         rootDir: process.cwd()
    })
    Logger.Logger.LoggerInfo.info('GET /info request ' + new Date().toLocaleTimeString())
})

export default infoRouter