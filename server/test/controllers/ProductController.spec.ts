import { mockRequest, mockResponse } from "mock-req-res";
import sinon, { stubInterface } from "ts-sinon";
import ProductController from "../../app/controllers/ProductController";
import Product, { Status } from "../../app/models/Product";
import ProductService from "../../app/services/ProductService";

describe("ProductController", () => {
  let now: sinon.SinonFakeTimers;
  const productServiceStub = stubInterface<ProductService>();
  const productController = new ProductController(productServiceStub);

  beforeEach(() => {
    now = sinon.useFakeTimers(new Date("2010-06-20").getTime());
  });

  afterEach(() => {
    now.restore();
  });

  it("should get all products", async () => {
    const getProductStub = productServiceStub.getProducts.resolves([
      new Product("pdr-jhbcy6539f", "tv", "led 4k 50''", Status.Enabled, 10, 100000),
      new Product("pdr-flpw264bhy", "plancha", "A vapor", Status.Enabled, 10, 5000),
    ]);

    const expectedProducts = [
      new Product("pdr-jhbcy6539f", "tv", "led 4k 50''", Status.Enabled, 10, 100000),
      new Product("pdr-flpw264bhy", "plancha", "A vapor", Status.Enabled, 10, 5000),
    ];

    const response = mockResponse();
    const request = mockRequest();

    await productController.getProducts(request, response);

    sinon.assert.calledOnceWithExactly(getProductStub);
    sinon.assert.calledOnceWithExactly(response.send, expectedProducts);
  });
});
