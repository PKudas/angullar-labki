let mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/zpw', {
    useNewUrlParser: true
})

let OrderSchema = new mongoose.Schema({
    address: String,
    name: String,
    price: Number,
    status: Boolean,
    items: Array
})
module.exports = mongoose.model('Order', OrderSchema)