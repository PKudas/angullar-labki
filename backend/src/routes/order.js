let OrderModel = require('../models/order.model')
let express = require('express')
let router = express.Router()

router.get('/orders', (req, res) => {
    OrderModel.find({}).sort({status: -1})
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(doc)
        })
})

router.patch('/orders/:id', (req, res) => {
    OrderModel.findByIdAndUpdate(req.params.id, { $set: req.body }, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/orders/:id', (req, res) => {
    OrderModel.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(doc)
        })
})

router.post('/orders', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    let model = new OrderModel(req.body)
    model.save()
        .then(doc => {
            if (!doc || doc.length === 0) {
                return res.status(500).send(doc)
            }

            res.status(201).send(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})
module.exports = router