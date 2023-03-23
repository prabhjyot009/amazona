import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(//orderSchema is a mongoose schema object that is equal to the mongoose.Schema() function which takes in an object as an argument
  {
    orderItems: [//orderItems is an array that is equal to an array of objects that are equal to the following objects
      {
        slug: { type: String, required: true },//slug is a string that is equal to the slug of the product
        name: { type: String, required: true },
        quantity: { type: Number, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    shippingAddress: {//shippingAddress is an object that is equal to the following object
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true },//paymentMethod is a string that is equal to the payment method
    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },
    itemsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    taxPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
  },
  {
    timestamps: true,//timestamps is a boolean that is equal to true
  }
);

const Order = mongoose.model('Order', orderSchema);//Order is a mongoose model object that is equal to the mongoose.model() function which takes in a string and a mongoose schema object as arguments
export default Order;