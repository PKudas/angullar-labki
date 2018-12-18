let express = require('express')
let cors = require('cors')
let http = require('http')
let socketIo = require('socket.io')
let request = require('request')
let PromotionModel = require('./models/promotion.model')

let app = express()

let productsRoute = require('./routes/product')
let ordersRoute = require('./routes/order')
let promotionsRoute = require('./routes/promotion')

let bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(cors())
app.use((req, res, next) => {
  console.log(`${new Date().toString()} => ${req.originalUrl}`)
  next()
})
app.use(productsRoute)
app.use(ordersRoute)
app.use(promotionsRoute)

const PORT = 3000
const server = http.Server(app);
server.listen(PORT);

const io = socketIo(server);

io.on('connection', function (socket) {
  socket.emit('hello', { hello: 'world' });
  socket.on('promotion', function (data) {
    let model = new PromotionModel(data);
    model.save(data);
    io.emit('receive-promotion', { active: true, ...data });
    request.patch('http://localhost:3000/products/' + data._id, {
      json: {
        price: data.newPrice
      }
    }, (error, res, body) => {
      if (error) {
        console.error(error)
        return
      }
    });
    let timer = data.length * 60000;
    setTimeout(function () {
      PromotionModel.findByIdAndDelete(data._id)
        .then(doc => {
          io.emit('receive-promotion', { active: false, ...data });
          request.patch('http://localhost:3000/products/' + data._id, {
            json: {
              price: data.oldPrice
            }
          }, (error, res, body) => {
            if (error) {
              console.error(error)
              return
            }
          });
        });
    }, timer)
  });
});
