import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/Users'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'

class UserController {
    async authenticate(req: Request, res: Response) {
        const repository = getRepository(User)
        const { email, password } = req.body

        const UserExists = await repository.findOne({where: { email }})

        if (!UserExists) {
            return res.sendStatus(401)
        }

        const isValidPassword = await bcrypt.compare(password, UserExists.password)
        
        if (!isValidPassword) {
            return res.sendStatus(401)
        }

        const token = jwt.sign({
            id: UserExists.id,
            admin: UserExists.admin
        }, 'fullstacksofit', {expiresIn: '6h'})

        delete UserExists.password

        return res.json({
            UserExists,
            token
        })
    }


}

export default new UserController()