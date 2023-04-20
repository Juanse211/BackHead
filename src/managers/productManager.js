import fs from 'fs';

export default class ProductManager {
    constructor(path) {
        this.path = path;
    }
    getProducts = async () => {
        try {
            if (fs.existsSync(this.path)) {
                const data = await fs.promises.readFile(this.path, 'utf-8');
                const products = JSON.parse(data);
                return products;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);
        }
    }

    addProduct = async (product) => {
        try {
            const products = await this.getProducts();

            if (products.length === 0) {
                product.id = 1;
            } else {
                product.id = products[products.length - 1].id + 1;
            }
            products.push(product);

            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return products;

        } catch (error) {
            console.log(error);
        }
    }

    getProductById = async (id) => {
        try {
            const products = await this.getProducts();
            const product = products.find(product => product.id === id);
            if (!product) {
                console.log("No se encontro el producto");
            }
            return product;
        }

        catch (error) {
            console.log(error);
        }
    }

    updateProduct = async (id, field, value) => {
        try {
            const products = await this.getProducts();
            if (field === "id") {
                return console.log("error no se puede modificar el id");
            }
            const updatedProduct = products.map(prod =>
                prod.id === id ? { ...prod, [field]: value, } : prod
            );
            await fs.promises.writeFile(this.path, JSON.stringify(updatedProduct, null, '\t'));
            return updatedProduct

        }
        catch (error) {
            console.log(error);
        }
    }


    deleteProduct = async (id) => {
        try {
            let products = await this.getProducts();
            const product = products.find(product => product.id === id);

            if (!product) {
                console.log("No se encontro el producto");
            }
            products = products.filter(product => product.id !== id);
            await fs.promises.writeFile(this.path, JSON.stringify(products, null, '\t'));
            return products;

        }
        catch (error) {
            console.log(error);
        }
    }
}