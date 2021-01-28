import { Router } from 'express'

import authMiddleware from './app/middlewares/authMiddleware'

import UserController from './app/controllers/UserController'
import AuthController from './app/controllers/AuthController'
import CarsController from './app/controllers/CarController'

const router = Router()

router.post('/user', UserController.store)
router.post('/auth', AuthController.authenticate)
router.post('/cars', authMiddleware, CarsController.store)

router.get('/user', authMiddleware, UserController.index)
router.get('/cars', authMiddleware, CarsController.index)

router.put('/cars', authMiddleware, CarsController.update)

router.delete('/cars', authMiddleware, CarsController.delete)





export default router