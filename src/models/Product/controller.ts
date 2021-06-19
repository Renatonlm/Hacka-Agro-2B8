import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { model_product } from '../Product/model';
import { model_user } from '../User/model';

export const get = async (req:Request, res:Response, next:NextFunction) => {
    try {
        const {_id, _quantity} = req.query;
        
        if (_id) {
            const product = model_product.findById(_id);
            if (!product) throw new Error('product not found');
            return res.status(200).json({ response: product});
        }
        
        const query: any = {};
        Object.keys(req.query).forEach(k => {
            if (k[0] === '_') return;
            query[k] = req.query[k];
        });
        if (Object.keys(query).length > 0) {
            const products = await model_product.find().where(query).limit(Number(_quantity)||0);
            return res.status(200).json(products);
        };

        const allProducts = await model_product.find().limit(Number(_quantity)||0);
        return res.status(200).json(allProducts);


    } catch ( error ) {
        return res.status(400).send({ error: 'get failed', consoleError: error.message });
    }
};

export const register = async (req:Request, res:Response, next:NextFunction) => {
    const { userId } = req.body
    try {
        const user = await model_user.findById(userId);
        if (!user) throw new Error('User not found');

        const product = await model_product.create({...req.body, user});

        return res.status(201).json({ product });
    } catch ( error ) {
        return res.status(400).send({ error: 'registration failed', consoleError: error.message });
    }
};