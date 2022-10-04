import express from 'express';
import authRoutes from './auth.js';
import userRoutes from './user.js';
import productRoutes from './product.js';
import cartRoutes from './cart.js';
import refreshRoutes from './refresh.js';
import ordersRoutes from './orders.js';
import stripeCheckoutRoutes from './stripeCheckout.js';
import logoutRoute from './logout.js';
import { verifyAccessToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.use('/logout', logoutRoute);
router.use('/refresh', refreshRoutes);
router.use('/auth', authRoutes);
router.use('/user', verifyAccessToken, userRoutes);
router.use('/product', productRoutes);
router.use('/cart', verifyAccessToken, cartRoutes);
router.use('/orders', verifyAccessToken, ordersRoutes);
router.use('/stripe-checkout', verifyAccessToken, stripeCheckoutRoutes);

export default router;
