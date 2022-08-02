const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const connectDB = require('./server/database/connection')
const { addAbortSignal } = require('stream')

const app = express()

//linking to the config file and specifying path of PORT variable
dotenv.config({path: 'config.env'})
const PORT = process.env.PORT || 3000

//logging all requests made to server on the terminal
app.use(morgan('tiny'))

//parse body requests
app.use(express.json())

//handles form input by allowing server to understand how to take params from url and turn them into request body
app.use(express.urlencoded())

//set view engine
app.set('view engine', 'ejs')

//conect to Mongo DB
connectDB()

//define location of client side assets for quicker reference
app.use('/css', express.static(path.resolve(__dirname, "assets/css")))
app.use('/img', express.static(path.resolve(__dirname, "assets/img")))
app.use('/js', express.static(path.resolve(__dirname, "assets/js")))

//load routers
app.use('/', require('./server/routes/router'))

app.listen(PORT, () => {
    //console.log(`server is running on http://localhost:${PORT}`)
})