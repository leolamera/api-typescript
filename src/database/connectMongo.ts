import mongoose from 'mongoose'

mongoose.connect('mongodb://localhost:27017/sofit_cars', {
    useNewUrlParser: true, 
    useUnifiedTopology: true
}).then(() => console.log("📦🍃 Successfully connected with Mongo database"))