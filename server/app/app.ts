import express from "express";
import cors from "cors";
import ProductController from "./controllers/ProductController";
import ProductService from "./services/ProductService";
import InMemoryProductRepository from "./repositories/InMemoryProductRepository";
const app = express();
app.use(express.json());
app.use(cors());

const controller = new ProductController(
  new ProductService(new InMemoryProductRepository())
);

app.use(controller.path, controller.router);

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
