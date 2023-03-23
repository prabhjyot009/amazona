import express from 'express'; //express is an object that is equal to the express module's default export
import data from './data.js';//data is an object that is equal to the data.js module's default export
import mongoose from 'mongoose';
import dotenv from 'dotenv';//dotenv is an object that is equal to the dotenv module's default export
import seedRouter from './routes/seedRoutes.js';//seedRouter is an object that is equal to the seedRoutes.js module's default export
import productRouter from './routes/productRoutes.js';
import userRouter from './routes/userRoutes.js';
import orderRouter from './routes/orderRoutes.js';

dotenv.config();//dotenv.config() is a method that is equal to the dotenv object's config property which is equal to the dotenv object's config method

mongoose//mongoose is an object that is equal to the mongoose module's default export
  .connect(process.env.MONGODB_URI)//mongoose.connect() is a method that is equal to the mongoose object's connect property which is equal to the mongoose object's connect method
  .then(() => {
    console.log('connected to db');
  })
  .catch((err) => {
    console.log(err.message);
  });

const app = express();

app.use(express.json());//app.use() is a method that is equal to the app object's use property which is equal to the express() function's use method
app.use(express.urlencoded({ extended: true }));

app.get('/api/keys/paypal', (req, res) => {//app.get() is a method that is equal to the app object's get property which is equal to the express() function's get method
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

app.use('/api/seed', seedRouter);//app.use() is a method that is equal to the app object's use property which is equal to the express() function's use method
app.use('/api/products', productRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;//port is a number that is equal to the process.env.PORT environment variable or 5000
app.listen(port, () => {
  console.log(`serve at http://localhost:${port}`);
});