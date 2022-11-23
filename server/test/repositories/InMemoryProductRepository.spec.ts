import { assert } from "chai";
import sinon from "sinon";
import ProductRepository from "../../app/repositories/ProductRepository";
import InMemoryProductRepository from "../../app/repositories/InMemoryProductRepository";
import Product, { Status } from "../../app/models/Product";

describe("InMemoryProductRepository", () => {
  let inMemoryProductRepository: ProductRepository;
  let now: sinon.SinonFakeTimers;

  beforeEach(() => {
    now = sinon.useFakeTimers(new Date("2010-06-20").getTime());
    inMemoryProductRepository = new InMemoryProductRepository();
  });

  afterEach(() => {
    now.restore();
  });

  it("should get all products", async () => {
    const expectedProducts = [
      new Product("pdr-jhbcy6539f", "tv", "led 4k 50''", Status.Enabled, 10, 100000),
      new Product("pdr-flpw264bhy", "plancha", "A vapor", Status.Enabled, 10, 5000),
    ];

    const products = await inMemoryProductRepository.getProducts();

    assert.deepStrictEqual(products, expectedProducts);
  });
});
