import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(//userSchema is a mongoose schema object that is equal to the mongoose.Schema() function which takes in an object as an argument
  {
    name: { type: String, required: true },//name is a string that is equal to the name of the user that is required to be filled out by the user when they register for an account on the website
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false, required: true},
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model('User', userSchema);
export default User;