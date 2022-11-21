import * as express from "express";
import ProductService from "../services/ProductService";
import IController from "./IControler";

export default class ProductController implements IController {
  public readonly path = "/products";
  public readonly router = express.Router();

  constructor(private productService: ProductService) {
    this.router.get("", this.getProducts);
    this.router.get("/:id", this.getProductById);
    this.router.post("", this.createProduct);
    this.router.delete("/:id", this.deleteProduct);
    this.router.put("/:id", this.updateProduct);
  }

  getProducts = async (request: express.Request, response: express.Response) => {
    response.send(await this.productService.getProducts());
  };

  getProductById = async (request: express.Request, response: express.Response) => {
    const id = +request.params.id;

    try {
      const product = await this.productService.getProductById(id);
      response.send(product);
    } catch (err: any) {
      response.status(404).json({ message: err.message });
    }
  };

  createProduct = async (request: express.Request, response: express.Response) => {
    const {name, description, status, stock, unit_price} = request.body;
    response.send( await this.productService.createProduct(name, description, status, stock, unit_price));
  };

  deleteProduct = async (request: express.Request, response: express.Response) => {
    const id = +request.params.id;

    try {
      const product = await this.productService.deleteProduct(id);
      response.send(product);
    } catch (err: any) {
      response.status(404).json({ message: err.message });
    }
  };

  updateProduct =  async (request: express.Request, response: express.Response) => {
    const id = +request.params.id;
    const {status, stock, unit_price } = request.body;

    try {
      const product = await this.productService.updateProduct(id, status, stock, unit_price);
      response.send(product);
    } catch (err: any) {
      response.status(404).json({ message: err.message });
    }
  };
  }
