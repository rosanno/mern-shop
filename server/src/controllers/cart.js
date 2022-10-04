import Product from '../models/product.js';
import Cart from '../models/cart.js';
import mongoose from 'mongoose';

const addCartItem = async (req, res) => {
  const userId = req.userId;
  const { productId, color, colorImg, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId }).populate({
      path: 'product.productId',
      select: 'title price total',
    });
    const product = await Product.findOne({ _id: productId });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (cart) {
      const productIndex = cart.product.findIndex(
        (item) => item.productId._id.toString() === productId
      );

      if (productIndex !== -1 && quantity <= 0) {
        cart.product.splice(productIndex, 1);

        if (cart.product.length === 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal += cart.product
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      } else if (productIndex !== -1) {
        cart.product[productIndex].quantity =
          cart.product[productIndex].quantity + quantity;
        cart.product[productIndex].total =
          cart.product[productIndex].quantity * product.price;
        cart.product[productIndex].price = product.price;
        cart.subTotal = cart.product
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else if (quantity > 0) {
        cart.product.push({
          productId,
          color,
          colorImg,
          quantity,
          price: product.price,
          total: parseInt(product.price * quantity),
        });
        cart.subTotal = cart.product
          .map((item) => item.total)
          .reduce((acc, next) => acc + next);
      } else {
        return res.status(400).json({ message: 'Invalid request' });
      }

      const data = await cart.save();
      return res
        .status(200)
        .json({ message: 'Added successfully', cart: data });
    } else {
      console.log('new item');
      const newItem = new Cart({
        userId,
        product: [
          {
            productId,
            color,
            colorImg,
            quantity,
            total: parseInt(product.price * quantity),
            price: product.price,
          },
        ],
        subTotal: parseInt(product.price * quantity),
      });
      cart = await newItem.save();

      res.status(200).json({ message: 'Added successfully', cart });
    }
  } catch (error) {
    console.log(error);
  }
};

const increaseQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    let cart = await Cart.findOne({ userId }).populate({
      path: 'product.productId',
      select: 'price total',
    });

    const product = await Product.findOne({ _id: productId });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const foundIndex = cart.product.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    if (foundIndex !== -1) {
      cart.product[foundIndex].quantity =
        cart.product[foundIndex].quantity + quantity;
      cart.product[foundIndex].total =
        cart.product[foundIndex].quantity * product.price;
      cart.product[foundIndex].price = product.price;
      cart.subTotal = cart.product
        .map((item) => item.total)
        .reduce((acc, next) => acc + next);

      const data = await cart.save();

      res.status(200).json({ cart: data });
    }
  } catch (error) {
    console.log(error);
  }
};

const decreaseQuantity = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {
    let cart = await Cart.findOne({ userId }).populate({
      path: 'product.productId',
      select: 'price total',
    });

    const product = await Product.findOne({ _id: productId });

    if (!product) return res.status(404).json({ message: 'Product not found' });

    const foundIndex = cart.product.findIndex(
      (item) => item.productId._id.toString() === productId
    );

    if (foundIndex !== -1) {
      cart.product[foundIndex].quantity =
        cart.product[foundIndex].quantity - quantity;
      cart.product[foundIndex].total =
        cart.product[foundIndex].quantity * product.price;
      cart.product[foundIndex].price = product.price;
      cart.subTotal = cart.product
        .map((item) => item.total)
        .reduce((acc, next) => acc + next);

      const data = await cart.save();

      res.status(200).json({ cart: data });
    }
  } catch (error) {
    console.log(error);
  }
};

const getCartItems = async (req, res) => {
  const userId = req.userId;
  try {
    const cartItems = await Cart.findOne({ userId }).populate({
      path: 'product.productId',
      select: 'title price total img colorImg',
    });

    if (!cartItems) return res.status(404).json('No cart items found');

    res.status(200).json(cartItems);
  } catch (error) {
    console.log(error);
  }
};

const removeCartItem = async (req, res) => {
  const userId = req.userId;
  const { productId } = req.params;

  try {
    let cart = await Cart.findOne({ userId });

    if (cart) {
      const foundIndex = cart.product.findIndex(
        (item) => item.productId._id.toString() === productId
      );

      if (foundIndex !== -1) {
        cart.product.splice(foundIndex, 1);
        if (cart.product.length === 0) {
          cart.subTotal = 0;
        } else {
          cart.subTotal = cart.product
            .map((item) => item.total)
            .reduce((acc, next) => acc + next);
        }
      } else {
        return res.status(404).json({ message: 'Item not found' });
      }
    }

    const data = await cart.save();

    res.status(200).json({ cart: data });
  } catch (error) {
    console.error(error);
  }
};

export const clearCart = async (req, res) => {
  const userId = req.userId;

  try {
    const cart = await Cart.findOne({ userId });

    cart.delete();

    res.status(200).json({ message: 'Cart cleared' });
  } catch (error) {
    console.log(error);
  }
};

export {
  addCartItem,
  getCartItems,
  increaseQuantity,
  decreaseQuantity,
  removeCartItem,
};
