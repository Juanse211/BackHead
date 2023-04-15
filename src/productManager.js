import fs from 'fs';

export default class ProductManager {
  constructor() {
    this.path = "./products.json"
    this.products = []
  } static id = 0
  addProduct = async (title, description, price, thumbnail, code, stock) => {
    ProductManager.id++

    let newProduct = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
      id: ProductManager.id
    }
    this.products.push(newProduct)
    await fs.promises.writeFile(this.path, JSON.stringify(this.products))
  }

  readProducts = async () => {
    let firstresponse = await fs.promises.readFile(this.path, "utf-8")
    return JSON.parse(firstresponse)
  }

  getProducts = async () => {
    let secondresponse = await this.readProducts()
    return console.log(secondresponse)
  }

  getProductsById = async (id) => {
    let thirdresponse = await this.readProducts()
    let filter = thirdresponse.find(product => product.id === id)
    console.log(filter)
  }

  deleteProductsById = async (id) => {
    let thirdresponse = await this.readProducts()
    let productFilter = thirdresponse.filter(products => products.id != id)
    await fs.promises.writeFile(this.path, JSON.stringify(productFilter))
  }

  updateProducts = async ({ id, ...producto }) => {
    let oldProduct = await this.readProducts()
    let modifiedProducts = [
      { ...producto, id }, ...oldProduct
    ]
    await fs.promises.writeFile(this.path, JSON.stringify(modifiedProducts))
  }
}