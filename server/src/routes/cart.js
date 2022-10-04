import express from 'express';
import {
  addCartItem,
  clearCart,
  decreaseQuantity,
  getCartItems,
  increaseQuantity,
  removeCartItem,
} from '../controllers/cart.js';

const router = express.Router();

router.post('/', addCartItem);
router.get('/cart-items', getCartItems);
router.post('/increase-quantity', increaseQuantity);
router.post('/decrease-quantity', decreaseQuantity);
router.delete('/clearCart', clearCart);
router.delete('/:productId', removeCartItem);

export default router;
