import express from 'express';
import productRouter from './routes/products.router.js'
import cartsRouter from './routes/cart.router.js'

const app = express();
 
//Parámetros de Configuración:
app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api/products',productRouter)
app.use('/api/carts', cartsRouter)

app.listen(8080, () => {console.log('Servidor escuchando en el puerto 8080')})