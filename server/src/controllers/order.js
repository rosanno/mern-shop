import Cart from '../models/cart.js';
import Orders from '../models/orders.js';

const getOrder = async (req, res) => {
  const userId = req.userId;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) return res.status(404);

    let orders = new Orders({
      userId: userId,
      orders: cart,
    });

    orders.save();

    res.status(200).json(orders);
  } catch (error) {
    console.log(error);
  }
};

export { getOrder };
