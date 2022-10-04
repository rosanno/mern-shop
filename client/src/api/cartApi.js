import { privateRequest } from "./axios";

const cartApi = {
  getCartItems: async () => {
    try {
      const { data } = await privateRequest.get("cart/cart-items");
      return data;
    } catch (error) {
      console.log("Anauthorized Access");
    }
  },
  removeItem: async (productId) => {
    try {
      const { data } = await privateRequest.delete(`/cart/${productId}`);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cartApi;
