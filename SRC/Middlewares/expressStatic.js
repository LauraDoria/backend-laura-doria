import Config from '../Config/config'
import express from 'express'
import Path from 'path'

const ExpressStatic = app.use(express.static(Path.join(__dirname, Config.Env.STATIC)))

export default ExpressStatic