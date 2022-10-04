import Product from "../models/product.js";

const addProduct = async (req, res) => {
  const {
    title,
    description,
    img,
    price,
    category,
    stock,
    specification,
    color,
  } = req.body;

  try {
    const newProduct = await Product.create({
      title,
      description,
      img,
      price,
      category,
      stock,
      specification,
      color,
    });

    res.status(200).json(newProduct);
  } catch (error) {
    console.log(error);
  }
};

const getProducts = async (req, res) => {
  const { title } = req.query;
  try {
    const query = new RegExp(title, "i");
    const products = await Product.find({ title: query });

    if (!products) {
      return res.status(404).json({ message: "No products found." });
    } else {
      res.status(200).json({ products });
    }
  } catch (error) {
    console.log(error);
  }
};

const getProduct = async (req, res) => {
  const { slug } = req.params;

  try {
    const product = await Product.findOne({ slug: slug });

    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const updateProduct = async (req, res) => {
  const { productId } = req.params;

  try {
    const foundProduct = await Product.findOne({ _id: productId });

    if (!foundProduct)
      return res.status(404).json({ message: "Product not found" });

    const product = await Product.findByIdAndUpdate(productId, {
      $set: req.body,
    });

    res.status(200).json(product);
  } catch (error) {
    console.log(error);
  }
};

const deleteProduct = async (req, res) => {
  const { productId } = req.params;
  try {
    await Product.findByIdAndDelete({ _id: productId });

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.log(error);
  }
};

export { addProduct, getProducts, getProduct, updateProduct, deleteProduct };
