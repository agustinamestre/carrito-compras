import Product, { Status } from "../models/Product";

 interface ProductRepository {
  getProducts(): Promise<Product[]>;
  getProductById(id: number): Promise<Product>;
  createProduct(product: Product): Promise<Product>;
  deleteProduct(id: number): Promise<void>;
  updateProduct(id: number, status: Status, stock: number, unit_price: number): Promise<Product>;
}

export default ProductRepository;
