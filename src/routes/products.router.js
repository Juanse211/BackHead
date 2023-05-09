import { Router } from 'express';
import ProductManager from '../managers/productManager.js';

const router = Router();

const productManager = new ProductManager('../Backhead/src/files/products.json');

router.get('/', async(req, res) => {
    //llamar al metodo getProducts
    const products = await productManager.getProducts()
    res.send({ products })
});

router.get('/:id', async(req, res) => {//buscar por id un producto
    const id = parseInt(req.params.id)
    const product = await productManager.getProductById(id)//llamar al metodo getProductById pasando como parametro id
    res.send({product})
});

router.post('/', async(req, res) => {
    const product = req.body;//ingreso producto por body
    if (!product.estado){//pongo el estado en true validando
        product.estado = true
    }
    if(!product.title || !product.description || !product.code || !product.price || !product.stock){
        return res.status(400).send({error:'incomplete values'})//validacion de campos vacios
    }
    //llamar al metodo addProduct    
    const result = await productManager.addProduct(product)

    res.send({ status: 'success', result })//si salio todo ok lo guardo y muestro
});

router.put('/:id',async(req,res) =>{
    const id = Number(req.params.id)
    const product = req.body;
    const result = await productManager.updateProduct(id, product) 
    res.send({status: 'success', result})
})

router.delete('/:id',async(req,res)=>{
    const id = Number(req.params.id)
    const result = await productManager.deleteProduct(id)

    res.send({status: 'success'})
})


export default router;