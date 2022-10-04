import { publicRequest } from "./axios";

const productsApi = {
  getProducts: async () => {
    try {
      const products = await publicRequest(`product/all-product`);
      return products;
    } catch (error) {
      console.log(error);
    }
  },

  getProduct: async (slug) => {
    try {
      const product = await publicRequest(`product/${slug}`);
      return product;
    } catch (error) {
      console.log(error);
    }
  },
};

export default productsApi;
