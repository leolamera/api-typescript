export interface CarInfos extends mongoose.Document {
    createdBy: string;
}

import mongoose, { Schema } from 'mongoose'

const carSchema = new Schema({
    make: {
        type: String,
        require: true
    },
    model: {
        type: String,
        require: true
    },
    version:{
        type: String,
        require: true
    },
    year: {
        type: Number,
        require: true
    },
    carPlate: {
        type: String,
        require: true,
    },
    color: String,
    location: {
        uf: String,
        city: String
    },
    createdBy: {
        type: String,
        require: true
    }
})

const CarModel = mongoose.model<CarInfos>('cars', carSchema)

export default CarModel