import mongoose, { Mongoose } from 'mongoose';
import { ProductModel } from '../Product/model';
import { UserModel } from '../User/model';

export interface CartModel extends mongoose.Document {

  subtotal: String,
  total: String,
  user: UserModel,
  products: Array<ProductModel>,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date

};

const CartSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users',
    required: [true, "Can't be blank."],
  },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  total: Number,
  subtotal: Number,
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
  deleted_at: {
    type: Date,
    default: null,
  }
});

export const model_cart = mongoose.model<CartModel>('cart', CartSchema);