import { Router } from 'express';
import CartManager from '../managers/cartManager.js'
import ProductManager from '../managers/productManager.js';

const router = Router();

const cartManager = new CartManager('../Backhead/src/files/carts.json')
const productManager = new ProductManager('../Backhead/src/files/products.json');


router.post('/', async (req, res) => {
   const cart = req.body;
  //llamar al metodo addProduct    
  /*
  const cart = {
    products: []
  }
  */
  const result = await cartManager.addCart(cart)

  res.send({ status: 'success', result })//si salio todo ok lo guardo y muestro
})

router.get('/:id', async (req, res) => {
  const cardId = Number(req.params.id)
  const cart = await cartManager.getCartById(cardId)
  if (!cart) {
    return res.status(404).send({error: 'cart not found'})
  }
  res.send({status: 'success', cart})
})

router.post('/:cid/product/:pid', async(req, res) => {
  // Primero Valido que exista el carrito 
  const cartId = Number(req.params.cid);
  // OBTENGO el carrito QUE HAY EN EL ARCHIVO
  const cart = await cartManager.getCartById(cartId);
  //Valido el resultado de la búsqueda
  if (cart === -1){
      const response = { status: "Error", data: `El carrito con ID ${cartId} NO existe!` };
      return res.status(404).json(response);
  };
  // Segundo Valido que exista el producto
  const productId = Number(req.params.pid);
  // OBTENGO el carrito QUE HAY EN EL ARCHIVO
  const product = await productManager.getProductById(productId);
  if (product === -1){
      const response = { status: "Error", data: `El Producto con ID ${productId} NO existe!` };
      return res.status(404).json(response);
  };

  // Una vez validado llamar al metodo addProductInCart
  const result = await cartManager.addProductInCart(cart.id, product.id);

  res.send({ status: 'success', result: 'Se agrego correctamente el producto al carrito' })
});

export default router; 