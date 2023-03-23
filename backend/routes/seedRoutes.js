import express from 'express';
import Product from '../models/productModel.js';
import data from '../data.js';
import User from '../models/userModel.js';

const seedRouter = express.Router();//seedRouter is an object that is equal to the express.Router() function

seedRouter.get('/', async (req, res) => {//seedRouter.get() is a method that is equal to the seedRouter object's get property which is equal to the express.Router() function's get method
  await Product.deleteMany({});
  const createdProducts = await Product.insertMany(data.products);
  await User.deleteMany({});
  const createdUsers = await User.insertMany(data.users);
  res.send({ createdProducts, createdUsers });
});
export default seedRouter;