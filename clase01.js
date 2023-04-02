class ProductManager {
  #products;
  #numId;
  constructor() {
    this.#products = [];
    this.#numId = 0;
  }

  //El siguiente método permite agregar productos al array vacío de products
  addProducts(title, description, price, thumbnail, code, stock) {

    //La siguiente validación se asegura de que el método contenga todas los parametros
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.warn("Todos los campos son obligatorios");
      return;
    }

    //Se crea un objeto product con los datos pasados por parametros
    const product = {
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock
    };

    //Se busca en products si hay algun producto con el código repetido
    const repetedProduct = this.#products.find((elem) => elem.code === code);

    /*Si no hay ningún producto que contenga el mismo código*/
    if (!repetedProduct) {
      const newProduct = { ...product, id: this.#numId++ } //declaro un nuevo objeto el cual copia el objeto anterior y le agrega el atributo id que se va incrementando
      this.#products.push(newProduct); //pusheo este nuevo objeto a el array vacio de productos
    } else {
      console.log('El producto ya se encuentra agragado');
    }
  }

  //Método que me permite ver los productos almacenados en products
  getProducts() {
    if (this.#products.length === 0) {
      console.log("No hay productos agregados");
    } else {
      return this.#products;
    }
  }

  //Método para buscar un producto por el id en products
  getProductById(id) {
    const productById = this.#products.find((prod) => prod.id === id);

    if (!productById) {
      return "Producto no encontrado.";
    }
    return productById;
  }
}


//Testing class ProductManager

const productManager = new ProductManager();
productManager.addProducts("product1", "descprod1", 100, "img", 1, 2);
productManager.addProducts("product2", "descprod2", 100, "img", 3, 2);
productManager.addProducts("product3", "descprod3", 100, "img", 2, 2);

console.log('productos', productManager.getProducts());
console.log(productManager.getProductById(12));
console.log('producto por id 1: ', productManager.getProductById(1));

//corroborando si no se puede acceder a las variables declaradas como privadas
console.log('test products ', productManager.products);
console.log('test numId ', productManager.numId);