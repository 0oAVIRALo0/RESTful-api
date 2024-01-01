const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
const mongoose = require("mongoose")

const productRoutes = require("./api/routes/products")
const orderRoutes = require("./api/routes/orders")

const mongoURL = `mongodb+srv://aviral:${process.env.MONGO_ATLAS_PW}@cluster0.w7h8loc.mongodb.net`;

mongoose.connect(mongoURL)

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
    res.header("ACCESS-CONTROL-ALLOW-ORIGIN", "*")
    res.header("ACCESS-CONTROL-ALLOW-HEADERS", "Origin, X-Requested-With, Content-Type, Accept, Authorization")
    if(req.method === "OPTIONS"){
        res.header("ACCESS-CONTROL-ALLOW-METHODS", "PUT, POST, PATCH, DELETE, GET")
        return res.status(200).json({})
    }
    next()
})

app.use("/products", productRoutes)
app.use("/orders", orderRoutes)

app.use((req, res, next) => {
    const error = new Error("Not found");
    error.status = 404
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports  = app 