import ProductManager from '../manager/ProductManager.js';

let managers = new ProductManager('../file/productos.json');

const productManager = async() => {

try {
//Llamamos al Metodo addProduct - agregar un producto
    
   // await managers.addProduct('Coca Cola', 'Bebida gaseosa', 100, 'Imagen', 1, 10);
    //await managers.addProduct('Pepsi', 'Bebida gaseosa', 100, 'Imagen', 2, 10);
    //productos = await managers.getProducts();
    //console.log(productos);
    
    //Llamamos al Metodo getProduct - consultar los productos
    let productos = await managers.getProducts();
    console.log(productos);

    //Llamamos al Metodo getProductById - consultar un producto por id

    //Llamamos al Metodo updateProduct - actualizar un producto por id

    //Llamamos al Metodo deleteProduct - eliminar un producto por id

} catch (error) {
    console.log(error); 
}
}

productManager();