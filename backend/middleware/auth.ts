import { NextFunction, Request, Response } from "express";
import { config } from 'dotenv';
import { resolve } from 'path';

config({ path: resolve(__dirname, '../.conf') });

export const checkBearer = (
    req: Request,
    res: Response,
    next: NextFunction
) => {

    console.log('checkbearer')

    const authenticated: boolean = !!req.headers['authorization'] && req.headers['authorization'] === Buffer.from(process.env.PASSWORD as string).toString('base64');

    if (authenticated) {
        next();
        return;
    }

    // decline
    res.status(401)
        .send('Unauthorized');
};