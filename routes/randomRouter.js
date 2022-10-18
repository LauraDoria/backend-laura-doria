const { Router } = require('express')
const {fork} = require('child_process')

const randomRouter = Router()

//Rutas
randomRouter.get('/randoms', (req, res) => {
    const input = req.query
    const randomGenerator = fork('../utils/random.js')
    randomGenerator.send(input)
    randomGenerator.on('message', numbersArray => {
        res.render('randoms', {numbers: numbersArray})
    })
})

export default randomRouter