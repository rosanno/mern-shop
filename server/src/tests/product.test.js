import supertest from "supertest";
import express from "express";

const app = express();

describe("product", () => {
  describe("get product route", () => {
    describe("given the product does not exist", () => {
      it("should return a 404", async () => {
        const productId = "product-123";
        await supertest(app).get(`api/v1/product/${productId}`).expect(404);
      });
    });
  });
});
