import { assert } from "chai";
import sinon, { stubInterface } from "ts-sinon";
import Product, { Status } from "../../app/models/Product";
import ProductRepository from "../../app/repositories/ProductRepository";
import ProductService from "../../app/services/ProductService";

describe("ProductService", () => {
  let now: sinon.SinonFakeTimers;

  const productRepositoryStub = stubInterface<ProductRepository>();

  const productService = new ProductService(productRepositoryStub);

  beforeEach(() => {
    now = sinon.useFakeTimers(new Date("2010-06-20").getTime());
  });

  afterEach(() => {
    now.restore();
  });

  it("should get all products", async () => {

   const getProductStub = productRepositoryStub.getProducts.resolves([
     new Product("pdr-jhbcy6539f", "tv", "led 4k 50''", Status.Enabled, 10, 100000),
     new Product("pdr-flpw264bhy", "plancha", "A vapor", Status.Enabled, 10, 5000),
    ]);

   const expectedProducts = [
      new Product("pdr-jhbcy6539f", "tv", "led 4k 50''", Status.Enabled, 10, 100000),
      new Product("pdr-flpw264bhy", "plancha", "A vapor", Status.Enabled, 10, 5000),
    ];

    const actualProducts = await productService.getProducts();

    sinon.assert.calledOnceWithExactly(getProductStub);

    assert.deepStrictEqual(actualProducts, expectedProducts);
  });
});
