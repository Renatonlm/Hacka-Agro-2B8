import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import * as Yup from 'yup';
import { model_user } from './model';
import { generateToken } from '../../helpers/auth';
import { authConfig } from '../../config/auth';

export const register = async (req:Request, res:Response, next:NextFunction) => {
    const { email, password } = req.body
    try {
        const userExists = await model_user.findOne({email: email});

        if (userExists) throw new Error('User already exists');

        const passwordHash = bcrypt.hashSync(password, 10);

        const user = await model_user.create({...req.body, password: passwordHash});
        
        return res.status(201).json({ token: generateToken(user._id, authConfig.secret, 86400) });


    } catch ( error ) {
        console.log(error)
        return res.status(400).send({ error: 'registration failed', consoleError: error.message });
    }
};

export const authenticate =  async (req:Request, res:Response, next:NextFunction) => {
    const { id, password } = req.body;
    try {

        const schema = Yup.object().shape({
            id: Yup.string().required(),
            password: Yup.string().required(),
        });

        if (!(await schema.validate(req.body) )) throw new Error('Validation fails');

        let user = await model_user.findOne({email: id});
        if (!user) user = await model_user.findOne({doc: id});
        if (!user) throw new Error('User not found');
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) throw new Error('Invalid password');
        return res.status(200).send({token: generateToken(user._id, authConfig.secret, 1800)})

    } catch (error) {
        return res.status(400).send({ error: 'authenticate failed', consoleError: error.message });
    };
};

export const ChangePass =  async (req:Request, res:Response, next:NextFunction) => {
    const { id, password, newPassword } = req.body;
    try {
        let user = await model_user.findOne({email: id});
        if (!user) user = await model_user.findOne({doc: id});
        if (!user) throw new Error('User not found');
        const compare = await bcrypt.compare(password, user.password);
        if (!compare) throw new Error('Invalid password');
        const passwordHash = bcrypt.hashSync(newPassword, 10);
        user.password = passwordHash;
        await user.save();

        return res.status(202).send({ message: 'Your password as changed' });

    } catch (error) {
        return res.status(400).send({ error: 'change pass failed', consoleError: error.message });
    };
};

export const RecoverPass = async (req:Request, res:Response, next:NextFunction) => {
    const { userId } = req.params;
    const { userMail } = req.query;

    try {
        const user = await model_user.findById(userId);
        if (!user) throw new Error('User not found');
        if (user.email !== userMail) throw new Error('This email does not belong to this user');
        return res.status(202).send({ message: 'An email has been sent to you', userId });
    } catch (error) {
        return res.status(400).send({ error: 'Recovery pass failed', consoleError: error.message });
    };
};