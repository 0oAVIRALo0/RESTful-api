const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")

const Order = require("../models/order")
const Product = require("../models/product")

router.get("/", (req, res, next) => {
    Order.find().select("product quantity _id").exec().then(docs => {
        const response = {
            count: docs.length, 
            orders: docs.map((doc) => {
                return {
                    id: doc._id,
                    product: doc.product,
                    quantity: doc.quantity 
                }
            })
        }
        res.status(200).json(response)
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.post("/", (req, res, next) => {
    Product.findById(req.body.productId)
    .then(product => {
        if (!product) {
            res.status(404).json({
                message: "Product not found "
            })
        }
        const order = new Order({
            _id: mongoose.Types.ObjectId(),
            product: req.body.productId,
            quantity: req.body.quantity
        })
        return order.save()
    })
    .then(result => {
        console.log(result)
        res.status(201).json({
            message: "Order created",
            createdOrder: {
                id: result._id,
                product: result.product,
                quantity: result.quantity
            }            
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

router.get("/:orderId", (req, res, next) => {
    const id = req.params.orderId
    Order.findById(id).exec().then(order => {
        if (!order) {
            return res.status(404).json({
                message: "Order not found"
            })
        }
        console.log(order)
        res.status(200).json({
            Order: order
        })
    }).catch(err => {
        console.log(err) 
        error: err
    })
})



router.delete("/:orderId", (req, res, next) => {
    const id = req.params.orderId
    Order.remove({_id: id}).exec().then(result => {
        res.status(200).json({
            message: "Order deleted"
        })
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router