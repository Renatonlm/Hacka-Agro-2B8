import mongoose, { Mongoose } from 'mongoose';

export interface ProductModel extends mongoose.Document {
    
  active: Boolean,
  name: String,
  value: String,
  description: String,
  category: String,
  brand: String,
  pmodel: String,
  color: String,
  weight: String,
  dimensions: String,
  quantity: Number,
  minQuant: Number,
  stateCode: string,
  zipCode: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date

};

const ProductSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    index: true,
    required: [true, "Can't be blank."],
  },
  quantity: {
    type: Number,
    default: 1
  },
  unit_price: {
    type: String,
    required: [true, "Can't be blank."],
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: [true, "Can't be blank."],
  },
  brand: {
    type: String,
    required: [true, "Can't be blank."],
  },
  pmodel: String,
  color: String,
  weight: String,
  dimensions: String,
  minQuant: Number,
  stateCode: String,
  zipCode: String,
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

export const model_product = mongoose.model<ProductModel>('product', ProductSchema);