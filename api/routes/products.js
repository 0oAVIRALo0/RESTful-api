const express = require("express")
const router = express.Router()

router.get("/", (req, res, next) => {
    res.status(200).json({
        message: "All the products were fetched"
    })
})

router.post("/", (req, res, next) => {
    res.status(200).json({
        message: "New product added"
    })
})

router.get("/:productId", (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: `Product with product Id: ${id} fetched`,
        productId: id
    })
})

router.patch("/:productId", (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: `Product with product Id: ${id} patched`,
        productId: id
    })
})

router.delete("/:productId", (req, res, next) => {
    const id = req.params.productId
    res.status(200).json({
        message: `Product with product Id: ${id} deleted`,
        productId: id
    })
})

module.exports = router