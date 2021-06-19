import express, { Express } from 'express';
import { authenticate, ChangePass, RecoverPass, register } from './controller';
const Router = express.Router();
    
Router.get(`/recover/:userId`, RecoverPass);
Router.post(`/register`, register);
Router.post(`/authenticate`, authenticate);
Router.post(`/changePass`, ChangePass);

export default Router;