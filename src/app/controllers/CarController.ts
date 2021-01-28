import CarModel from '../models/Cars'
import { Request, Response } from 'express'

class CarsController {
    async delete(req: Request, res: Response) {
        const { id } = req.body

        const validateCreator = await CarModel.findById(id)
        const { createdBy } = await validateCreator
        if (createdBy === req.userId || req.admin === true) {
            const deletedCar = await CarModel.findOneAndDelete({"_id": id})
            return res.json(deletedCar)
        }
        
        return res.sendStatus(401)
    }

    async index(req: Request, res: Response) {
        const allCars = await CarModel.find({})
        return res.json(allCars)
    }

    async update(req: Request, res: Response) {
        const { id, data } = req.body

        const validateCreator = await CarModel.findById(id)
        const { createdBy } = await validateCreator
        if (createdBy === req.userId || req.admin === true) {
            const foundedCar = await CarModel.findOneAndUpdate({"_id": id}, {$set:data}, {new: true})
            return res.json(foundedCar)
        }

        return res.sendStatus(401)        
    }

    store(req: Request, res: Response) {
        const { 
            make,
            model,
            version,
            year,
            carPlate,
            color,
            location } = req.body

        if (!make|| !model || !version || !year ||!carPlate) {
                return res.sendStatus(406)
            }

        const newCar = new CarModel({
            make: make,
            model: model,
            version: version,
            year: year,
            carPlate: carPlate,
            color: color,
            location: location,
            createdBy: req.userId
        })

        newCar.save()

        res.json(newCar)
    }
}

export default new CarsController()