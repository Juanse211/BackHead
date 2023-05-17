import { Router } from "express";  

import ProductManager from '../managers/productManager.js';

const router = Router()
const productManager = new ProductManager('../Backhead/src/files/products.json');


router.get('/', async (req, res) => { 
    const products = await productManager.getProducts()
    res.render('realTimeProducts', { products });
});

export default router;