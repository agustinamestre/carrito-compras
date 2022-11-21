import Product, { Status } from "../models/Product";
import ProductRepository from "../repositories/ProductRepository";

export default class ProductService {
    constructor(private readonly productRepository: ProductRepository) {}

    async getProducts() {
        return await this.productRepository.getProducts();
    }

    async getProductById(id: number) {
       return await this.productRepository.getProductById(id);
    }

    async createProduct(name: string, description: string, status: Status, stock: number, unit_price: number) {
        const newProduct = new Product(null, name, description, status, stock, unit_price);
        return await this.productRepository.createProduct(newProduct);
    }

   async deleteProduct(id: number){
    await this.productRepository.deleteProduct(id);
   }

   async updateProduct(id: number, status: Status, stock: number, unit_price: number){
    return await this.productRepository.updateProduct(id, status, stock, unit_price);
   }
}