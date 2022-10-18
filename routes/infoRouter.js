const { Router } = require('express')

const infoRouter = Router()

//Rutas
infoRouter.get('/info', (req, res) => {
    res.render('info', {
         arg: process.argv.slice(2),
         os: process.platform,
         nodeVersion: process.version,
         rss: process.memoryUsage.rss(),
         pathExec: process.execPath,
         processId: process.pid,
         rootDir: process.cwd(),
         processors: require('os').cpus().length
    })
})

export default infoRouter