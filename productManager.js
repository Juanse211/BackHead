const fs = require('fs')

class ProductManager {
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
    await this.deleteProductsById(id)
    let oldProduct = await this.readProducts()
    let modifiedProducts = [
      { ...producto, id }, ...oldProduct
    ]
    await fs.promises.writeFile(this.path, JSON.stringify(modifiedProducts))
  }
}

const productos = new ProductManager

productos.addProduct("RESIDENTAL NEMESIS", "Radiohead, Fineart", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/e196da0e-c6a3-4054-b5d6-749425e291a0_2048x2048.jpg?v=1637169137", "d3f5", 99)
productos.addProduct("THIS MIGHT BE A COVER", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0600/7422/9937/products/50c6448f-feda-4f57-b9ad-12e6435cc43a_7db3b569-59c2-4431-922c-4c90abe98fd6_grande.jpg?v=1637167665", "f6g5", 99)
productos.addProduct("EARTHQUAKE", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0599/8192/2500/products/148a5ea7-2dfe-4dfd-ad3b-b8e1bd9d01db_2048x2048.jpg?v=1637166465", "s6d5", 99)
productos.addProduct("WIREFRAME+AUSTRIA3", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0599/8192/2500/products/b636a4c6-bb20-4322-8ee7-9c9afe262a81_d45c384c-5565-4125-bdd7-dadbb4c21c22_2048x2048.jpg?v=1637165745", "q2q2", 99)
productos.addProduct("ICE AGE COMING", "Radiohead, Fineart.", 38, "https://ih1.redbubble.net/image.4715506662.4635/pp,504x498-pad,600x600,f8f8f8.jpg", "q12w", 99)
productos.addProduct("GET OUT BEFORE SATURDAY", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/df411f40-5b37-4834-8497-7f4be9877fc5_2048x2048.jpg?v=1637170377", "w12q", 99)
productos.addProduct("HOTELS AND A GLACIER", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/4cdddcb9-9056-4836-b375-1fb39c1df038_2048x2048.jpg?v=1637170363", "w85q", 99)
productos.addProduct("TARGET 80S LANDSCAPE", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/2c6904ee-1299-4ef3-aece-f8390e4d8835_2048x2048.jpg?v=1637169071", "8q78", 99)
productos.addProduct("COCAINE DISKO ALL YOU LIKE", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/5e64ea5d-42e1-448a-ad8b-99d2638f40ab_235f1f38-49b9-4483-8620-91485c0cf9e6_2048x2048.jpg?v=1637224745", "15ew", 99)
productos.addProduct("ICE AGE COMING ICE AGE COMING", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/01b6ddbb-3d13-4aaa-a9dc-f9323280f811_grande.jpg?v=1637170458", "v85h", 99)
productos.addProduct("27 WOODEN WOODS", "Radiohead, Fineart.", 38, "https://cdn.shopify.com/s/files/1/0597/5044/9307/products/dcca89b3-2ca4-4eee-89f8-6ef911a76d52_2048x2048.jpg?v=1637169953", "v85h", 99)

productos.updateProducts({
  title: "WIREFRAME+AUSTRIA3",
  description: "Radiohead, Fineart.",
  price: 38,
  thumbnail: "https://cdn.shopify.com/s/files/1/0599/8192/2500/products/b636a4c6-bb20-4322-8ee7-9c9afe262a81_d45c384c-5565-4125-bdd7-dadbb4c21c22_2048x2048.jpg?v=1637165745",
  code: "6as5",
  stock: 18,
  id: 4
})