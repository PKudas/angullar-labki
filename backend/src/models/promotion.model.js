let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/zpw', {
    useNewUrlParser: true
})

let PromotionSchema = new mongoose.Schema({
    _id: String,
    newPrice: Number,
    oldPrice: Number,
    length: Number,
})
module.exports = mongoose.model('Promotion', PromotionSchema)