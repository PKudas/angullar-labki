let mongoose = require('mongoose')
let mongoosePaginate = require('mongoose-paginate')

mongoose.connect('mongodb://localhost:27017/zpw', {
    useNewUrlParser: true
})

let ProductSchema = new mongoose.Schema({
    name: String,
    category: String,
    description: String,
    link: String,
    price: Number,
    quantity: Number
})
ProductSchema.plugin(mongoosePaginate);
module.exports = mongoose.model('Product', ProductSchema)