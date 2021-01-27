import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import User from '../models/Users'

class UserController {
    index(req: Request, res: Response) {
        return res.send({
            userId: req.userId,
            admin: req.admin
        })
    }

    async store(req: Request, res: Response) {
        const repository = getRepository(User)
        const { email, password, name, admin } = req.body

        const UserExists = await repository.findOne({where: { email }})

        if (UserExists) {
            return res.sendStatus(409)
        }
        const newUser = repository.create({ email, password, name, admin })
        await repository.save(newUser)

        return res.json(newUser)
    }

}

export default new UserController()