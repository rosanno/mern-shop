import express from "express";
import {
  addProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from "../controllers/products.js";

const router = express.Router();

router.post("/add-product", addProduct);
router.get("/all-product", getProducts);
router.get("/:slug", getProduct);
router.put("/:productId", updateProduct);
router.delete("/:productId", deleteProduct);

export default router;
