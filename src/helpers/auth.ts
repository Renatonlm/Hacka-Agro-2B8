import jwt from 'jsonwebtoken';
import { UserModel } from '../models/User/model';

export const generateToken = (id: string, secret: string, expiresSeconds: number) => {
    let token = jwt.sign({ id }, secret, {
        expiresIn: expiresSeconds.toFixed(0)
    })
    return token
}

export const verifyToken = async (authHeader: string, secret: string) => {

    if (!authHeader) {
        throw new Error('No token provided');
    };

    const parts = authHeader.split(' ');

    if (parts.length !== 2) {
        throw new Error('Token error');
    };

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        throw new Error('Token malformed');
    };

    return jwt.verify(token, secret, (err, decoded) => {
        if ( err ) {
            throw new Error('Token invalid');
        };

        return decoded;
    });
};