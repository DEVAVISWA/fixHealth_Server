const { default: mongoose } = require("mongoose");

const physioSchema= new mongoose.Schema({
    physioName: String,
    physioEmail: String,
    physioPasswordHash: String,
    createdAt:{
        type: Date,
        default: Date.now
    }
})

const Physio= mongoose.model('Physio', physioSchema, 'physio')

module.exports= Physio