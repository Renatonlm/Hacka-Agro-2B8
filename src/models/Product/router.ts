import express, { Express } from 'express';
import { get, register } from './controller';
const Router = express.Router();
    
Router.get(`/find`, get);
Router.post(`/register`, register);

export default Router;