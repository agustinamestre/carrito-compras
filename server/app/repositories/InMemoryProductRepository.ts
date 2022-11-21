import Product, { Status } from "../models/Product";
import ProductRepository from "./ProductRepository";

export default class InMemoryProductRepository implements ProductRepository {
    private readonly products = [
        new Product(0, "tv", "led 4k 50''", Status.Enabled, 10, 100000,  new Date(), new Date()),
        new Product(1, "plancha", "A vapor", Status.Enabled, 10, 5000,  new Date(), new Date()),
    ];

    getProducts(): Promise<Product[]> {
        return Promise.resolve(this.products);
    }

    getProductById(id : number): Promise<Product> {
        const index = this.products.findIndex(product => product.id === id);
        return Promise.resolve(this.products[index]);
    }

    createProduct(product: Product): Promise<Product> {
    const id = Math.floor(Math.random() * 101);
    const newProduct = new Product(id, product.name, product.description, product.status, product.stock, product.unit_price);
    this.products.push(newProduct);
    return Promise.resolve(newProduct);
    }

    deleteProduct(id: number): Promise<void> {
        const index = this.products.findIndex(product => product.id === id);

        if(index === -1){
            throw new Error(`Id ${id} not found`);
        }
          
        this.products.splice(index, 1);
        return Promise.resolve();
    }

    updateProduct(id: number, status: Status, stock: number, unit_price: number): Promise<Product> {
        const index = this.products.findIndex(product => product.id === id);

        if(index === -1){
            throw new Error(`Id ${id} not found`);
        }
      
        this.products[index].status = status;
        this.products[index].stock = stock;
        this.products[index].unit_price = unit_price;

        return Promise.resolve(this.products[index]);
    }
}