import express from 'express';
import bcrypt from 'bcryptjs';
import expressAsyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import { isAuth, generateToken } from '../utils.js';

const userRouter = express.Router();//userRouter is an object that is equal to the express.Router() function

userRouter.post(//userRouter.post() is a method that is equal to the userRouter object's post property which is equal to the express.Router() function's post method
  '/signin',
  expressAsyncHandler(async (req, res) => {//expressAsyncHandler is a middleware function that handles exceptions thrown in asynchronous functions
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {//bcrypt.compareSync() is a method that is equal to the bcrypt object's compareSync property which is equal to the bcrypt object's compareSync method
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        });
        return;
      }
    }
    res.status(401).send({ message: 'Invalid email or password' });
  })
);

userRouter.post(//userRouter.post() is a method that is equal to the userRouter object's post property which is equal to the express.Router() function's post method
  '/signup',
  expressAsyncHandler(async (req, res) => {//expressAsyncHandler is a middleware function that handles exceptions thrown in asynchronous functions
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password),
    });
    const user = await newUser.save();//user is an object that is equal to the newUser object's save method
    res.send({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user),
    });
  })
);

userRouter.put(//userRouter.put() is a method that is equal to the userRouter object's put property which is equal to the express.Router() function's put method
  '/profile',
  isAuth,
  expressAsyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = bcrypt.hashSync(req.body.password, 8);
      }

      const updatedUser = await user.save();
      res.send({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser),
      });
    } else {
      res.status(404).send({ message: 'User not found' });
    }
  })
);

export default userRouter;