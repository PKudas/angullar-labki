let PromotionModel = require('../models/promotion.model')
let express = require('express')
let router = express.Router()

router.get('/promotions/:id', (req, res) => {
    PromotionModel.findById(req.params.id)
        .then(doc => {
            if (!doc) {
                res.status(404).send('Not Found');
            } else {
                res.json(doc)
            }
        })
        .catch(err => {
            res.status(500).json(doc)
        })
})

module.exports = router