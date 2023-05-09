import fs from 'fs';

export default class CartManager {
  constructor(path) {
    this.path = path
  }

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, 'utf-8');
        const carts = JSON.parse(data);
        return carts;
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addCart(cart) {
    try {
      const carts = await this.getCarts();
      if (carts.length === 0) {
        cart.id = 1
      } else {
        cart.id = carts[carts.length - 1].id + 1;
      }

      carts.push(cart)
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      return carts;

    } catch (error) {
      console.log(error);
    }
  }

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const cartIndex = carts.findIndex(cart => cart.id === id);

      if (cartIndex === -1) {
        return cartIndex;
      } else {
        return carts[cartIndex];
      }
    } catch (error) {
      console.log("ERROR:", error);
    }
  }

  addProductInCart = async (cartId, productId) => {
    try {
      const carts = await this.getCarts();
      const codeIndex = carts.findIndex(cart => cart.id === cartId);
      
      const isInCart = (id) => {
        return (
          carts[codeIndex].products.some(item => item.product === id)
        )
      }

      if (isInCart(productId)) {
        const productIndex = carts[codeIndex].products.findIndex(prod => prod.product === productId);
        console.log(productIndex);
        carts[codeIndex].products[productIndex].quantity++;
        console.log('esta en el carro');
      } else {
        const newProduct = {
          product: productId,
          quantity: 1
        };
        carts[codeIndex].products.push(newProduct);
        console.log('NO esta en el carro');
      }
      await fs.promises.writeFile(this.path, JSON.stringify(carts, null, '\t'));
      return carts;
    } catch (error) {
      console.log(error);
    }
  }
}