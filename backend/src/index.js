let express = require('express')
let cors = require('cors')
let http = require('http')
let socketIo = require('socket.io')
let PromotionModel = require('./models/promotion.model')

let app = express()

let productsRoute = require('./routes/product')
let ordersRoute = require('./routes/order')

let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
    console.log(`${new Date().toString()} => ${req.originalUrl}`)
    next()
})
app.use(productsRoute)
app.use(ordersRoute)

const PORT = 3000
const server = http.Server(app);
server.listen(PORT);

const io = socketIo(server);

io.on('connection', function (socket) {
    socket.emit('hello', { hello: 'world' });
    socket.on('promotion', function (data) {
      let model = new PromotionModel(data);
      model.save(data);
      io.emit('receive-promotion', data);
    });
  });
  