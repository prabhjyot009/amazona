// Description: This file contains the routes for the orders
import express from 'express';//express is a web application framework for Node.js
import expressAsyncHandler from 'express-async-handler';//expressAsyncHandler is a middleware function that handles exceptions thrown in asynchronous functions
import Order from '../models/orderModel.js';//Order is a model
import { isAuth } from '../utils.js';//isAuth is a middleware function that checks if the user is authenticated

const orderRouter = express.Router();//orderRouter is an instance of the express router
orderRouter.post(//orderRouter.post() is used to create a new order
  '/',
  isAuth,//isAuth is a middleware function that checks if the user is authenticated
  expressAsyncHandler(async (req, res) => {//expressAsyncHandler is a middleware function that handles exceptions thrown in asynchronous functions
    const newOrder = new Order({//newOrder is an instance of the Order model
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,//shippingAddress is an object
      paymentMethod: req.body.paymentMethod,//paymentMethod is a string
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();//order is an instance of the Order model
    res.status(201).send({ message: 'New Order Created', order });
  })
);

orderRouter.get(//orderRouter.get() is used to get all orders
  '/mine',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const orders = await Order.find({ user: req.user._id });
    res.send(orders);
  })
);

orderRouter.get(
  '/:id',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

orderRouter.put(
  '/:id/pay',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id);
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      res.send({ message: 'Order Paid', order: updatedOrder });
    } else {
      res.status(404).send({ message: 'Order Not Found' });
    }
  })
);

export default orderRouter;