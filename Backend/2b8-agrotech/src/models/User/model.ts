import mongoose from 'mongoose';

export interface permissions {
    admin: Boolean,
    superuser: Boolean,
}

export interface UserModel extends mongoose.Document {
    
  active: Boolean,
  email: string,
  password: string,
  doc: string,
  name: string,
  lastname: string,
  username: string,
  birthday?: Date,
  permissions: permissions,
  streetLine1: string,
  streetLine2: string,
  num: string,
  city: string,
  stateCode: string,
  zipCode: string,
  phone: string,
  created_at?: Date,
  updated_at?: Date,
  deleted_at?: Date

}

const UserSchema = new mongoose.Schema({
  active: {
    type: Boolean,
    default: true
  },
  email: {
    type: String,
    match: [/\S+@\S+\.\S+/, 'is invalid'], 
    index: true,
  },
  doc: {
    type: String,
    required: [true, "Doc can't be blank."],
  },
  username: {
    type: String, 
    lowercase: true, 
  },
  password: {
    type: String,
    required: [true, "Password can't be blank"]
  },
  name: String,
  lastname: String,
  birthday: String,
  permissions: {
    admin: Boolean,
    superuser: Boolean,
  },
  streetLine1: String,
  streetLine2: String,
  num: String,
  city: String,
  stateCode: String,
  zipCode: String,
  phone: String,
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

export const model_user = mongoose.model<UserModel>('user', UserSchema);