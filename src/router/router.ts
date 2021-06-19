import express, { Express } from 'express';
import userRoutes from '../models/User/router';
import productRoutes from '../models/Product/router';
import cartRoutes from '../models/Cart/router';
const Router = express.Router();

Router.use('/user', userRoutes);
Router.use('/product', productRoutes);
Router.use('/cart', cartRoutes);

export default Router;