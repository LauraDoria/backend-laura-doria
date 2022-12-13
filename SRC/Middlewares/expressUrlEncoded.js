import express from 'express'

const ExpressUrlEncoded = app.use(express.urlencoded({extended: true}))

export default ExpressUrlEncoded