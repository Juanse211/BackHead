import { Router } from 'express';
import CartManager from '../managers/cartManager.js'

const router = Router();

const cartManager = new CartManager('../Backhead/src/files/cart.json')

router.post('/', async (req, res) => {
  const cart = req.body;
  //llamar al metodo addProduct    
  const result = await cartManager.addCart(cart)

  res.send({ status: 'success', result })//si salio todo ok lo guardo y muestro
})

router.get('/:id', async (req, res) => {
  const cardId = Number(req.params.id)
  const cart = await cartManager.getById(cardId)
  if (!cart) {
    return res.status(404).send({error: 'cart not found'})
  }
  res.send({status: 'success', cart})
})

export default router; 