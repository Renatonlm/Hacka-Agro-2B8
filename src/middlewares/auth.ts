import { Request, Response, NextFunction } from 'express';
import { authConfig } from '../config/auth';
import { verifyToken } from '../helpers/auth';
import { model_user, permissions } from '../models/User/model';

export default async function (routePermission: permissions) {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            let _authorization = req.headers['authorization'];
            if (!_authorization) throw new Error('token not provided');
    
            let _id = await verifyToken(_authorization, authConfig.secret);
    
            let user = await model_user.findById(_id);
            if (!user || user === null) throw new Error('user not found');
    
            let userPermission = Object.keys(routePermission).filter((perm: any) => {
                let userP: any = user?.permissions;
                if (userP[perm]) {
                    return true;
                }
                return false;
            }).length > 0;
            if (!userPermission) throw new Error('unauthorized');
            
            next();
        } catch (e) {
            return res.status(401).send({ error: 'authorization failed', consoleError: e.message });
        }

    }
}