import express from 'express';
import { getSessions, stripeCheckout } from '../controllers/stripeCheckout.js';

const router = express.Router();

router.post('/create-checkout-session', stripeCheckout);
router.get('/checkout/sessions/:id', getSessions);

export default router;
