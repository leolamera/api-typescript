import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

interface TokenPayload {
    id: string;
    admin: boolean;
    iat: number;
    exp: number;
}

export default function authMiddleware(req: Request, res: Response, next: NextFunction) {

    const { authorization } = req.headers

    if (!authorization) {
        return res.sendStatus(401)
    }

    const token = authorization.replace('Bearer', '').trim()

    try {
        const data = jwt.verify(token, 'fullstacksofit')
        const { id, admin } = data as TokenPayload


        req.userId = id
        req.admin = admin

        return next()
    } catch {
        return res.sendStatus(401)
    }

} 