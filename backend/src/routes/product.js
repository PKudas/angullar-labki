let ProductModel = require('../models/product.model')
let express = require('express')
let router = express.Router()

router.get('/products', (req, res) => {
    if (req.query.category) {
        //jesli jest wiecej niz jedna kategoria
        if (Array.isArray(req.query.category)) {
            //jesli jest query na name
            if (req.query.name) {
                const regexp = '.*' + req.query.name.toLowerCase() + '.*'
                ProductModel.paginate({
                    category: { $in: req.query.category },
                    name: { $regex: regexp, $options: 'i' }
                }, { page: req.query.page ? req.query.page : 1, limit: 6})
                    .then(doc => {
                        res.json(doc)
                    })
            } else {
                ProductModel.paginate({
                    category: { $in: req.query.category }
                }, { page: req.query.page ? req.query.page : 1, limit: 6})
                    .then(doc => {
                        res.json(doc)
                    })
            }
        } else {
            //jesli jest query na name
            if (req.query.name) {
                const regexp = '.*' + req.query.name.toLowerCase() + '.*'
                ProductModel.paginate({
                    category: req.query.category,
                    name: { $regex: regexp, $options: 'i' }
                }, { page: req.query.page ? req.query.page : 1, limit: 6})
                    .then(doc => {
                        res.json(doc)
                    })
            } else {
                ProductModel.paginate({
                    category: req.query.category
                }, { page: req.query.page ? req.query.page : 1, limit: 6})
                    .then(doc => {
                        res.json(doc)
                    })
            }
        }
    } else if (req.query.name) {
        const regexp = '.*' + req.query.name.toLowerCase() + '.*'
        ProductModel.paginate({
            name: { $regex: regexp, $options: 'i' }
        }, { page: req.query.page ? req.query.page : 1, limit: 6})
            .then(doc => {
                res.json(doc)
            })
    } else {
        ProductModel.paginate({}, { page: req.query.page ? req.query.page : 1, limit: 6})
            .then(doc => {
                res.json(doc)
            })
    }
})

router.delete('/products/:id', (req, res) => {
    ProductModel.findByIdAndDelete(req.params.id)
        .then(doc => {
            res.json(doc)
        })
})

router.put('/products/:id', (req, res) => {
    ProductModel.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.patch('/products/:id', (req, res) => {
    ProductModel.findByIdAndUpdate(req.params.id, { $set: req.body }, {
        new: true
    })
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.get('/products/:id', (req, res) => {
    ProductModel.findById(req.params.id)
        .then(doc => {
            res.json(doc)
        })
        .catch(err => {
            res.status(500).json(doc)
        })
})

router.post('/products', (req, res) => {
    if (!req.body) {
        return res.status(400).send('Request body is missing')
    }

    let model = new ProductModel(req.body)
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