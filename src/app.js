import express from 'express';
import { Server } from 'socket.io'
import handlebars from 'express-handlebars'
import __dirname from './utils.js';
import viewsRouter from './routes/views.router.js'
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express();

//Parámetros de Configuración:
//Websocket
app.use(express.static(`${__dirname}/public`))
app.engine('handlebars', handlebars.engine())
app.set('views', `${__dirname}/views`)
app.set('view engine', 'handlebars')

//Http
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/products',productRouter)
app.use('/api/carts', cartsRouter)

app.use('/realtimeproducts', viewsRouter)
const server = app.listen(8080, () => { console.log('Servidor escuchando en el puerto 8080') })
const io = new Server(server)

io.on('connection', socket => {
  console.log('nuevo cliente conectado');

  socket.on('message', data => { console.log(data) });
  socket.emit('evento_socket_individual', 'Este mensaje solo debe recibir el socket'); 
  socket.broadcast.emit('evento_todos_menos_actual', 'Lo veran todos menos el actual')
  io.emit('evento_todos', 'Lo recibiran todos los clientes')
})