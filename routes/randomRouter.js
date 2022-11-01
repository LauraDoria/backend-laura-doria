const { Router } = require('express')
const {fork} = require('child_process')

const randomRouter = Router()

const Logger = require('../utils/logger')

//Rutas
randomRouter.get('/randoms', (req, res) => {
    const input = req.query
    const randomGenerator = fork('../utils/random.js')
    randomGenerator.send(input)
    randomGenerator.on('message', numbersArray => {
        res.render('randoms', {numbers: numbersArray})
    })
    Logger.Logger.LoggerInfo.info('GET /randoms request ' + new Date().toLocaleTimeString())
})

export default randomRouter